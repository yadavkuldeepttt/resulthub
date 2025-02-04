// components/layout/Navbar.jsx
"use client"

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import { Button } from '../ui/Button';

 const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600 italic font-georgia">143Satta matka </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="primary">Sign In</Button>
            <Button variant="outline">Sign Up</Button>
          </div>
          
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Button variant="primary" fullWidth>Sign In</Button>
            <Button variant="outline" fullWidth>Sign Up</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar