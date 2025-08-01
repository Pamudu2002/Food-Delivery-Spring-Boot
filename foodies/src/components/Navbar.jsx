import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User, UserPlus, Home, Compass, MessageCircle } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems] = useState(0); // Static number for demo

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Explore', href: '/explore', icon: Compass },
    { name: 'Contact Us', href: '/contact', icon: MessageCircle }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-slate-800">
              Nature's <span className="text-slate-600">Nook</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-slate-50"
                  >
                    <IconComponent size={18} />
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Desktop Right Side - Cart, Login, Register */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Icon */}
            <div className="relative">
              <button className="text-slate-700 hover:text-slate-900 p-2 rounded-md hover:bg-slate-50 transition-colors duration-200">
                <ShoppingCart size={20} />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-slate-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartItems}
                  </span>
                )}
              </button>
            </div>

            {/* Login Button */}
            <button className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-50 transition-colors duration-200 text-sm font-medium">
              <User size={16} />
              <span>Login</span>
            </button>

            {/* Register Button */}
            <button className="flex items-center space-x-2 bg-slate-700 text-white px-4 py-2 rounded-md hover:bg-slate-800 transition-colors duration-200 text-sm font-medium">
              <UserPlus size={16} />
              <span>Register</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-slate-700 hover:text-slate-900 p-2 rounded-md hover:bg-slate-50 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed inset-y-0 right-0 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out z-50`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Menu</h2>
            <button
              onClick={toggleMenu}
              className="text-slate-700 hover:text-slate-900 p-1 rounded-md hover:bg-slate-50 transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 py-6">
            <div className="px-4 space-y-2">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="flex items-center space-x-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={toggleMenu}
                  >
                    <IconComponent size={20} />
                    <span>{link.name}</span>
                  </a>
                );
              })}

              {/* Cart in Mobile */}
              <button className="flex items-center space-x-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 w-full">
                <div className="relative">
                  <ShoppingCart size={20} />
                  {cartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-slate-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {cartItems}
                    </span>
                  )}
                </div>
                <span>Cart</span>
              </button>
            </div>
          </div>

          {/* Mobile Auth Buttons */}
          <div className="border-t border-slate-200 p-4 space-y-3">
            <button className="flex items-center justify-center space-x-2 w-full text-slate-700 hover:text-slate-900 px-4 py-3 rounded-md border border-slate-300 hover:bg-slate-50 transition-colors duration-200 text-sm font-medium">
              <User size={16} />
              <span>Login</span>
            </button>
            <button className="flex items-center justify-center space-x-2 w-full bg-slate-700 text-white px-4 py-3 rounded-md hover:bg-slate-800 transition-colors duration-200 text-sm font-medium">
              <UserPlus size={16} />
              <span>Register</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 backdrop-blur-sm bg-white bg-opacity-20 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
}

export default Navbar;