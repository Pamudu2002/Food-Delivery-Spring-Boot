import React, { useState } from 'react';
import { Upload, Plus, X, Check, AlertCircle, ImageIcon, ChefHat } from 'lucide-react';
import { createFoodItem } from '../services/FoodService';

const AddFood = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    'Pizza',
    'Biryani',
    'Burger',
    'Pasta',
    'Chinese',
    'Indian',
    'Italian',
    'Mexican',
    'Desserts',
    'Beverages'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Food name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    if (!formData.image) {
      newErrors.image = 'Please upload an image';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          image: 'Image size must be less than 5MB'
        }));
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          image: 'Please select a valid image file'
        }));
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Clear image error
      if (errors.image) {
        setErrors(prev => ({
          ...prev,
          image: ''
        }));
      }
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }));
    setImagePreview(null);
    // Reset file input
    const input = document.getElementById('image-upload');
    if (input) input.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await createFoodItem(formData);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
        image: null,
      });
      setImagePreview(null);
      setErrors({});
      
      // Reset file input
      const input = document.getElementById('image-upload');
      if (input) input.value = '';
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-emerald-50 border-l-4 border-emerald-400 rounded-r-lg p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-emerald-600" />
              <p className="text-emerald-800 font-medium">Food item added successfully!</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-slate-700 to-slate-900 p-3 rounded-full shadow-lg">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">Menu Management</h1>
          <p className="text-slate-600 text-lg">Add new food items to your restaurant menu</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Mobile Layout (default) */}
            <div className="lg:hidden">
              <div className="p-6 space-y-6">
                {/* Food Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Food Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20 ${
                      errors.name 
                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                        : 'border-slate-200 hover:border-slate-300 focus:border-slate-500'
                    }`}
                    placeholder="e.g., Margherita Pizza"
                  />
                  {errors.name && (
                    <div className="flex items-center space-x-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{errors.name}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20 resize-none ${
                      errors.description 
                        ? 'border-red-300 bg-red-50 focus:border-red-500' 
                        : 'border-slate-200 hover:border-slate-300 focus:border-slate-500'
                    }`}
                    placeholder="Describe your food item, ingredients, and what makes it special..."
                  />
                  <div className="flex justify-between items-center">
                    {errors.description ? (
                      <div className="flex items-center space-x-2 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">{errors.description}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-500">
                        {formData.description.length}/500 characters
                      </span>
                    )}
                  </div>
                </div>

                {/* Category and Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20 ${
                        errors.category 
                          ? 'border-red-300 bg-red-50 focus:border-red-500' 
                          : 'border-slate-200 hover:border-slate-300 focus:border-slate-500'
                      }`}
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    {errors.category && (
                      <div className="flex items-center space-x-2 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">{errors.category}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Price (USD) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">$</span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        className={`w-full pl-8 pr-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20 ${
                          errors.price 
                            ? 'border-red-300 bg-red-50 focus:border-red-500' 
                            : 'border-slate-200 hover:border-slate-300 focus:border-slate-500'
                        }`}
                        placeholder="0.00"
                      />
                    </div>
                    {errors.price && (
                      <div className="flex items-center space-x-2 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">{errors.price}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Food Image <span className="text-red-500">*</span>
                  </label>
                  
                  {!imagePreview ? (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 hover:bg-slate-50 ${
                          errors.image 
                            ? 'border-red-300 bg-red-50 hover:bg-red-50' 
                            : 'border-slate-300 hover:border-slate-400'
                        }`}
                      >
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <ImageIcon className={`w-8 h-8 ${errors.image ? 'text-red-400' : 'text-slate-400'}`} />
                          <p className={`text-sm font-medium ${errors.image ? 'text-red-600' : 'text-slate-600'}`}>
                            Click to upload image
                          </p>
                          <p className="text-xs text-slate-500">PNG, JPG up to 5MB</p>
                        </div>
                      </label>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="w-full h-48 rounded-lg overflow-hidden border-2 border-slate-200">
                        <img
                          src={imagePreview}
                          alt="Food preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  
                  {errors.image && (
                    <div className="flex items-center space-x-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{errors.image}</span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 disabled:from-slate-400 disabled:to-slate-500 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding Food Item...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>Add Food Item</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 h-full">
                {/* Left Column - Form Fields */}
                <div className="p-8 space-y-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Food Details</h2>
                    <p className="text-slate-600">Fill in the information about your food item</p>
                  </div>

                  {/* Food Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Food Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20 ${
                        errors.name 
                          ? 'border-red-300 bg-red-50 focus:border-red-500' 
                          : 'border-slate-200 hover:border-slate-300 focus:border-slate-500'
                      }`}
                      placeholder="e.g., Margherita Pizza"
                    />
                    {errors.name && (
                      <div className="flex items-center space-x-2 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">{errors.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20 resize-none ${
                        errors.description 
                          ? 'border-red-300 bg-red-50 focus:border-red-500' 
                          : 'border-slate-200 hover:border-slate-300 focus:border-slate-500'
                      }`}
                      placeholder="Describe your food item, ingredients, and what makes it special..."
                    />
                    <div className="flex justify-between items-center">
                      {errors.description ? (
                        <div className="flex items-center space-x-2 text-red-600">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm">{errors.description}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-500">
                          {formData.description.length}/500 characters
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Category and Price */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20 ${
                          errors.category 
                            ? 'border-red-300 bg-red-50 focus:border-red-500' 
                            : 'border-slate-200 hover:border-slate-300 focus:border-slate-500'
                        }`}
                      >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      {errors.category && (
                        <div className="flex items-center space-x-2 text-red-600">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm">{errors.category}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Price (USD) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">$</span>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          min="0"
                          step="0.01"
                          className={`w-full pl-8 pr-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20 ${
                            errors.price 
                              ? 'border-red-300 bg-red-50 focus:border-red-500' 
                              : 'border-slate-200 hover:border-slate-300 focus:border-slate-500'
                          }`}
                          placeholder="0.00"
                        />
                      </div>
                      {errors.price && (
                        <div className="flex items-center space-x-2 text-red-600">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm">{errors.price}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 disabled:from-slate-400 disabled:to-slate-500 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Adding Food Item...</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5" />
                          <span>Add Food Item</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Right Column - Image Upload */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 flex flex-col">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Food Image</h2>
                    <p className="text-slate-600">Upload an appetizing photo of your dish</p>
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    {!imagePreview ? (
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className={`flex flex-col items-center justify-center w-full h-80 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/50 ${
                            errors.image 
                              ? 'border-red-300 bg-red-50 hover:bg-red-50' 
                              : 'border-slate-300 hover:border-slate-400 bg-white/30'
                          }`}
                        >
                          <div className="flex flex-col items-center justify-center space-y-4">
                            <ImageIcon className={`w-16 h-16 ${errors.image ? 'text-red-400' : 'text-slate-400'}`} />
                            <div className="text-center">
                              <p className={`text-lg font-medium ${errors.image ? 'text-red-600' : 'text-slate-600'}`}>
                                Click to upload image
                              </p>
                              <p className="text-sm text-slate-500 mt-2">PNG, JPG up to 5MB</p>
                            </div>
                          </div>
                        </label>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="w-full h-80 rounded-xl overflow-hidden border-2 border-slate-200 shadow-lg">
                          <img
                            src={imagePreview}
                            alt="Food preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 shadow-lg"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                    
                    {errors.image && (
                      <div className="flex items-center space-x-2 text-red-600 mt-4">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">{errors.image}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFood;