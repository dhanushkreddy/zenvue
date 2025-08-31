import { MainLayout } from '@/components/layout/MainLayout';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { EarningsChart } from '@/components/dashboard/EarningsChart';
import { PersonalizedAds } from '@/components/dashboard/PersonalizedAds';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <DashboardStats />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
              <EarningsChart />
            </Suspense>
          </div>
          <div className="col-span-4 lg:col-span-3">
             <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
              <PersonalizedAds />
            </Suspense>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
