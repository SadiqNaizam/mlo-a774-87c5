import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from "sonner";

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartSummary from '@/components/CartSummary';

// Shadcn/UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Icons
import { CreditCard, Landmark } from 'lucide-react';

// Form validation schema
const addressSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Please enter a valid address." }),
  city: z.string().min(2, { message: "Please enter a valid city." }),
  zipCode: z.string().regex(/^\d{5}$/, { message: "Please enter a valid 5-digit zip code." }),
});

// Placeholder data for cart summary
const sampleCartItems = [
  { id: 1, name: 'Spicy Tuna Roll', price: 12.99, quantity: 2 },
  { id: 2, name: 'Miso Soup', price: 3.50, quantity: 1 },
  { id: 3, name: 'Edamame', price: 5.00, quantity: 1 },
];

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "John Doe",
      address: "123 Tastebud Lane",
      city: "Foodville",
      zipCode: "12345",
    },
  });

  const onSubmit = (values: z.infer<typeof addressSchema>) => {
    console.log("Order submitted with address:", values);
    toast.success("Order placed successfully!", {
      description: "We're preparing your food now. You'll be redirected to the tracking page.",
    });
    // Redirect to the order tracking page after a short delay
    setTimeout(() => {
      navigate('/order-tracking'); // Path from App.tsx
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Address Form */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form id="checkout-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Tastebud Lane" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="Foodville" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="zipCode"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>ZIP Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="12345" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="credit-card" className="space-y-4">
                  <Label htmlFor="credit-card" className="flex items-center space-x-3 p-4 border rounded-md cursor-pointer hover:bg-accent has-[:checked]:bg-accent has-[:checked]:border-primary">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <CreditCard className="h-5 w-5" />
                    <span>Credit / Debit Card</span>
                  </Label>
                  <Label htmlFor="paypal" className="flex items-center space-x-3 p-4 border rounded-md cursor-pointer hover:bg-accent has-[:checked]:bg-accent has-[:checked]:border-primary">
                     <RadioGroupItem value="paypal" id="paypal" />
                     <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" alt="PayPal Logo" className="h-5" />
                    <span>PayPal</span>
                  </Label>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
                <CartSummary items={sampleCartItems} />
                <Button type="submit" form="checkout-form" className="w-full" size="lg">
                    Place Order
                </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;