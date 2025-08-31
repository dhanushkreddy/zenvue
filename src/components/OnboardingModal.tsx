'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from './ui/button';
import { useAdStore } from '@/store/ad-store';
import { Card, CardContent } from './ui/card';
import { History, Handshake, BarChart2 } from 'lucide-react';

const onboardingSteps = [
  {
    icon: History,
    title: 'Track Your Ad History',
    description: "View all the ads you've seen in one place. Like or dislike them to personalize your future recommendations.",
  },
  {
    icon: Handshake,
    title: 'Convert Ads to Affiliate Products',
    description: "Turn any ad into an affiliate product with a single click. Add them to your affiliate list and personal cart.",
  },
  {
    icon: BarChart2,
    title: 'Manage & Earn',
    description: "Your personal cart shows potential earnings. Manage your items and see how your choices can turn into rewards.",
  },
];

export function OnboardingModal() {
  const { showOnboarding, closeOnboarding } = useAdStore();

  return (
    <Dialog open={showOnboarding} onOpenChange={(open) => !open && closeOnboarding()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to AdControl Hub!</DialogTitle>
          <DialogDescription>
            Take control of your ads. Here’s a quick guide.
          </DialogDescription>
        </DialogHeader>
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            {onboardingSteps.map((step, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6 flex-col gap-4 text-center">
                      <step.icon className="w-16 h-16 text-primary" />
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <DialogFooter>
          <Button onClick={closeOnboarding}>Get Started</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
