import React, { useState, useEffect, useContext } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Star,
  Clock,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { StoreContext } from "../contexts/StoreContext";

function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const foodCategories = [
    { name: "Pizza", image: "🍕", count: "120+ dishes" },
    { name: "Biryani", image: "🍛", count: "85+ dishes" },
    { name: "Burger", image: "🍔", count: "95+ dishes" },
    { name: "Pasta", image: "🍝", count: "65+ dishes" },
    { name: "Chinese", image: "🥡", count: "110+ dishes" },
    { name: "Indian", image: "🍜", count: "150+ dishes" },
    { name: "Italian", image: "🍕", count: "75+ dishes" },
    { name: "Mexican", image: "🌮", count: "60+ dishes" },
    { name: "Desserts", image: "🍰", count: "45+ dishes" },
    { name: "Beverages", image: "🥤", count: "80+ drinks" },
  ];

  const { foodList } = useContext(StoreContext);

  // Filter foods based on search query
  const filteredFoods =
    foodList?.filter(
      (food) =>
        food.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.description?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

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
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container")) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const maxIndex = Math.max(0, foodCategories.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(currentIndex >= maxIndex ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex <= 0 ? maxIndex : currentIndex - 1);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchDropdown(value.length > 0);
  };

  const handleSearchFocus = () => {
    if (searchQuery.length > 0) {
      setShowSearchDropdown(true);
    }
  };

  const handleFoodSelect = (food) => {
    setSearchQuery(food.name);
    setShowSearchDropdown(false);
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
              Discover exceptional cuisine from Nature's Nook with
              lightning-fast delivery
            </p>
          </div>

          {/* Enhanced Search Bar with Dropdown */}
          <div className="max-w-2xl mx-auto mb-10 search-container relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                placeholder="Search for dishes, restaurants, or cuisines..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100 text-lg bg-white/80 backdrop-blur-sm shadow-lg relative z-10"
              />

              {/* Search Dropdown */}
              {showSearchDropdown && filteredFoods.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white/98 backdrop-blur-md border border-slate-200/60 rounded-3xl shadow-[0_20px_60px_-8px_rgba(0,0,0,0.08)] shadow-slate-900/[0.04] max-h-96 overflow-hidden z-50 ring-1 ring-black/5">
                  <div className="overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-slate-300/60 scrollbar-track-transparent hover:scrollbar-thumb-slate-400/60">
                    <div className="p-1.5">
                      {filteredFoods.slice(0, 8).map((food, index) => (
                        <div
                          key={food._id || index}
                          onClick={() => handleFoodSelect(food)}
                          className="flex items-center p-4 mx-1 rounded-2xl hover:bg-gradient-to-r hover:from-slate-50/80 hover:to-blue-50/40 cursor-pointer transition-all duration-300 group border border-transparent hover:border-slate-200/50 hover:shadow-sm active:scale-[0.998]"
                        >
                          {/* Food Image */}
                          <Link to={`/food/${food.id}`}>
                          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-slate-100 to-slate-200 ring-1 ring-slate-200/50 mr-4">
                            {food.imageUrl ? (
                              <>
                                <img
                                  src={food.imageUrl}
                                  alt={food.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </>
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-slate-200 via-slate-250 to-slate-300 flex items-center justify-center text-slate-500 text-xl group-hover:from-slate-300 group-hover:to-slate-400 transition-all duration-300">
                                🍽️
                              </div>
                            )}
                          </div>
                          </Link>

                          {/* Food Details - Main Content */}
                          <Link to={`/food/${food.id}`}>
                          <div className="flex-1 min-w-0 mr-4">
                            <div className="space-y-1">
                              <h4 className="font-semibold text-slate-800 text-sm sm:text-base truncate group-hover:text-slate-900 transition-colors duration-200 leading-tight">
                                {food.name}
                              </h4>
                              <p className="text-xs sm:text-sm text-slate-500 group-hover:text-slate-600 transition-colors duration-200 line-clamp-2 leading-relaxed">
                                {food.description || food.category}
                              </p>
                              {/* Category Badge */}
                              {food.category && (
                                <div className="pt-1">
                                  <span className="inline-flex items-center px-2.5 py-1 bg-gradient-to-r from-slate-100 to-slate-150 group-hover:from-blue-50 group-hover:to-indigo-50 text-slate-600 group-hover:text-slate-700 text-xs rounded-xl font-medium border border-slate-200/50 group-hover:border-blue-200/60 transition-all duration-300 shadow-sm">
                                    {food.category}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          </Link>
                        

                          {/* Price and Arrow Section */}
                          <Link to={`/food/${food.id}`}>
                          <div className="flex items-center space-x-3 flex-shrink-0">
                            <div className="text-right">
                              <span className="font-bold text-slate-700 group-hover:text-slate-900 text-sm sm:text-base transition-colors duration-200 bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text">
                                ${food.price}
                              </span>
                            </div>


                            {/* Hover Arrow */}
                            <div className="w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 ease-out">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-slate-400 group-hover:text-slate-700 transition-colors duration-300"
                              >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                          </Link>
                        </div>
                        
                      ))}

                      {/* Show more results indicator */}
                      {filteredFoods.length > 8 && (
                        <div className="px-4 py-3 mt-2 mx-1 text-center border-t border-slate-200/60">
                          <p className="text-sm text-slate-500 font-medium flex items-center justify-center gap-2">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse" />
                            +{filteredFoods.length - 8} more results available
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse" />
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* No results message */}
              {showSearchDropdown &&
                searchQuery.length > 0 &&
                filteredFoods.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-2xl z-50">
                    <div className="p-8 text-center">
                      <div className="text-4xl mb-4">🔍</div>
                      <p className="text-slate-600 font-medium">
                        No dishes found
                      </p>
                      <p className="text-slate-500 text-sm mt-1">
                        Try searching for something else
                      </p>
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* CTA Button */}
          <Link to={"/explore"}>
            <button className="group bg-slate-700 hover:bg-slate-800 text-white px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative">Explore Menu</span>
            </button>
          </Link>
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
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerView)
                }%)`,
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
                    ? "bg-slate-700 w-8"
                    : "bg-slate-300 hover:bg-slate-400 w-2"
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
