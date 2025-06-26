import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Define the shape of a single cart item
interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}

// Define the props for the CartSummary component
interface CartSummaryProps {
  items: CartItem[];
  deliveryFee?: number;
  serviceFee?: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  items = [],
  deliveryFee = 2.99,
  serviceFee = 1.50,
}) => {
  console.log('CartSummary loaded');

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + deliveryFee + serviceFee;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length > 0 ? (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)} &times; {item.quantity}
                  </p>
                </div>
                <p className="font-medium text-right">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-4">Your cart is empty.</p>
        )}

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-muted-foreground">Subtotal</p>
            <p className="font-medium">${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted-foreground">Delivery Fee</p>
            <p className="font-medium">${deliveryFee.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted-foreground">Service Fee</p>
            <p className="font-medium">${serviceFee.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-800 p-4 mt-4 rounded-b-lg">
        <div className="flex justify-between w-full">
          <p className="text-lg font-bold">Total</p>
          <p className="text-lg font-bold">${total.toFixed(2)}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CartSummary;