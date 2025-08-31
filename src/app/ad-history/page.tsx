'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAdStore } from '@/store/ad-store';
import { AdCard } from '@/components/ads/AdCard';
import { FilterControls } from '@/components/ads/FilterControls';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdHistoryPage() {
  const { ads, isInitialized } = useAdStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const filteredAds = ads
    .filter(ad =>
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.brand.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(ad => category === 'all' || ad.category === category);
  
  const categories = ['all', ...Array.from(new Set(ads.map(ad => ad.category)))];

  const renderSkeletons = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="h-[420px] w-full" />
      ))}
    </div>
  );

  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Ad History</h1>
            <p className="text-muted-foreground mt-2">Review and manage the ads you've seen.</p>
          </div>
        </div>
        
        <FilterControls 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          category={category}
          setCategory={setCategory}
          categories={categories}
        />

        {!isInitialized ? renderSkeletons() : (
          <>
            {filteredAds.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredAds.map(ad => (
                  <AdCard key={ad.id} ad={ad} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-20 rounded-xl bg-muted/50">
                <h3 className="text-2xl font-bold tracking-tight">No Ads Found</h3>
                <p className="text-muted-foreground mt-2">
                  Your ad history is empty or doesn't match the current filters.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}
