'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { useAdStore } from '@/store/ad-store';
import { SavedAdCard } from '@/components/products/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function SavedPage() {
  const { saved, isInitialized } = useAdStore();

  const renderSkeletons = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-[380px] w-full" />
      ))}
    </div>
  );

  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
           <div>
            <h1 className="text-4xl font-bold tracking-tight">Saved Ads</h1>
            <p className="text-muted-foreground mt-2">Your personal collection of favorite ads.</p>
          </div>
        </div>
        
        {!isInitialized ? renderSkeletons() : (
          <>
            {saved.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {saved.map(ad => (
                  <SavedAdCard key={ad.id} ad={ad} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-20 rounded-xl bg-muted/50">
                <h3 className="text-2xl font-bold tracking-tight">No Saved Ads Yet</h3>
                <p className="text-muted-foreground mt-2">
                  Click the bookmark icon on an ad in your feed to save it here.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}
