import React, { useContext, useState } from 'react';
import { StoreContext } from '../contexts/StoreContext';
import FoodCard from './FoodCard';


function FoodDisplay() {
  const { foodList } = useContext(StoreContext);


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
        {foodList.map((food, index) => (
          <FoodCard key={food.id || index} food={food} index={index} />
        ))}
      </div>
    </div>
  );
}

export default FoodDisplay;