'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { Ad, Product, CartItem, AdRating } from '@/lib/types';
import { initialProducts } from '@/lib/data';
import { toast } from '@/hooks/use-toast';

interface AdStoreState {
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
  getCartProductIds: () => string[];
}

const AdStoreContext = createContext<AdStoreState | undefined>(undefined);

const getInitialState = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') {
    return fallback;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(error);
    return fallback;
  }
};


export function AdStoreProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [ads, setAds] = useState<Ad[]>([]);
  const [affiliateProducts, setAffiliateProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [ratings, setRatings] = useState<AdRating>({});
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  useEffect(() => {
    setAds(getInitialState('ads_history', initialProducts.slice(0, 6)));
    setAffiliateProducts(getInitialState('affiliate_products', []));
    setCart(getInitialState('user_cart', []));
    setRatings(getInitialState('ad_ratings', {}));
    const onboardingSeen = getInitialState('onboarding_seen', false);
    setShowOnboarding(!onboardingSeen);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if(isInitialized) {
      localStorage.setItem('ads_history', JSON.stringify(ads));
      localStorage.setItem('affiliate_products', JSON.stringify(affiliateProducts));
      localStorage.setItem('user_cart', JSON.stringify(cart));
      localStorage.setItem('ad_ratings', JSON.stringify(ratings));
      localStorage.setItem('onboarding_seen', JSON.stringify(!showOnboarding));
    }
  }, [ads, affiliateProducts, cart, ratings, showOnboarding, isInitialized]);

  const rateAd = useCallback((adId: string, rating: 'like' | 'dislike') => {
    setRatings(prev => {
      const newRatings = {...prev};
      if (newRatings[adId] === rating) {
        delete newRatings[adId];
      } else {
        newRatings[adId] = rating;
      }
      return newRatings;
    });
  }, []);

  const getRating = useCallback((adId: string) => ratings[adId], [ratings]);

  const isAffiliate = useCallback((adId: string) => affiliateProducts.some(p => p.id === adId), [affiliateProducts]);

  const convertToAffiliate = useCallback((adId: string) => {
    if (isAffiliate(adId)) return;
    const productToAdd = initialProducts.find(p => p.id === adId);
    if (productToAdd) {
      setAffiliateProducts(prev => [...prev, productToAdd]);
      toast({
        title: "Affiliate Product Added!",
        description: `${productToAdd.title} is now in your affiliate list.`,
      });
    }
  }, [isAffiliate]);

  const addToCart = useCallback((product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
     toast({
        title: "Added to Cart!",
        description: `${product.title} has been added to your personal cart.`,
      });
  }, []);

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    setCart(prevCart => {
      if (quantity <= 0) {
        return prevCart.filter(item => item.product.id !== productId);
      }
      return prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  }, []);
  
  const closeOnboarding = useCallback(() => {
    setShowOnboarding(false);
  }, []);
  
  const getCartProductIds = useCallback(() => {
    return cart.map(item => item.product.id);
  }, [cart]);

  const value = {
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
    getCartProductIds
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
