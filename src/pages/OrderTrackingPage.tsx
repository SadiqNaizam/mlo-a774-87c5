import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderTracker, { OrderStatus } from '@/components/OrderTracker';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Clock, Home, HelpCircle } from 'lucide-react';

const OrderTrackingPage: React.FC = () => {
  console.log('OrderTrackingPage loaded');

  const [status, setStatus] = useState<OrderStatus>('placed');
  const [progress, setProgress] = useState(10);

  const statusMap: Record<OrderStatus, { progress: number; message: string; eta: string }> = {
    placed: { progress: 10, message: "We've received your order.", eta: "25-30 min" },
    preparing: { progress: 40, message: "The restaurant is preparing your food.", eta: "20-25 min" },
    delivery: { progress: 75, message: "Your order is out for delivery!", eta: "5-10 min" },
    delivered: { progress: 100, message: "Your order has been delivered. Enjoy!", eta: "Delivered" },
  };

  useEffect(() => {
    const statuses: OrderStatus[] = ['placed', 'preparing', 'delivery', 'delivered'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < statuses.length) {
        const newStatus = statuses[currentIndex];
        setStatus(newStatus);
        setProgress(statusMap[newStatus].progress);
      } else {
        clearInterval(interval);
      }
    }, 5000); // Progress to the next state every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl font-bold">Your Order is on its Way!</CardTitle>
              <CardDescription className="text-lg text-muted-foreground pt-2">
                {statusMap[status].message}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {/* Order Tracker Component */}
              <div className="mb-8">
                <OrderTracker currentStatus={status} />
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                 <Progress value={progress} className="w-full h-3" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Order Details Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Clock className="w-8 h-8 text-primary"/>
                        <div>
                            <p className="font-semibold">Estimated Delivery</p>
                            <p className="text-muted-foreground">{statusMap[status].eta}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-4">
                        <Home className="w-8 h-8 text-primary"/>
                        <div>
                            <p className="font-semibold">Delivery Address</p>
                            <p className="text-muted-foreground">123 Flavor St, Foodie City, 98765</p>
                        </div>
                    </div>
                     <div className="flex gap-2 pt-4">
                        <Button variant="outline">
                            <HelpCircle className="mr-2 h-4 w-4"/>
                            Contact Support
                        </Button>
                         <Button variant="secondary">View Receipt</Button>
                     </div>
                </div>

                {/* Map Placeholder Section */}
                <div>
                  <img 
                    src="https://placehold.co/600x400/e2e8f0/334155?text=Live+Map+View" 
                    alt="Map showing delivery route" 
                    className="rounded-lg w-full h-auto object-cover border"
                  />
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTrackingPage;