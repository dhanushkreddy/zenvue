'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAdStore } from '@/store/ad-store';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Skeleton } from '../ui/skeleton';

const chartData = [
  { month: 'Jan', earnings: 18.6 },
  { month: 'Feb', earnings: 30.5 },
  { month: 'Mar', earnings: 23.7 },
  { month: 'Apr', earnings: 48.3 },
  { month: 'May', earnings: 29.2 },
  { month: 'Jun', earnings: 50.9 },
  { month: 'Jul', earnings: 59.6 },
];

const chartConfig = {
  earnings: {
    label: 'Earnings',
    color: 'hsl(var(--primary))',
  },
};

export function EarningsChart() {
    const { isInitialized } = useAdStore();

    if (!isInitialized) return <Skeleton className="h-[400px] w-full" />;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Affiliate Earnings</CardTitle>
        <CardDescription>Your potential earnings over the last few months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `$${value}`} />
                <Tooltip cursor={{ fill: 'hsl(var(--accent))', radius: 8 }} content={<ChartTooltipContent indicator="dot" />} />
                <Bar dataKey="earnings" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
