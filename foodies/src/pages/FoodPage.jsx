import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFoodById } from '../services/foodService';
import { ShoppingCart, Star, X } from 'lucide-react';

function FoodPage() {
  const { foodId } = useParams();
  const [food, setFood] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getFood = async () => {
      const foodData = await fetchFoodById(foodId);
      setFood(foodData);
    };
    getFood();
  }, [foodId]);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsAddingToCart(false);
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const truncateDescription = (text, maxLength = 120) => {
    if (!text) return "A delicious and carefully crafted dish made with the finest ingredients to deliver an exceptional dining experience.";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const fullDescription = food.description || "A delicious and carefully crafted dish made with the finest ingredients to deliver an exceptional dining experience.";
  const shouldShowReadMore = fullDescription.length > 120;

  if (!food.name) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <>
      <div className="h-[90dvh] overflow-auto bg-slate-50 flex flex-col md:flex-row">
        {/* Left - Image */}
        <div className="flex-1 relative bg-white">
          <div className="h-full flex items-center justify-center p-8">
            <div className="relative w-full max-w-md">
              <div className="aspect-square w-full overflow-hidden rounded-3xl shadow-2xl bg-slate-100">
                <img
                  src={food.imageUrl || "/api/placeholder/400/400"}
                  alt={food.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                  {food.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Details */}
        <div className="flex-1 bg-white p-8 flex flex-col justify-center">
          <div className="max-w-lg mx-auto w-full space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-slate-900 leading-tight">
                {food.name}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-slate-600 text-sm">(4.8 • 124 reviews)</span>
              </div>
              <div className="text-3xl font-bold text-slate-900">
                ${food.price}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">Description</h3>
              <div className="text-slate-600 leading-relaxed">
                {truncateDescription(fullDescription)}
                {shouldShowReadMore && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="ml-2 text-slate-900 font-medium hover:text-slate-700 transition-colors underline"
                  >
                    Read more
                  </button>
                )}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 bg-white font-medium text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700"
                  >
                    +
                  </button>
                </div>
                <span className="text-slate-600">
                  Total: <span className="font-semibold text-slate-900">${(food.price * quantity).toFixed(2)}</span>
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isAddingToCart ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Adding to Cart...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">{food.name} description</h2>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line text-justify">
              {fullDescription}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default FoodPage;
