'use client';

import { useAdStore } from '@/store/ad-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { History, Handshake, DollarSign } from 'lucide-react';

export function DashboardStats() {
  const { ads, affiliateProducts, cart, isInitialized } = useAdStore();

  const potentialEarnings = cart.reduce(
    (total, item) => total + item.product.price * item.quantity * item.product.commissionRate,
    0
  );

  if (!isInitialized) {
    return null; // Or show skeletons
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Ads Viewed</CardTitle>
          <History className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{ads.length}</div>
          <p className="text-xs text-muted-foreground">in your history</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Affiliate Products</CardTitle>
          <Handshake className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{affiliateProducts.length}</div>
          <p className="text-xs text-muted-foreground">you've converted</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Potential Earnings</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${potentialEarnings.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">from items in your cart</p>
        </CardContent>
      </Card>
    </div>
  );
}
