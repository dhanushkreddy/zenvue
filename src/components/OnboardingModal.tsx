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
import { History, Bookmark, Heart } from 'lucide-react';

const onboardingSteps = [
  {
    icon: Heart,
    title: 'React to Ads in Your Feed',
    description: "Like ads to personalize your feed. Your home feed is where you'll discover new products and brands.",
  },
  {
    icon: Bookmark,
    title: 'Save Your Favorites',
    description: "See something you love? Bookmark it to save it to your personal collection for later.",
  },
  {
    icon: History,
    title: 'Browse Your History',
    description: "Easily find any ad you've seen before in your ad history.",
  },
];

export function OnboardingModal() {
  const { showOnboarding, closeOnboarding } = useAdStore();

  return (
    <Dialog open={showOnboarding} onOpenChange={(open) => !open && closeOnboarding()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to AdGram!</DialogTitle>
          <DialogDescription>
            Your new space to discover and save ads you love.
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
