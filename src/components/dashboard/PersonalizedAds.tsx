'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AdCard } from '@/components/ads/AdCard';
import { useAdStore } from '@/store/ad-store';
import { getPersonalizedAdRecommendations, PersonalizedAdRecommendationsOutput } from '@/ai/flows/personalized-ad-recommendations';
import { initialProducts } from '@/lib/data';
import { Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function PersonalizedAds() {
  const { ratings, getCartProductIds } = useAdStore();
  const [recommendations, setRecommendations] = useState<PersonalizedAdRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    const userAdRatings = Object.entries(ratings).map(([adId, rating]) => ({
      adId,
      rating: rating === 'like' ? 1 : -1,
    }));

    const cartProductIds = getCartProductIds();

    try {
      const result = await getPersonalizedAdRecommendations({
        userAdRatings,
        cartProductIds,
        // Optional:
        // seasonalOffers: ['Summer Sale on Sports Gear'],
        // popularProducts: ['NexaGear Pro-Run'],
      });
      setRecommendations(result);
    } catch (e) {
      setError('Failed to fetch recommendations. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const recommendedAds = recommendations
    ? initialProducts.filter(ad => recommendations.recommendedAdIds.includes(ad.id))
    : [];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>For You</CardTitle>
        <CardDescription>AI-powered ad recommendations based on your activity.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center">
        {!recommendations && !isLoading && !error && (
            <div className="text-center">
            <p className="text-muted-foreground mb-4">Click the button to generate your personalized ads.</p>
            <Button onClick={handleFetchRecommendations}>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Recommendations
            </Button>
            </div>
        )}
        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {error && (
            <div className="text-center">
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
                <Button onClick={handleFetchRecommendations} variant="outline" className="mt-4">
                    Try Again
                </Button>
            </div>
        )}
        {recommendations && (
          <div className='space-y-4'>
            <Alert>
              <Wand2 className="h-4 w-4" />
              <AlertTitle>AI Recommendation</AlertTitle>
              <AlertDescription className="text-xs">{recommendations.reasoning}</AlertDescription>
            </Alert>
            {recommendedAds.length > 0 ? (
               <div className="space-y-2">
                {recommendedAds.map(ad => (
                  <AdCard key={ad.id} ad={ad} layout="compact" />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center text-sm">No new recommendations found based on your profile.</p>
            )}
            <div className="text-center mt-4">
                <Button onClick={handleFetchRecommendations} variant="outline">
                    <Wand2 className="mr-2 h-4 w-4" />
                    Regenerate
                </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
