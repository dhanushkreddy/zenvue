'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { CartView } from '@/components/cart/CartView';

export default function CartPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Personal Cart</h1>
            <p className="text-muted-foreground">Review your items and potential earnings before checkout.</p>
          </div>
        </div>
        <CartView />
      </div>
    </MainLayout>
  );
}
