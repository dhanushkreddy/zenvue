'use client';

import Image from 'next/image';
import { Bookmark, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAdStore } from '@/store/ad-store';
import { Badge } from '../ui/badge';
import type { Ad } from '@/lib/types';

interface SavedAdCardProps {
  ad: Ad;
}

export function SavedAdCard({ ad }: SavedAdCardProps) {
  const { saveAd, isSaved } = useAdStore();
  const saved = isSaved(ad.id);

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
         </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-sm font-semibold text-muted-foreground">{ad.brand}</p>
        <CardTitle className="text-lg font-semibold leading-tight mt-1">{ad.title}</CardTitle>
      </CardContent>
      <CardFooter className="p-2 bg-muted/30 border-t">
        <Button onClick={() => saveAd(ad)} className="w-full">
            <Bookmark className="mr-2 h-4 w-4" />
            {saved ? 'Unsave' : 'Save'}
        </Button>
      </CardFooter>
    </Card>
  );
}
