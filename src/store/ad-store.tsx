'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, collection, writeBatch, deleteDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { Ad, AdRating, Product } from '@/lib/types';
import { initialProducts } from '@/lib/data';
import { toast } from '@/hooks/use-toast';

interface CartItem {
  product: Product;
  quantity: number;
}

interface AdStoreState {
  user: User | null;
  ads: Ad[];
  affiliateProducts: Product[];
  cart: CartItem[];
  ratings: AdRating;
  showOnboarding: boolean;
  isInitialized: boolean;
  rateAd: (adId: string, rating: 'like' | 'dislike') => void;
  getRating: (adId: string) => 'like' | 'dislike' | undefined;
  convertToAffiliate: (ad: Ad) => void;
  isAffiliateProduct: (adId: string) => boolean;
  addToCart: (product: Product) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  isInCart: (productId: string) => boolean;
  closeOnboarding: () => void;
}

const AdStoreContext = createContext<AdStoreState | undefined>(undefined);

export function AdStoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [ads, setAds] = useState<Ad[]>([]);
  const [affiliateProducts, setAffiliateProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [ratings, setRatings] = useState<AdRating>({});
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          setShowOnboarding(true);
          const batch = writeBatch(db);
          
          const initialAdsData = initialProducts.slice(0, 8);
          
          const adsCollectionRef = collection(db, 'users', user.uid, 'ads');
          initialAdsData.forEach(ad => {
            const { price, commissionRate, ...adData } = ad;
            batch.set(doc(adsCollectionRef, ad.id), adData);
          });
          
          batch.set(userDocRef, { 
            onboardingSeen: true, 
            ratings: {},
            cart: [],
          });
          
          await batch.commit();

          const adsData = initialAdsData.map(({price, commissionRate, ...adData}) => adData);
          setAds(adsData);
          setRatings({});
          setAffiliateProducts([]);
          setCart([]);

        } else {
           const data = userDocSnap.data();
           setShowOnboarding(!data.onboardingSeen);
        }

        const unsubAds = onSnapshot(collection(db, 'users', user.uid, 'ads'), (snapshot) => {
          if (!snapshot.empty) {
            setAds(snapshot.docs.map(doc => doc.data() as Ad));
          }
        });
        const unsubAffiliate = onSnapshot(collection(db, 'users', user.uid, 'affiliateProducts'), (snapshot) => {
          setAffiliateProducts(snapshot.docs.map(doc => doc.data() as Product));
        });
        const unsubUserData = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
           const data = snapshot.data();
           setRatings(data?.ratings || {});
           setCart(data?.cart || []);
        });
        
        setIsInitialized(true);

        return () => {
          unsubAds();
          unsubAffiliate();
          unsubUserData();
        };

      } else {
        signInAnonymously(auth).catch((error) => {
          console.error("Anonymous sign-in failed:", error);
          toast({
            variant: "destructive",
            title: "Authentication Failed",
            description: "Could not sign you in. Please check your Firebase configuration.",
          });
        });
        setIsInitialized(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const rateAd = useCallback(async (adId: string, rating: 'like' | 'dislike') => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    const newRatings = {...ratings};
     if (newRatings[adId] === rating) {
        delete newRatings[adId];
      } else {
        newRatings[adId] = rating;
      }
    await setDoc(userDocRef, { ratings: newRatings }, { merge: true });
  }, [user, ratings]);

  const getRating = useCallback((adId: string) => ratings[adId], [ratings]);
  
  const isAffiliateProduct = useCallback((adId: string) => affiliateProducts.some(p => p.id === adId), [affiliateProducts]);

  const convertToAffiliate = useCallback(async (ad: Ad) => {
    if (!user) return;
    
    const productData = initialProducts.find(p => p.id === ad.id);
    if (!productData) {
        toast({ variant: 'destructive', description: "Could not find product details for this ad."});
        return;
    }

    const affiliateProductRef = doc(db, 'users', user.uid, 'affiliateProducts', ad.id);
    await setDoc(affiliateProductRef, productData);
  }, [user]);
  
  const addToCart = useCallback(async (product: Product) => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    const newCartItem: CartItem = { product, quantity: 1 };
    await updateDoc(userDocRef, {
      cart: arrayUnion(newCartItem)
    });
    toast({ description: `Added "${product.title}" to your cart.` });
  }, [user]);

  const updateCartQuantity = useCallback(async (productId: string, quantity: number) => {
    if (!user || quantity < 1) return;
    const updatedCart = cart.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    );
    const userDocRef = doc(db, 'users', user.uid);
    await updateDoc(userDocRef, { cart: updatedCart });
  }, [user, cart]);

  const removeFromCart = useCallback(async (productId: string) => {
    if (!user) return;
    const itemToRemove = cart.find(item => item.product.id === productId);
    if (itemToRemove) {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        cart: arrayRemove(itemToRemove)
      });
      toast({ description: `Removed "${itemToRemove.product.title}" from your cart.` });
    }
  }, [user, cart]);

  const isInCart = useCallback((productId: string) => cart.some(item => item.product.id === productId), [cart]);

  const closeOnboarding = useCallback(async () => {
    setShowOnboarding(false);
    if(user) {
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, { onboardingSeen: true }, { merge: true });
    }
  }, [user]);
  
  const value = {
    user,
    ads,
    affiliateProducts,
    cart,
    ratings,
    showOnboarding,
    isInitialized,
    rateAd,
    getRating,
    convertToAffiliate,
    isAffiliateProduct,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    isInCart,
    closeOnboarding,
  };

  return (
    <AdStoreContext.Provider value={value}>
      {children}
    </AdStoreContext.Provider>
  );
}

export function useAdStore() {
  const context = useContext(AdStoreContext);
  if (context === undefined) {
    throw new Error('useAdStore must be used within a AdStoreProvider');
  }
  return context;
}
