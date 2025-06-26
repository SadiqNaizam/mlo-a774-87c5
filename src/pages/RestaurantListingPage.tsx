import React from 'react';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';

// shadcn/ui Components for filtering
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

// Placeholder data for the restaurant list
const sampleRestaurants = [
  {
    id: 1,
    slug: 'sushi-zen',
    name: 'Sushi Zen',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811CFb5d668?q=80&w=870&auto=format&fit=crop',
    cuisine: 'Japanese',
    rating: 4.8,
    deliveryTime: 25,
  },
  {
    id: 2,
    slug: 'bella-italia-pizzeria',
    name: 'Bella Italia Pizzeria',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=870&auto=format&fit=crop',
    cuisine: 'Italian',
    rating: 4.6,
    deliveryTime: 30,
  },
  {
    id: 3,
    slug: 'taco-fiesta',
    name: 'Taco Fiesta',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=781&auto=format&fit=crop',
    cuisine: 'Mexican',
    rating: 4.5,
    deliveryTime: 20,
  },
  {
    id: 4,
    slug: 'the-curry-house',
    name: 'The Curry House',
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=765&auto=format&fit=crop',
    cuisine: 'Indian',
    rating: 4.7,
    deliveryTime: 35,
  },
  {
    id: 5,
    slug: 'burger-bliss',
    name: 'Burger Bliss',
    imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=872&auto=format&fit=crop',
    cuisine: 'American',
    rating: 4.4,
    deliveryTime: 25,
  },
  {
    id: 6,
    slug: 'pho-kingdom',
    name: 'Pho Kingdom',
    imageUrl: 'https://images.unsplash.com/photo-1585102990924-c4b4d4a3b2b5?q=80&w=870&auto=format&fit=crop',
    cuisine: 'Vietnamese',
    rating: 4.9,
    deliveryTime: 40,
  },
  {
    id: 7,
    slug: 'mediterranean-grill',
    name: 'Mediterranean Grill',
    imageUrl: 'https://images.unsplash.com/photo-1623961919833-2c1b48503b57?q=80&w=774&auto=format&fit=crop',
    cuisine: 'Greek',
    rating: 4.6,
    deliveryTime: 30,
  },
  {
    id: 8,
    slug: 'thai-terrace',
    name: 'Thai Terrace',
    imageUrl: 'https://images.unsplash.com/photo-1626700051185-5c46412487b7?q=80&w=870&auto=format&fit=crop',
    cuisine: 'Thai',
    rating: 4.7,
    deliveryTime: 35,
  },
];


const RestaurantListingPage = () => {
    console.log('RestaurantListingPage loaded');

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            <Header />

            <main className="flex-1">
                <div className="container mx-auto px-4 py-8 md:py-12">
                    {/* Welcome Section */}
                    <section className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                            Find Your Next Meal
                        </h1>
                        <p className="mt-2 max-w-2xl mx-auto text-md md:text-lg text-muted-foreground">
                            Discover the best local restaurants and get food delivered right to your door.
                        </p>
                    </section>

                    {/* Filter Controls Section */}
                    <section className="mb-10 p-4 bg-white rounded-lg shadow-sm border">
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                            <div className="md:col-span-3">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="cuisine-filter" className="text-sm font-medium">Cuisine</Label>
                                        <Select>
                                            <SelectTrigger id="cuisine-filter" className="mt-1">
                                                <SelectValue placeholder="All Cuisines" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="italian">Italian</SelectItem>
                                                <SelectItem value="japanese">Japanese</SelectItem>
                                                <SelectItem value="mexican">Mexican</SelectItem>
                                                <SelectItem value="indian">Indian</SelectItem>
                                                <SelectItem value="american">American</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="rating-filter" className="text-sm font-medium">Rating</Label>
                                        <Select>
                                            <SelectTrigger id="rating-filter" className="mt-1">
                                                <SelectValue placeholder="Any Rating" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="4.5">4.5 Stars & Up</SelectItem>
                                                <SelectItem value="4">4 Stars & Up</SelectItem>
                                                <SelectItem value="3">3 Stars & Up</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                     <div>
                                        <Label htmlFor="price-filter" className="text-sm font-medium">Price</Label>
                                        <Select>
                                            <SelectTrigger id="price-filter" className="mt-1">
                                                <SelectValue placeholder="Any Price" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">$</SelectItem>
                                                <SelectItem value="2">$$</SelectItem>
                                                <SelectItem value="3">$$$</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                             <Button className="w-full h-10">Apply Filters</Button>
                         </div>
                    </section>
                    
                    {/* Restaurant Grid */}
                    <section>
                         <h2 className="text-2xl font-bold mb-6 text-gray-800">Restaurants Near You</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
                            {sampleRestaurants.map(restaurant => (
                                <RestaurantCard key={restaurant.id} {...restaurant} />
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default RestaurantListingPage;