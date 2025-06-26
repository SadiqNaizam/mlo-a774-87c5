import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UtensilsCrossed, Search, ShoppingCart, User } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        {/* Logo and Brand Name */}
        <Link to="/" className="flex items-center gap-2" aria-label="Back to homepage">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <span className="hidden text-lg font-bold sm:inline-block">
            QuickBites
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-4 md:mx-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for restaurants..."
              className="w-full rounded-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/checkout">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Open Cart</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/user-profile">
              <User className="h-5 w-5" />
              <span className="sr-only">User Profile</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;