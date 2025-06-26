import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star, Clock } from 'lucide-react';

// In a real-world app, the slug would likely be used in the URL,
// e.g., `/restaurant/${slug}`. But based on the provided App.tsx,
// the route is static: /restaurant-menu.
interface RestaurantCardProps {
  id: string | number;
  slug: string;
  name: string;
  imageUrl: string;
  cuisine: string;
  rating: number;
  deliveryTime: number; // Estimated time in minutes
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  name,
  imageUrl,
  cuisine,
  rating,
  deliveryTime,
  slug,
}) => {
  console.log('RestaurantCard loaded for:', name);

  return (
    <Link to="/restaurant-menu" state={{ restaurantSlug: slug }} className="group block">
      <Card className="w-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2">
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225'}
              alt={`Image of ${name}`}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold tracking-tight">{name}</h3>
            <Badge variant="outline">{cuisine}</Badge>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{deliveryTime}-{deliveryTime + 10} min</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;