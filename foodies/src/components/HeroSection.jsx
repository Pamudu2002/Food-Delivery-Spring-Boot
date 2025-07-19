import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Star, Clock, MapPin } from 'lucide-react';

function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(6);
  
  const foodCategories = [
    { name: 'Pizza', image: '🍕', count: '120+ dishes' },
    { name: 'Biryani', image: '🍛', count: '85+ dishes' },
    { name: 'Burger', image: '🍔', count: '95+ dishes' },
    { name: 'Pasta', image: '🍝', count: '65+ dishes' },
    { name: 'Chinese', image: '🥡', count: '110+ dishes' },
    { name: 'Indian', image: '🍜', count: '150+ dishes' },
    { name: 'Italian', image: '🍕', count: '75+ dishes' },
    { name: 'Mexican', image: '🌮', count: '60+ dishes' },
    { name: 'Desserts', image: '🍰', count: '45+ dishes' },
    { name: 'Beverages', image: '🥤', count: '80+ drinks' }
  ];

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2); // Mobile: show 2 items for better spacing
      } else if (window.innerWidth < 768) {
        setItemsPerView(3); // Small tablet: show 3 items
      } else if (window.innerWidth < 1024) {
        setItemsPerView(4); // Tablet: show 4 items
      } else if (window.innerWidth < 1280) {
        setItemsPerView(5); // Desktop: show 5 items
      } else {
        setItemsPerView(6); // Large desktop: show 6 items
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, foodCategories.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(currentIndex >= maxIndex ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex <= 0 ? maxIndex : currentIndex - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-slate-700 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-slate-600 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-16 lg:mb-20">
          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-6 mb-8 text-slate-600">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">4.8 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">30min Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium">City Wide</span>
            </div>
          </div>
          
          {/* Main Headline */}
          <div className="space-y-6 mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 leading-[1.1]">
              Order your favorite
              <span className="block bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
                food here
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
              Discover exceptional cuisine from Nature's Nook with lightning-fast delivery
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for dishes, restaurants, or cuisines..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100 text-lg bg-white/80 backdrop-blur-sm shadow-lg"
              />
            </div>
          </div>

          {/* CTA Button */}
          <button className="group bg-slate-700 hover:bg-slate-800 text-white px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative">Explore Menu</span>
          </button>
        </div>

        {/* Enhanced Categories Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200/50 p-8 lg:p-10">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10">
            <div className="mb-6 lg:mb-0">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-3">
                Explore Our Menu
              </h2>
              <p className="text-lg text-slate-600 font-light">
                Curated collections of dishes from top-rated categories
              </p>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-3">
              <div className="flex space-x-1 bg-slate-100 rounded-xl p-1">
                <button
                  onClick={prevSlide}
                  disabled={currentIndex === 0}
                  className="p-3 rounded-lg text-slate-700 transition-all duration-200 hover:bg-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:shadow-none"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={currentIndex >= maxIndex}
                  className="p-3 rounded-lg text-slate-700 transition-all duration-200 hover:bg-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:shadow-none"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Categories Carousel */}
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` 
              }}
            >
              {foodCategories.map((category, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="group cursor-pointer h-full">
                    <div className="relative bg-gradient-to-br from-white to-slate-50 border border-slate-200/60 rounded-2xl p-6 lg:p-8 h-32 lg:h-40 flex items-center justify-center mb-4 shadow-lg hover:shadow-xl transform transition-all duration-500 group-hover:scale-105 group-hover:border-slate-300/80 group-hover:-translate-y-2 overflow-hidden">
                      {/* Hover background effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-100/0 to-slate-200/0 group-hover:from-slate-100/30 group-hover:to-slate-200/20 transition-all duration-500"></div>
                      
                      <span className="text-5xl lg:text-6xl relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                        {category.image}
                      </span>
                    </div>
                    
                    <div className="text-center space-y-2">
                      <h3 className="font-semibold text-lg text-slate-800 group-hover:text-slate-700 transition-colors duration-200">
                        {category.name}
                      </h3>
                      <p className="text-sm text-slate-500 font-medium">
                        {category.count}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex lg:hidden justify-center space-x-4 mt-8">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-slate-700 w-8' 
                    : 'bg-slate-300 hover:bg-slate-400 w-2'
                }`}
              />
            ))}
          </div>
        </div>

      
      </div>
    </div>
  );
}

export default HeroSection;