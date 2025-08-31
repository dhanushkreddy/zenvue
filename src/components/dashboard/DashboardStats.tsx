'use client';

import { useAdStore } from '@/store/ad-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { History, Handshake, DollarSign } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const StatCard = ({ icon: Icon, title, value, footer }: { icon: React.ElementType, title: string, value: string | number, footer: string }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{footer}</p>
        </CardContent>
    </Card>
);

const StatCardSkeleton = () => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent>
            <Skeleton className="h-7 w-1/3 mb-1" />
            <Skeleton className="h-4 w-1/2" />
        </CardContent>
    </Card>
)

export function DashboardStats() {
  const { ads, affiliateProducts, cart, isInitialized } = useAdStore();

  const potentialEarnings = cart.reduce(
    (total, item) => total + item.product.price * item.quantity * item.product.commissionRate,
    0
  );
  
  if (!isInitialized) {
    return <DashboardStats.Skeleton />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard 
            icon={History}
            title="Total Ads Viewed"
            value={ads.length}
            footer="in your history"
        />
        <StatCard 
            icon={Handshake}
            title="Affiliate Products"
            value={affiliateProducts.length}
            footer="you've converted"
        />
        <StatCard 
            icon={DollarSign}
            title="Potential Earnings"
            value={`$${potentialEarnings.toFixed(2)}`}
            footer="from items in your cart"
        />
    </div>
  );
}

DashboardStats.Skeleton = function DashboardStatsSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg.grid-cols-3">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
        </div>
    );
};
