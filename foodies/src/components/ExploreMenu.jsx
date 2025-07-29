import React from "react";
import { Search, Filter } from "lucide-react";

function ExploreMenu({ searchTerm, setSearchTerm, category, setCategory }) {
  const categories = [
    "All", "Pizza", "Biriyani", "Burger", "Pasta", "Chinese", 
    "Indian", "Italian", "Mexican", "Desserts", "Beverages"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
          Explore Our Menu
        </h2>
        <p className="text-slate-600 text-sm md:text-base">
          Discover delicious food from various cuisines
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
        {/* Search Input */}
        <div className="relative w-full lg:w-96">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your favourite food..."
            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl 
                     bg-white text-slate-700 placeholder-slate-400
                     focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent
                     shadow-sm hover:shadow-md transition-all duration-300
                     text-sm md:text-base"
          />
        </div>

        {/* Category Filter */}
        <div className="relative w-full lg:w-64">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-slate-400" />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full pl-12 pr-10 py-3 border border-slate-200 rounded-xl 
                     bg-white text-slate-700 appearance-none cursor-pointer
                     focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent
                     shadow-sm hover:shadow-md transition-all duration-300
                     text-sm md:text-base"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="py-2">
                {cat}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(category !== "All" || searchTerm) && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <span className="text-sm text-slate-600">Active filters:</span>
          {category !== "All" && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                           bg-slate-100 text-slate-700 border border-slate-200">
              Category: {category}
              <button
                onClick={() => setCategory("All")}
                className="ml-2 text-slate-500 hover:text-slate-700 transition-colors"
              >
                ×
              </button>
            </span>
          )}
          {searchTerm && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                           bg-slate-100 text-slate-700 border border-slate-200">
              Search: "{searchTerm}"
              <button
                onClick={() => setSearchTerm("")}
                className="ml-2 text-slate-500 hover:text-slate-700 transition-colors"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default ExploreMenu;