'use client';

import Image from 'next/image';
import { useAdStore } from '@/store/ad-store';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';

export function CartView() {
  const { cart, updateCartQuantity, removeFromCart, isInitialized } = useAdStore();

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const potentialEarnings = cart.reduce(
    (total, item) => total + item.product.price * item.quantity * item.product.commissionRate,
    0
  );

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] hidden md:table-cell">Image</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.map(item => (
              <TableRow key={item.product.id}>
                <TableCell className="hidden md:table-cell">
                  <Image
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                </TableCell>
                <TableCell>
                  <p className="font-semibold">{item.product.title}</p>
                  <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateCartQuantity(item.product.id, parseInt(e.target.value, 10))}
                    className="w-20 mx-auto"
                  />
                </TableCell>
                <TableCell className="text-right">${item.product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">${(item.product.price * item.quantity).toFixed(2)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="text-right font-semibold">Subtotal</TableCell>
              <TableCell className="text-right font-bold">${subtotal.toFixed(2)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} className="text-right font-semibold text-primary">Potential Earnings (from commission)</TableCell>
              <TableCell className="text-right font-bold text-primary">${potentialEarnings.toFixed(2)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
      <CardFooter className="p-4 flex justify-end">
        <Button size="lg">Proceed to Checkout</Button>
      </CardFooter>
    </Card>
  );
}
