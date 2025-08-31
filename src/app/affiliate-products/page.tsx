'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { useAdStore } from '@/store/ad-store';
import { ProductListItem } from '@/components/products/ProductListItem';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AffiliateProductsPage() {
  const { affiliateProducts, isInitialized, addToCart, isInCart } = useAdStore();

  const renderSkeletons = () => (
    <div className="space-y-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4 rounded-xl border">
            <Skeleton className="h-16 w-16 rounded-lg" />
            <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
            </div>
            <Skeleton className="h-10 w-28" />
        </div>
      ))}
    </div>
  );

  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
           <div>
            <h1 className="text-4xl font-bold tracking-tight">Affiliate Products</h1>
            <p className="text-muted-foreground mt-2">Products you have converted from ads.</p>
          </div>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Your Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {!isInitialized ? renderSkeletons() : (
                <>
                    {affiliateProducts.length > 0 ? (
                    <div className="space-y-4">
                        {affiliateProducts.map(product => (
                            <ProductListItem 
                                key={product.id} 
                                product={product} 
                                onAddToCart={() => addToCart(product)}
                                isInCart={isInCart(product.id)}
                            />
                        ))}
                    </div>
                    ) : (
                    <div className="flex flex-col items-center justify-center text-center py-20 rounded-xl bg-muted/50">
                        <h3 className="text-2xl font-bold tracking-tight">No Affiliate Products Yet</h3>
                        <p className="text-muted-foreground mt-2">
                        Convert an ad from your history to see it here.
                        </p>
                    </div>
                    )}
                </>
                )}
            </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
