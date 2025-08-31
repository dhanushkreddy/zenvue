'use client';

import Image from 'next/image';
import { ThumbsUp, ThumbsDown, Bookmark, Heart, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAdStore } from '@/store/ad-store';
import { Badge } from '../ui/badge';
import type { Ad } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { User } from 'lucide-react';

interface AdCardProps {
  ad: Ad;
  layout?: 'default' | 'compact' | 'feed';
}

export function AdCard({ ad, layout = 'default' }: AdCardProps) {
  const { rateAd, getRating, saveAd, isSaved } = useAdStore();
  const rating = getRating(ad.id);
  const alreadySaved = isSaved(ad.id);

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
             <Button size="sm" variant="ghost" onClick={() => saveAd(ad)} disabled={alreadySaved}>
                <Bookmark className={cn("h-4 w-4", alreadySaved && "fill-primary text-primary")} />
            </Button>
        </div>
    );
  }

  if (layout === 'feed') {
    return (
      <Card className="w-full max-w-2xl mx-auto overflow-hidden rounded-xl">
        <CardHeader className="flex flex-row items-center gap-3 p-4">
           <Avatar>
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{ad.brand}</p>
              <p className="text-xs text-muted-foreground">Sponsored</p>
            </div>
        </CardHeader>
        <CardContent className="p-0">
           <Image
              src={ad.thumbnail}
              alt={ad.title}
              width={600}
              height={600}
              data-ai-hint={ad.dataAiHint}
              className="object-cover w-full aspect-square"
            />
        </CardContent>
        <CardFooter className="p-4 flex flex-col items-start gap-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => rateAd(ad.id, 'like')}>
              <Heart className={cn("h-6 w-6", rating === 'like' && "fill-red-500 text-red-500")} />
            </Button>
             <Button variant="ghost" size="icon">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="ml-auto" onClick={() => saveAd(ad)} >
              <Bookmark className={cn("h-6 w-6", alreadySaved && "fill-foreground")} />
            </Button>
          </div>
          <div className="px-1">
            <p className="font-semibold text-sm">{ad.title}</p>
            <p className="text-sm text-muted-foreground line-clamp-2">{ad.description}</p>
          </div>
        </CardFooter>
      </Card>
    )
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
        <Button onClick={() => saveAd(ad)} disabled={alreadySaved} className="w-full">
            <Bookmark className="mr-2 h-4 w-4" />
            {alreadySaved ? 'Saved' : 'Save Ad'}
        </Button>
      </CardFooter>
    </Card>
  );
}
