import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

// Icons
import { Package, MapPin, CreditCard, Trash2, Edit } from 'lucide-react';

// Placeholder Data
const orderHistory = [
  { id: 'QB12345', date: '2024-08-10', total: '$25.50', status: 'Delivered', restaurant: 'Sushi Central', items: ['California Roll', 'Spicy Tuna Roll'] },
  { id: 'QB12332', date: '2024-07-28', total: '$18.00', status: 'Delivered', restaurant: 'Pizza Palace', items: ['Pepperoni Pizza', 'Garlic Bread'] },
  { id: 'QB12256', date: '2024-07-15', total: '$32.75', status: 'Cancelled', restaurant: 'Burger Barn', items: ['Cheeseburger', 'Fries'] },
];

const savedAddresses = [
  { id: 1, type: 'Home', line1: '123 Maple Street', city: 'Springfield', zip: '12345' },
  { id: 2, type: 'Work', line1: '456 Oak Avenue', city: 'Springfield', zip: '12345' },
];

const paymentMethods = [
  { id: 1, type: 'Visa', last4: '1234', expiry: '12/26' },
  { id: 2, type: 'MasterCard', last4: '5678', expiry: '08/25' },
];

// Zod Schemas for Forms
const addressSchema = z.object({
  addressLine1: z.string().min(5, 'Address is too short'),
  city: z.string().min(2, 'City is required'),
  zipCode: z.string().regex(/^\d{5}$/, 'Must be a 5-digit zip code'),
});

const paymentSchema = z.object({
  cardholderName: z.string().min(2, 'Name is required'),
  cardNumber: z.string().regex(/^\d{16}$/, 'Must be a 16-digit card number'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Must be in MM/YY format'),
  cvv: z.string().regex(/^\d{3,4}$/, 'Invalid CVV'),
});

const UserProfilePage = () => {
  console.log('UserProfilePage loaded');

  const addressForm = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: { addressLine1: '', city: '', zipCode: '' },
  });

  const paymentForm = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { cardholderName: '', cardNumber: '', expiryDate: '', cvv: '' },
  });

  const onAddressSubmit = (values: z.infer<typeof addressSchema>) => {
    console.log('New Address:', values);
    // In a real app, you would send this to the backend
  };
  
  const onPaymentSubmit = (values: z.infer<typeof paymentSchema>) => {
    console.log('New Payment Method:', values);
    // In a real app, you would send this to the backend
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
            <p className="text-muted-foreground">Manage your orders, addresses, and payment methods.</p>
          </header>
          
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="history"><Package className="h-4 w-4 mr-2"/>Order History</TabsTrigger>
              <TabsTrigger value="addresses"><MapPin className="h-4 w-4 mr-2"/>Saved Addresses</TabsTrigger>
              <TabsTrigger value="payments"><CreditCard className="h-4 w-4 mr-2"/>Payment Methods</TabsTrigger>
            </TabsList>

            {/* Order History Tab */}
            <TabsContent value="history" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Past Orders</CardTitle>
                  <CardDescription>Review your previous orders or quickly reorder.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {orderHistory.map(order => (
                      <AccordionItem key={order.id} value={order.id}>
                        <AccordionTrigger>
                          <div className="flex justify-between w-full pr-4">
                            <span>Order #{order.id} ({order.date})</span>
                            <span className="font-semibold">{order.total}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-2">
                          <p><strong>Status:</strong> {order.status}</p>
                          <p><strong>Restaurant:</strong> {order.restaurant}</p>
                          <p><strong>Items:</strong> {order.items.join(', ')}</p>
                          <div className="flex gap-2 mt-4">
                            <Button size="sm">Reorder</Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link to="/order-tracking">View Details</Link>
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Saved Addresses Tab */}
            <TabsContent value="addresses" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Addresses</CardTitle>
                  <CardDescription>Add, edit, or remove your saved addresses.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {savedAddresses.map(addr => (
                      <div key={addr.id} className="flex items-center justify-between p-4 border rounded-md">
                        <div>
                          <p className="font-semibold">{addr.type}</p>
                          <p className="text-muted-foreground">{addr.line1}, {addr.city} {addr.zip}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4"/></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <Form {...addressForm}>
                    <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} className="space-y-4">
                      <h3 className="font-semibold text-lg">Add a New Address</h3>
                      <FormField control={addressForm.control} name="addressLine1" render={({ field }) => (
                        <FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="123 Main St" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <div className="flex gap-4">
                         <FormField control={addressForm.control} name="city" render={({ field }) => (
                          <FormItem className="flex-1"><FormLabel>City</FormLabel><FormControl><Input placeholder="Anytown" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={addressForm.control} name="zipCode" render={({ field }) => (
                          <FormItem><FormLabel>Zip Code</FormLabel><FormControl><Input placeholder="54321" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                      <Button type="submit">Save Address</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Methods Tab */}
            <TabsContent value="payments" className="mt-6">
              <Card>
                 <CardHeader>
                  <CardTitle>Manage Payments</CardTitle>
                  <CardDescription>Add, edit, or remove your saved payment methods.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                     {paymentMethods.map(pmt => (
                      <div key={pmt.id} className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center gap-4">
                          <CreditCard className="h-8 w-8 text-muted-foreground"/>
                          <div>
                            <p className="font-semibold">{pmt.type} ending in {pmt.last4}</p>
                            <p className="text-sm text-muted-foreground">Expires {pmt.expiry}</p>
                          </div>
                        </div>
                         <div className="flex gap-2">
                          <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4"/></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <Form {...paymentForm}>
                    <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-4">
                      <h3 className="font-semibold text-lg">Add a New Card</h3>
                       <FormField control={paymentForm.control} name="cardholderName" render={({ field }) => (
                        <FormItem><FormLabel>Cardholder Name</FormLabel><FormControl><Input placeholder="Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                       <FormField control={paymentForm.control} name="cardNumber" render={({ field }) => (
                        <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <div className="flex gap-4">
                         <FormField control={paymentForm.control} name="expiryDate" render={({ field }) => (
                          <FormItem className="flex-1"><FormLabel>Expiry (MM/YY)</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={paymentForm.control} name="cvv" render={({ field }) => (
                          <FormItem><FormLabel>CVV</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                      <Button type="submit">Save Card</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;