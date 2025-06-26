import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Minus } from 'lucide-react';

interface MenuItemCardProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ id, name, description, price, imageUrl }) => {
  const [quantity, setQuantity] = useState(0);
  const { toast } = useToast();

  console.log('MenuItemCard loaded for:', name);

  const handleIncrease = () => {
    if (quantity === 0) {
      toast({
        title: "Item Added",
        description: `${name} has been added to your cart.`,
      });
    }
    setQuantity(prevQuantity => prevQuantity + 1);
    console.log(`Increased quantity for item ${id} to ${quantity + 1}`);
  };

  const handleDecrease = () => {
    setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0));
    console.log(`Decreased quantity for item ${id} to ${quantity - 1}`);
  };

  return (
    <Card className="flex items-center p-4 transition-all hover:shadow-md">
      <div className="flex-1 pr-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
        <p className="text-md font-bold mt-2">${price.toFixed(2)}</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        {imageUrl && (
          <img 
            src={imageUrl || 'https://via.placeholder.com/100'} 
            alt={name} 
            className="w-24 h-24 object-cover rounded-md mb-2"
          />
        )}
        {quantity === 0 ? (
          <Button onClick={handleIncrease} className="w-full">
            Add
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleDecrease}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-bold text-lg w-8 text-center">{quantity}</span>
            <Button variant="outline" size="icon" onClick={handleIncrease}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MenuItemCard;