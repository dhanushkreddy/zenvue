'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { useAdStore } from '@/store/ad-store';
import { AdCard } from '@/components/ads/AdCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const { ads, isInitialized } = useAdStore();

  const renderSkeletons = () => (
    <div className="space-y-8">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-[550px] w-full" />
      ))}
    </div>
  );

  return (
    <MainLayout>
      <div className="flex justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl space-y-8">
          {!isInitialized ? renderSkeletons() : (
            ads.map(ad => <AdCard key={ad.id} ad={ad} layout="feed" />)
          )}
        </div>
      </div>
    </MainLayout>
  );
}
