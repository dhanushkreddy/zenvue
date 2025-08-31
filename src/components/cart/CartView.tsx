'use client';

import { useAdStore } from '@/store/ad-store';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Trash2 } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';

export function CartView() {
  const { cart, updateCartQuantity, removeFromCart, isInitialized } = useAdStore();

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const potentialEarnings = cart.reduce(
    (total, item) => total + item.product.price * item.quantity * item.product.commissionRate,
    0
  );

  if (!isInitialized) {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Skeleton className="h-[400px] w-full" />
        </div>
        <div>
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 rounded-xl bg-muted/50">
        <h3 className="text-2xl font-bold tracking-tight">Your Cart is Empty</h3>
        <p className="text-muted-foreground mt-2">Add some affiliate products to see them here.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8 items-start">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Cart Items ({cart.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-6 p-4">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={96}
                    height={96}
                    data-ai-hint={product.dataAiHint}
                    className="rounded-lg object-cover aspect-square"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{product.title}</p>
                    <p className="text-sm text-muted-foreground">{product.brand}</p>
                    <p className="text-base font-semibold mt-1">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => updateCartQuantity(product.id, parseInt(e.target.value, 10) || 1)}
                      className="w-16 h-10"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(product.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="sticky top-24">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxes</span>
              <span className="text-muted-foreground">Calculated at checkout</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                <span className="font-semibold text-green-700 dark:text-green-400">Potential Earnings</span>
                <span className="font-bold text-green-700 dark:text-green-400 text-lg">${potentialEarnings.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full h-11 text-base" size="lg">Proceed to Checkout</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
