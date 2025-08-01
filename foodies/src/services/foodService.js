import axios from "axios";

const API_URL = "http://localhost:8080/api/foods";

export const fetchFoodItems = async () => {
  try {
    const response = await axios.get(API_URL);
   
    return response.data;
  } catch (error) {
    console.error("Error fetching food items:", error);
    throw error;
  }
};

export const fetchFoodById = async (foodId) => {
  try {
    const response = await axios.get(`${API_URL}/${foodId}`);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching food item by ID:", error);
    throw error;
  }
};