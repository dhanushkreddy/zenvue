import { MainLayout } from '@/components/layout/MainLayout';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { EarningsChart } from '@/components/dashboard/EarningsChart';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

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
             <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>For You</CardTitle>
                <CardDescription>Personalized ad recommendations (coming soon).</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-center items-center">
                  <p className="text-muted-foreground">This feature is currently unavailable.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
