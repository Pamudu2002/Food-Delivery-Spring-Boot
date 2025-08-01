import React, {useState} from 'react'
import { Heart, Eye } from 'lucide-react';
import {Link} from 'react-router-dom';

function FoodCard({ food, index }) {

      const [favorites, setFavorites] = useState(new Set());

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

  const getCategoryIcon = (categoryName) => {
    const category = foodCategories.find(cat => 
      cat.name.toLowerCase() === categoryName.toLowerCase()
    );
    return category ? category.image : '🍽️';
  };

  const truncateDescription = (description, maxLength = 80) => {
    if (!description) return '';
    return description.length > maxLength 
      ? description.substring(0, maxLength) + '...' 
      : description;
  };

  const toggleFavorite = (foodId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(foodId)) {
        newFavorites.delete(foodId);
      } else {
        newFavorites.add(foodId);
      }
      return newFavorites;
    });
  };



  return (
    <>
          <div
            key={food.id || index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-slate-100"
          >
            {/* Food Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={food.imageUrl}
                alt={food.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZmFmYyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5NGE3YjgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Gb29kIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                }}
              />
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-sm">
                <span className="text-lg">{getCategoryIcon(food.category)}</span>
                <span className="text-xs font-medium text-slate-600 capitalize">
                  {food.category}
                </span>
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(food.id || index)}
                className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                  favorites.has(food.id || index)
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-white/90 text-slate-400 hover:text-red-500'
                }`}
              >
                <Heart
                  size={18}
                  className={favorites.has(food.id || index) ? 'fill-current' : ''}
                />
              </button>
            </div>

            {/* Card Content */}
            <div className="p-5">
              {/* Food Name and Price */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg text-slate-800 line-clamp-1">
                  {food.name}
                </h3>
                <span className="text-lg font-bold text-slate-900 bg-slate-50 px-2 py-1 rounded-lg">
                  ${food.price}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-2">
                {truncateDescription(food.description)}
              </p>

              {/* Action Button */}
              <Link to={`/food/${food.id}`}>
              <button
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 group"
              >
                <Eye size={18} className="group-hover:scale-110 transition-transform" />
                View Food
              </button>
              </Link>
            </div>
          </div>
    </>
  )
}

export default FoodCard