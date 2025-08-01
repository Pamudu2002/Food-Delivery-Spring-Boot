import React, { useContext, useMemo } from 'react';
import { StoreContext } from '../contexts/StoreContext';
import FoodCard from './FoodCard';

function FoodDisplay({ searchTerm, category }) {
  const { foodList } = useContext(StoreContext);

  const filteredFood = useMemo(() => {
    if (!foodList || foodList.length === 0) return [];

    return foodList.filter(food => {
      const matchesSearch = searchTerm
        ? food.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchesCategory =
        category && category !== 'All'
          ? food.category?.toLowerCase() === category.toLowerCase()
          : true;

      return matchesSearch && matchesCategory;
    });
  }, [foodList, searchTerm, category]);

  if (!foodList || foodList.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-64 text-slate-500">
        <p className="text-lg">No food items available</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFood.length === 0 ? (
          <p className="text-center text-slate-500 col-span-full">
            No matching food items found.
          </p>
        ) : (
          filteredFood.map((food, index) => (
            <FoodCard key={food.id || index} food={food} index={index} />
          ))
        )}
      </div>
    </div>
  );
}

export default FoodDisplay;
