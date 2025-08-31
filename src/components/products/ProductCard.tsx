'use client';

import Image from 'next/image';
import { ShoppingCart, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAdStore } from '@/store/ad-store';
import { Badge } from '../ui/badge';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInCart } = useAdStore();
  const inCart = isInCart(product.id);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
         <div className="relative">
            <Image
                src={product.thumbnail}
                alt={product.title}
                width={400}
                height={300}
                data-ai-hint={product.dataAiHint}
                className="object-cover w-full aspect-[4/3]"
            />
            <Badge variant="default" className="absolute top-2 right-2 backdrop-blur-sm bg-primary/80">
                Comm: {(product.commissionRate * 100).toFixed(0)}%
            </Badge>
         </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-sm font-semibold text-muted-foreground">{product.brand}</p>
        <CardTitle className="text-lg font-semibold leading-tight mt-1">{product.title}</CardTitle>
        <p className="font-bold text-primary text-2xl mt-2">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-2 bg-muted/30 border-t">
        <Button onClick={() => addToCart(product)} className="w-full" disabled={inCart}>
            {inCart ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <ShoppingCart className="mr-2 h-4 w-4" />}
            {inCart ? 'Added to Cart' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}
