'use client';

import Image from 'next/image';
import { ThumbsUp, ThumbsDown, Handshake, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAdStore } from '@/store/ad-store';
import { Badge } from '../ui/badge';
import type { Ad } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AdCardProps {
  ad: Ad;
  layout?: 'default' | 'compact';
}

export function AdCard({ ad, layout = 'default' }: AdCardProps) {
  const { rateAd, getRating, convertToAffiliate, isAffiliate } = useAdStore();
  const rating = getRating(ad.id);
  const alreadyAffiliate = isAffiliate(ad.id);

  if (layout === 'compact') {
    return (
        <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-accent transition-colors">
            <Image
                src={ad.thumbnail}
                alt={ad.title}
                width={64}
                height={64}
                data-ai-hint={ad.dataAiHint}
                className="rounded-md object-cover aspect-square"
            />
            <div className="flex-1">
                <p className="font-semibold text-sm line-clamp-1">{ad.title}</p>
                <p className="text-xs text-muted-foreground">{ad.brand}</p>
            </div>
             <Button size="sm" variant="ghost" onClick={() => convertToAffiliate(ad.id)} disabled={alreadyAffiliate}>
                {alreadyAffiliate ? <CheckCircle2 className="text-green-500" /> : <Handshake className="h-4 w-4" />}
            </Button>
        </div>
    );
  }

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative">
          <Image
            src={ad.thumbnail}
            alt={ad.title}
            width={400}
            height={300}
            data-ai-hint={ad.dataAiHint}
            className="object-cover w-full aspect-[4/3]"
          />
          <Badge variant="secondary" className="absolute top-2 right-2 backdrop-blur-sm">{ad.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-sm font-semibold text-muted-foreground">{ad.brand}</p>
        <CardTitle className="text-lg font-semibold leading-tight mt-1">{ad.title}</CardTitle>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{ad.description}</p>
      </CardContent>
      <CardFooter className="p-2 bg-muted/30 border-t flex flex-col items-stretch gap-2">
        <div className="flex gap-2">
          <Button 
            variant={rating === 'like' ? 'secondary' : 'ghost'}
            className="w-full"
            onClick={() => rateAd(ad.id, 'like')}
          >
            <ThumbsUp className={cn("mr-2 h-4 w-4", rating === 'like' && "fill-primary text-primary")} />
            Like
          </Button>
          <Button 
            variant={rating === 'dislike' ? 'secondary' : 'ghost'} 
            className="w-full"
            onClick={() => rateAd(ad.id, 'dislike')}
          >
            <ThumbsDown className={cn("mr-2 h-4 w-4", rating === 'dislike' && "fill-destructive text-destructive")} />
            Dislike
          </Button>
        </div>
        <Button onClick={() => convertToAffiliate(ad.id)} disabled={alreadyAffiliate} className="w-full">
            {alreadyAffiliate ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Handshake className="mr-2 h-4 w-4" />}
            {alreadyAffiliate ? 'Added to Affiliates' : 'Convert to Affiliate'}
        </Button>
      </CardFooter>
    </Card>
  );
}
