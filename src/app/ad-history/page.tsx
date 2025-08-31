'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAdStore } from '@/store/ad-store';
import { AdCard } from '@/components/ads/AdCard';
import { FilterControls } from '@/components/ads/FilterControls';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import type { Ad } from '@/lib/types';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { Separator } from '@/components/ui/separator';

export default function AdHistoryPage() {
  const { ads, convertToAffiliate, isAffiliateProduct, isInitialized } = useAdStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const filteredAds = ads
    .filter(ad =>
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.brand.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(ad => category === 'all' || ad.category === category);
  
  const categories = ['all', ...Array.from(new Set(ads.map(ad => ad.category)))];

  const handleConvert = (ad: Ad) => {
    convertToAffiliate(ad);
    toast({
      description: `Successfully converted "${ad.title}" to an affiliate product.`,
    });
  };

  const renderSkeletons = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="h-[420px] w-full" />
      ))}
    </div>
  );
  
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMMM d, yyyy');
  };

  const groupedAds = filteredAds.reduce((acc, ad) => {
    const dateKey = formatDate(ad.viewedDate);
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(ad);
    return acc;
  }, {} as Record<string, Ad[]>);

  const sortedGroupKeys = Object.keys(groupedAds).sort((a, b) => {
    if (a === 'Today') return -1;
    if (b === 'Today') return 1;
    if (a === 'Yesterday') return -1;
    if (b === 'Yesterday') return 1;
    return new Date(b).getTime() - new Date(a).getTime();
  });


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
               <div className="space-y-8">
                {sortedGroupKeys.map(dateKey => (
                  <div key={dateKey}>
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold tracking-tight">{dateKey}</h2>
                        <Separator className="flex-1" />
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
                      {groupedAds[dateKey].map(ad => (
                        <AdCard 
                          key={ad.id} 
                          ad={ad}
                          onConvert={() => handleConvert(ad)}
                          isConverted={isAffiliateProduct(ad.id)}
                        />
                      ))}
                    </div>
                  </div>
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
