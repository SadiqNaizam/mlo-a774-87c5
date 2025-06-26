import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'About Us', href: '#' },
    { label: 'Contact Support', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ];

  return (
    <footer className="bg-muted border-t">
      <div className="container flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
        {/* Brand and Copyright */}
        <div className="flex flex-col items-center gap-2 md:items-start">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5 text-primary" />
            <span className="font-bold">QuickBites</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} QuickBites. All rights reserved.
          </p>
        </div>

        {/* Footer Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;