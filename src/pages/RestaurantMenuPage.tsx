import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuItemCard from '@/components/MenuItemCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

// --- Placeholder Data ---
const restaurantDetails = {
  name: 'Sushi Heaven',
  address: '123 Ocean Ave, Food City',
  rating: 4.5,
  imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example image
};

const menuCategories = [
  {
    category: 'Appetizers',
    items: [
      {
        id: 'app1',
        name: 'Edamame',
        description: 'Steamed young soybeans, lightly salted. A perfect healthy start.',
        price: 5.99,
        imageUrl: 'https://images.unsplash.com/photo-1599408075704-500b5753069c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        id: 'app2',
        name: 'Gyoza',
        description: 'Pan-fried Japanese dumplings filled with pork and vegetables.',
        price: 7.50,
        imageUrl: 'https://images.unsplash.com/photo-1626202157922-22d7543a7585?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
    ],
  },
  {
    category: 'Sushi Rolls',
    items: [
      {
        id: 'roll1',
        name: 'California Roll',
        description: 'Classic roll with crab, avocado, and cucumber.',
        price: 8.99,
        imageUrl: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        id: 'roll2',
        name: 'Spicy Tuna Roll',
        description: 'A fiery mix of tuna, spicy mayo, and cucumber.',
        price: 10.50,
        imageUrl: 'https://images.unsplash.com/photo-1611141654281-a5b8148b3c58?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        id: 'roll3',
        name: 'Dragon Roll',
        description: 'Eel and cucumber topped with thinly sliced avocado.',
        price: 14.00,
        imageUrl: 'https://images.unsplash.com/photo-1625944022823-6e3e56c522b5?q=80&w=1870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
       {
        id: 'roll4',
        name: 'Philadelphia Roll',
        description: 'Smoked salmon, cream cheese, and cucumber.',
        price: 11.50,
        imageUrl: 'https://plus.unsplash.com/premium_photo-1667295556291-a63812a85973?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
    ],
  },
];


const RestaurantMenuPage = () => {
  console.log('RestaurantMenuPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {/* Restaurant Info Header */}
        <header className="flex flex-col md:flex-row items-center gap-6 mb-8 border-b pb-8">
          <Avatar className="w-24 h-24 md:w-32 md:h-32 border">
            <AvatarImage src={restaurantDetails.imageUrl} alt={restaurantDetails.name} />
            <AvatarFallback>{restaurantDetails.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight">{restaurantDetails.name}</h1>
            <p className="text-lg text-muted-foreground mt-2">{restaurantDetails.address}</p>
            <Badge variant="secondary" className="mt-4">
              <Star className="h-4 w-4 mr-2 text-yellow-500 fill-yellow-500" />
              {restaurantDetails.rating.toFixed(1)}
            </Badge>
          </div>
        </header>
        
        {/* Menu Sections */}
        <div className="space-y-12">
          {menuCategories.map((category) => (
            <section key={category.category}>
              <h2 className="text-3xl font-semibold mb-6 pb-2 border-b-2 border-primary">{category.category}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {category.items.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    imageUrl={item.imageUrl}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantMenuPage;