import React, { useState, useEffect } from "react";
import {
  Trash2,
  Eye,
  Search,
  Filter,
  MoreVertical,
  Edit,
  ChefHat,
  Grid,
  List,
} from "lucide-react";
import { getFoodItems, deleteFoodItem } from "../services/FoodService";

const ListFood = () => {
  //   const [foodItems, setFoodItems] = useState([
  //     {
  //       id: 1,
  //       name: "Margherita Pizza",
  //       category: "Pizza",
  //       price: 12.99,
  //       status: "Available",
  //       description: "Classic Italian pizza with fresh tomatoes, mozzarella, and basil",
  //       image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop&crop=center"
  //     },
  //     {
  //       id: 2,
  //       name: "Chicken Biryani",
  //       category: "Biryani",
  //       price: 15.99,
  //       status: "Available",
  //       description: "Aromatic basmati rice with tender chicken and traditional spices",
  //       image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop&crop=center"
  //     },
  //     {
  //       id: 3,
  //       name: "Classic Burger",
  //       category: "Burger",
  //       price: 8.99,
  //       status: "Out of Stock",
  //       description: "Juicy beef patty with lettuce, tomato, and special sauce",
  //       image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center"
  //     },
  //     {
  //       id: 4,
  //       name: "Pasta Carbonara",
  //       category: "Pasta",
  //       price: 13.99,
  //       status: "Available",
  //       description: "Creamy pasta with pancetta, eggs, and parmesan cheese",
  //       image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop&crop=center"
  //     },
  //     {
  //       id: 5,
  //       name: "Vegetable Fried Rice",
  //       category: "Chinese",
  //       price: 9.99,
  //       status: "Available",
  //       description: "Wok-fried rice with fresh vegetables and soy sauce",
  //       image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop&crop=center"
  //     },
  //     {
  //       id: 6,
  //       name: "Chicken Tikka Masala",
  //       category: "Indian",
  //       price: 16.99,
  //       status: "Available",
  //       description: "Tender chicken in creamy tomato-based curry sauce",
  //       image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&crop=center"
  //     },
  //     {
  //       id: 7,
  //       name: "Fish Tacos",
  //       category: "Mexican",
  //       price: 11.99,
  //       status: "Out of Stock",
  //       description: "Grilled fish with fresh salsa and cabbage slaw",
  //       image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop&crop=center"
  //     },
  //     {
  //       id: 8,
  //       name: "Chocolate Cake",
  //       category: "Desserts",
  //       price: 6.99,
  //       status: "Available",
  //       description: "Rich chocolate cake with smooth chocolate ganache",
  //       image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&crop=center"
  //     }
  //   ]);

  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await getFoodItems();
        setFoodItems(response);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("table");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const categories = [
    "All",
    ...new Set(foodItems.map((item) => item.category)),
  ];

  const filteredItems = foodItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setFoodItems(foodItems.filter((item) => item.id !== itemToDelete));
    deleteFoodItem(itemToDelete)
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleView = (item) => {
    alert(
      `${item.name}\n\nCategory: ${item.category}\nPrice: $${item.price}\nStatus: ${item.status}\n\nDescription: ${item.description}`
    );
  };

  const getStatusColor = (status) => {
    return status === "Available"
      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  const getCategoryColor = (category) => {
    const colors = {
      Pizza: "bg-orange-100 text-orange-800 border-orange-200",
      Biryani: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Burger: "bg-red-100 text-red-800 border-red-200",
      Pasta: "bg-purple-100 text-purple-800 border-purple-200",
      Chinese: "bg-blue-100 text-blue-800 border-blue-200",
      Indian: "bg-indigo-100 text-indigo-800 border-indigo-200",
      Mexican: "bg-pink-100 text-pink-800 border-pink-200",
      Desserts: "bg-rose-100 text-rose-800 border-rose-200",
    };
    return colors[category] || "bg-slate-100 text-slate-800 border-slate-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-slate-700 to-slate-900 p-3 rounded-full shadow-lg">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
            Menu Management
          </h1>
          <p className="text-slate-600 text-lg">
            Manage your restaurant's food items and menu
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 mb-6 overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search food items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all duration-200 hover:border-slate-300"
                />
              </div>

              <div className="flex items-center gap-4">
                {/* Category Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-8 py-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 bg-white min-w-36 transition-all duration-200 hover:border-slate-300"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Toggle */}
                <div className="bg-slate-100 rounded-lg p-1 flex">
                  <button
                    onClick={() => setViewMode("table")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      viewMode === "table"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    <List className="w-4 h-4" />
                    <span>Table</span>
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      viewMode === "grid"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                    <span>Grid</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-slate-600">
            Showing {filteredItems.length} of {foodItems.length} items
          </p>
        </div>

        {/* Content */}
        {viewMode === "table" ? (
          /* Table View */
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider hidden md:table-cell">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                      Price
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-bold text-slate-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-slate-200 flex-shrink-0 shadow-sm">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-slate-900">
                              {item.name}
                            </div>
                            <div className="text-sm text-slate-600 mt-1 hidden sm:block max-w-xs truncate">
                              {item.description}
                            </div>
                            <div className="md:hidden mt-2">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(
                                  item.category
                                )}`}
                              >
                                {item.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span
                          className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getCategoryColor(
                            item.category
                          )}`}
                        >
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-lg font-bold text-slate-900">
                          ${item.price}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleView(item)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors duration-200"
                            title="Edit Item"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            title="Delete Item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-w-16 aspect-h-12 bg-slate-200 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-slate-900 flex-1">
                      {item.name}
                    </h3>
                    <button className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors duration-200">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getCategoryColor(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>
                    <div className="text-2xl font-bold text-slate-900">
                      ${item.price}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleView(item)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors duration-200"
                        title="Edit Item"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Delete Item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-12 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              No items found
            </h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              {searchTerm || selectedCategory !== "All"
                ? "Try adjusting your search or filter criteria to find what you're looking for."
                : "Add some delicious food items to get started with your menu!"}
            </p>
            {(searchTerm || selectedCategory !== "All") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-lg hover:from-slate-800 hover:to-slate-950 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Delete Food Item
                </h3>
                <p className="text-slate-600 mb-6">
                  Are you sure you want to delete this food item? This action
                  cannot be undone.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-2 border-2 border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListFood;
