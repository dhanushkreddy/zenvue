

'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { EarningsChart } from '@/components/dashboard/EarningsChart';
import { RecentlyConverted } from '@/components/dashboard/RecentlyConverted';

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              An overview of your ad interactions and affiliate progress.
            </p>
          </div>
        </div>
        <DashboardStats />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-4">
            <EarningsChart />
          </div>
          <div className="lg:col-span-3">
            <RecentlyConverted />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
