'use client';

import Image from 'next/image';
import { ShoppingCart, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/types';

interface ProductListItemProps {
  product: Product;
  onAddToCart: () => void;
  isInCart: boolean;
}

export function ProductListItem({ product, onAddToCart, isInCart }: ProductListItemProps) {
  return (
    <div className="flex items-center space-x-4 p-4 rounded-xl border transition-colors hover:bg-muted/50">
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={80}
        height={80}
        data-ai-hint={product.dataAiHint}
        className="rounded-lg object-cover aspect-square"
      />
      <div className="flex-1">
        <p className="font-semibold">{product.title}</p>
        <p className="text-sm text-muted-foreground">{product.brand}</p>
        <p className="font-bold text-primary mt-1">${product.price.toFixed(2)}</p>
      </div>
      <Button onClick={onAddToCart} disabled={isInCart} className="w-36">
        {isInCart ? (
          <>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            In Cart
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </>
        )}
      </Button>
    </div>
  );
}
