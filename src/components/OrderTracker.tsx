import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, ChefHat, Bike, PackageCheck } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming this utility exists from shadcn setup

// Define the possible statuses for an order
export type OrderStatus = 'placed' | 'preparing' | 'delivery' | 'delivered';

// Define the props for the OrderTracker component
interface OrderTrackerProps {
  currentStatus: OrderStatus;
}

const steps = [
  {
    key: 'placed' as OrderStatus,
    label: 'Order Placed',
    icon: ClipboardCheck,
  },
  {
    key: 'preparing' as OrderStatus,
    label: 'Preparing Food',
    icon: ChefHat,
  },
  {
    key: 'delivery' as OrderStatus,
    label: 'Out for Delivery',
    icon: Bike,
  },
  {
    key: 'delivered' as OrderStatus,
    label: 'Delivered',
    icon: PackageCheck,
  },
];

const OrderTracker: React.FC<OrderTrackerProps> = ({ currentStatus }) => {
  console.log('OrderTracker loaded with status:', currentStatus);

  const currentStepIndex = steps.findIndex(step => step.key === currentStatus);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Track Your Order</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isActive = index === currentStepIndex;
            const isPending = index > currentStepIndex;
            
            const Icon = step.icon;

            return (
              <React.Fragment key={step.key}>
                {/* Step Item */}
                <div className="flex flex-col items-center text-center w-24">
                  <div
                    className={cn(
                      'flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300',
                      isCompleted || isActive ? 'bg-green-600 border-green-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-400',
                      isActive && 'animate-pulse'
                    )}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <p
                    className={cn(
                      'mt-2 text-sm font-medium transition-colors duration-300',
                      isCompleted || isActive ? 'text-gray-800' : 'text-gray-500'
                    )}
                  >
                    {step.label}
                  </p>
                </div>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className={cn(
                    'flex-1 h-1 transition-colors duration-500 mx-2',
                    isCompleted ? 'bg-green-600' : 'bg-gray-300'
                  )} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTracker;