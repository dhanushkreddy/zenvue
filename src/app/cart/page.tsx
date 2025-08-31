'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { useAdStore } from '@/store/ad-store';
import { CartView } from '@/components/cart/CartView';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const { cart, isInitialized } = useAdStore();

  const renderSkeletons = () => (
     <div className="space-y-4">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );

  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Personal Cart</h1>
            <p className="text-muted-foreground mt-2">Review items before checkout.</p>
          </div>
        </div>
        
        {!isInitialized ? renderSkeletons() : (
          <>
            {cart.length > 0 ? (
              <CartView />
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-20 rounded-xl bg-muted/50">
                <h3 className="text-2xl font-bold tracking-tight">Your Cart is Empty</h3>
                <p className="text-muted-foreground mt-2">
                  Add affiliate products to your cart to see them here.
                </p>
                 <Link href="/affiliate-products" className="mt-4">
                    <Button variant="outline">Browse Products</Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}
