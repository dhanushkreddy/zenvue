'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, collection, writeBatch, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { Ad, Product, CartItem, AdRating } from '@/lib/types';
import { initialProducts } from '@/lib/data';
import { toast } from '@/hooks/use-toast';

interface AdStoreState {
  user: User | null;
  ads: Ad[];
  affiliateProducts: Product[];
  cart: CartItem[];
  ratings: AdRating;
  showOnboarding: boolean;
  isInitialized: boolean;
  rateAd: (adId: string, rating: 'like' | 'dislike') => void;
  convertToAffiliate: (adId:string) => void;
  addToCart: (product: Product) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  getRating: (adId: string) => 'like' | 'dislike' | undefined;
  isAffiliate: (adId: string) => boolean;
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
        
        // Fetch initial data and set up listeners
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          // First time user, seed initial data
          setShowOnboarding(true);
          const batch = writeBatch(db);
          
          const adsCollectionRef = collection(db, 'users', user.uid, 'ads');
          const initialAdsData = initialProducts.slice(0, 6);
          initialAdsData.forEach(ad => {
            batch.set(doc(adsCollectionRef, ad.id), ad);
          });
          
          batch.set(userDocRef, { onboardingSeen: true, ratings: {} });
          await batch.commit();

          // Also update the local state immediately
          setAds(initialAdsData);
          setRatings({});

        } else {
           const data = userDocSnap.data();
           setShowOnboarding(!data.onboardingSeen);
        }

        // Set up real-time listeners
        const unsubAds = onSnapshot(collection(db, 'users', user.uid, 'ads'), (snapshot) => {
          if (!snapshot.empty) {
            setAds(snapshot.docs.map(doc => doc.data() as Ad));
          }
        });
        const unsubAffiliate = onSnapshot(collection(db, 'users', user.uid, 'affiliateProducts'), (snapshot) => {
          setAffiliateProducts(snapshot.docs.map(doc => doc.data() as Product));
        });
        const unsubCart = onSnapshot(collection(db, 'users', user.uid, 'cart'), (snapshot) => {
          setCart(snapshot.docs.map(doc => doc.data() as CartItem));
        });
        const unsubRatings = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
           setRatings(snapshot.data()?.ratings || {});
        });

        setIsInitialized(true);

        return () => {
          unsubAds();
          unsubAffiliate();
          unsubCart();
          unsubRatings();
        };

      } else {
        // User is signed out
        signInAnonymously(auth).catch((error) => {
          console.error("Anonymous sign-in failed:", error);
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

  const isAffiliate = useCallback((adId: string) => affiliateProducts.some(p => p.id === adId), [affiliateProducts]);

  const convertToAffiliate = useCallback(async (adId: string) => {
    if (!user || isAffiliate(adId)) return;
    const productToAdd = initialProducts.find(p => p.id === adId);
    if (productToAdd) {
      const productDocRef = doc(db, 'users', user.uid, 'affiliateProducts', productToAdd.id);
      await setDoc(productDocRef, productToAdd);
      toast({
        title: "Affiliate Product Added!",
        description: `${productToAdd.title} is now in your affiliate list.`,
      });
    }
  }, [user, isAffiliate]);

  const addToCart = useCallback(async (product: Product) => {
    if (!user) return;
    const cartItemRef = doc(db, 'users', user.uid, 'cart', product.id);
    const cartItemSnap = await getDoc(cartItemRef);
    
    if (cartItemSnap.exists()) {
      const currentQuantity = cartItemSnap.data().quantity;
      await setDoc(cartItemRef, { product, quantity: currentQuantity + 1 }, { merge: true });
    } else {
      await setDoc(cartItemRef, { product, quantity: 1 });
    }
    
    toast({
        title: "Added to Cart!",
        description: `${product.title} has been added to your personal cart.`,
    });
  }, [user]);

  const updateCartQuantity = useCallback(async (productId: string, quantity: number) => {
    if (!user) return;
    const cartItemRef = doc(db, 'users', user.uid, 'cart', productId);
    if (quantity <= 0) {
      await deleteDoc(cartItemRef);
    } else {
      await setDoc(cartItemRef, { quantity }, { merge: true });
    }
  }, [user]);

  const removeFromCart = useCallback(async (productId: string) => {
     if (!user) return;
     const cartItemRef = doc(db, 'users', user.uid, 'cart', productId);
     await deleteDoc(cartItemRef);
  }, [user]);
  
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
    convertToAffiliate,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    getRating,
    isAffiliate,
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
