import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-sm z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-color-foreground">QueryGen AI</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-color-foreground hover:text-color-primary transition-colors">
              Home
            </Link>
            <Link href="/create" className="text-color-foreground hover:text-color-primary transition-colors">
              Generate with AI
            </Link>
            <Link href="/link-to-sql" className="text-color-foreground hover:text-color-primary transition-colors">
              Link SQL
            </Link>
            <Button asChild className="bg-color-primary text-color-primary-foreground hover:bg-color-primary/90 transition-colors">
              <a href="https://github.com/zunxii/QueryGen-AI" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <FaGithub className="text-lg" /> GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
