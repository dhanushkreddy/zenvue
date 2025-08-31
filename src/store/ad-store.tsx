'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, collection, writeBatch, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { Ad, AdRating } from '@/lib/types';
import { initialProducts } from '@/lib/data';
import { toast } from '@/hooks/use-toast';

interface AdStoreState {
  user: User | null;
  ads: Ad[];
  saved: Ad[];
  ratings: AdRating;
  showOnboarding: boolean;
  isInitialized: boolean;
  rateAd: (adId: string, rating: 'like' | 'dislike') => void;
  saveAd: (ad: Ad) => void;
  getRating: (adId: string) => 'like' | 'dislike' | undefined;
  isSaved: (adId: string) => boolean;
  closeOnboarding: () => void;
}

const AdStoreContext = createContext<AdStoreState | undefined>(undefined);

export function AdStoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [ads, setAds] = useState<Ad[]>([]);
  const [saved, setSaved] = useState<Ad[]>([]);
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
          
          const adsCollectionRef = collection(db, 'users', user.uid, 'ads');
          const initialAdsData = initialProducts.slice(0, 6);
          initialAdsData.forEach(ad => {
            const { price, commissionRate, ...adData } = ad;
            batch.set(doc(adsCollectionRef, ad.id), adData);
          });
          
          batch.set(userDocRef, { onboardingSeen: true, ratings: {} });
          await batch.commit();

          setAds(initialAdsData.map(({price, commissionRate, ...adData}) => adData));
          setRatings({});

        } else {
           const data = userDocSnap.data();
           setShowOnboarding(!data.onboardingSeen);
        }

        const unsubAds = onSnapshot(collection(db, 'users', user.uid, 'ads'), (snapshot) => {
          if (!snapshot.empty) {
            setAds(snapshot.docs.map(doc => doc.data() as Ad));
          }
        });
        const unsubSaved = onSnapshot(collection(db, 'users', user.uid, 'savedAds'), (snapshot) => {
          setSaved(snapshot.docs.map(doc => doc.data() as Ad));
        });
        const unsubRatings = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
           setRatings(snapshot.data()?.ratings || {});
        });

        setIsInitialized(true);

        return () => {
          unsubAds();
          unsubSaved();
          unsubRatings();
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
  
  const isSaved = useCallback((adId: string) => saved.some(p => p.id === adId), [saved]);

  const saveAd = useCallback(async (ad: Ad) => {
    if (!user) return;
    const savedAdRef = doc(db, 'users', user.uid, 'savedAds', ad.id);

    if (isSaved(ad.id)) {
      await deleteDoc(savedAdRef);
      toast({
        description: `Removed "${ad.title}" from your saved ads.`,
      });
    } else {
      await setDoc(savedAdRef, ad);
      toast({
        description: `Saved "${ad.title}".`,
      });
    }
  }, [user, isSaved, saved]);
  
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
    saved,
    ratings,
    showOnboarding,
    isInitialized,
    rateAd,
    saveAd,
    getRating,
    isSaved,
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
