'use client';

import { useAdStore } from '@/store/ad-store';
import { AdCard } from '../ads/AdCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '../ui/button';

export function RecentlyConverted() {
  const { affiliateProducts, isInitialized } = useAdStore();

  const recentProducts = affiliateProducts.slice(-3).reverse();

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Recently Converted</CardTitle>
        <CardDescription>Your latest affiliate products.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        {isInitialized && recentProducts.length > 0 && (
          recentProducts.map(product => (
            <AdCard key={product.id} ad={product} layout="compact" />
          ))
        )}
        {isInitialized && recentProducts.length === 0 && (
          <div className="flex-grow flex flex-col justify-center items-center text-center p-4 rounded-xl bg-muted/50">
            <p className="text-sm text-muted-foreground">You haven't converted any ads yet.</p>
             <Link href="/ad-history" className="mt-4">
                <Button variant="outline">View Ad History</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
