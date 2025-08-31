'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { useAdStore } from '@/store/ad-store';
import { ProductCard } from '@/components/products/ProductCard';

export default function AffiliateProductsPage() {
  const { affiliateProducts, isInitialized } = useAdStore();

  return (
    <MainLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
           <div>
            <h1 className="text-3xl font-bold tracking-tight">Affiliate Products</h1>
            <p className="text-muted-foreground">Manage your converted products and add them to your cart.</p>
          </div>
        </div>
        
        {isInitialized && affiliateProducts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {affiliateProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-16">
            <h3 className="text-2xl font-bold tracking-tight">No Affiliate Products Yet</h3>
            <p className="text-muted-foreground">
              Go to your Ad History to convert ads into affiliate products.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
