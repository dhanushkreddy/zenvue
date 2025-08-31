import { MainLayout } from '@/components/layout/MainLayout';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { EarningsChart } from '@/components/dashboard/EarningsChart';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { RecentlyConverted } from '@/components/dashboard/RecentlyConverted';

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <Suspense fallback={<DashboardStats.Skeleton />}>
            <DashboardStats />
        </Suspense>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
              <EarningsChart />
            </Suspense>
          </div>
          <div className="col-span-4 lg:col-span-3">
             <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                <RecentlyConverted />
             </Suspense>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
