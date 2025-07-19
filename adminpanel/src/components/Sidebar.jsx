import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus, List, Package, Menu, X, ChefHat } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { 
      path: '/add-food', 
      label: 'Add Food', 
      icon: Plus,
      description: 'Add new food items'
    },
    { 
      path: '/list-food', 
      label: 'List Food', 
      icon: List,
      description: 'View all food items'
    },
    { 
      path: '/orders', 
      label: 'Orders', 
      icon: Package,
      description: 'Manage orders'
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar container - Fixed positioning for all screen sizes */}
      <aside 
        className={`
          fixed left-0 top-0 h-screen bg-white shadow-2xl transition-all duration-300 ease-in-out z-50 border-r border-slate-200 overflow-hidden
          ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
          ${isOpen || !isMobile ? 'w-72' : 'w-20'}
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Scrollable content container */}
        <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden">
          {/* Header section */}
          <div className="relative flex-shrink-0">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center shadow-lg border border-slate-500">
                    <ChefHat className="w-5 h-5 text-white" />
                  </div>
                  {(isOpen || !isMobile) && (
                    <div>
                      <h1 className="text-white font-bold text-xl tracking-tight">
                        Nature's Nook
                      </h1>
                      <p className="text-slate-300 text-sm opacity-90">
                        Restaurant Admin
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Mobile toggle button */}
                {isMobile && (
                  <button
                    onClick={toggleSidebar}
                    className="lg:hidden p-2 rounded-lg text-white hover:bg-slate-700 transition-colors"
                    aria-label="Close sidebar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Decorative gradient line */}
            <div className="h-1 bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600"></div>
          </div>
          
          {/* Navigation menu - Scrollable content */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto" role="menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  role="menuitem"
                  className={`
                    group flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 ease-in-out
                    ${active 
                      ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg transform scale-[1.02] border border-slate-600' 
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-800 hover:shadow-md border border-transparent hover:border-slate-200'
                    }
                    focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-white
                  `}
                  aria-current={active ? 'page' : undefined}
                >
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200
                    ${active 
                      ? 'bg-white/20 text-white border border-white/30' 
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-700 border border-slate-200'
                    }
                  `}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  {(isOpen || !isMobile) && (
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm tracking-wide">
                          {item.label}
                        </span>
                        {active && (
                          <div className="w-2 h-2 bg-white rounded-full opacity-80 shadow-sm"></div>
                        )}
                      </div>
                      <p className={`
                        text-xs mt-0.5 transition-colors duration-200
                        ${active ? 'text-slate-200' : 'text-slate-500 group-hover:text-slate-600'}
                      `}>
                        {item.description}
                      </p>
                    </div>
                  )}
                  
                  {/* Collapsed state indicator */}
                  {(!isOpen && !isMobile) && active && (
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-slate-600 rounded-l-full shadow-sm"></div>
                  )}
                </Link>
              );
            })}
          </nav>
          
          {/* Statistics/Quick Info Section */}
          {(isOpen || !isMobile) && (
            <div className="px-4 py-4 border-t border-slate-200 flex-shrink-0">
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
                <h3 className="text-sm font-semibold text-slate-800 mb-2">Quick Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">Total Items</span>
                    <span className="text-xs font-bold text-slate-800 bg-slate-200 px-2 py-1 rounded-full">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">Active Orders</span>
                    <span className="text-xs font-bold text-slate-800 bg-slate-200 px-2 py-1 rounded-full">8</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Footer section */}
          {(isOpen || !isMobile) && (
            <div className="border-t border-slate-200 p-4 bg-slate-50 flex-shrink-0">
              <div className="text-center">
                <p className="text-xs text-slate-500 font-medium">
                  Version 1.0.0
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  © 2025 Nature's Nook
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Resize handle for desktop */}
        {!isMobile && (
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-slate-200 to-transparent opacity-0 hover:opacity-100 transition-opacity cursor-col-resize"></div>
        )}
      </aside>
      
      {/* Mobile menu button - only show when sidebar is closed */}
      {isMobile && !isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-40 p-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-xl shadow-lg hover:from-slate-800 hover:to-slate-900 transition-all duration-200 lg:hidden border border-slate-600"
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}
    </>
  );
};

export default Sidebar;