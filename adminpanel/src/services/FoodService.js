import axios from 'axios';

const API_URL = 'http://localhost:8080/api/foods';

export const getFoodItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createFoodItem = async (foodItem) => {
  const formData = new FormData();

  // Separate the image from the rest of the food data
  const { image, ...foodData } = foodItem;

  // Append the JSON stringified food data and image file
  formData.append('food', JSON.stringify(foodData));
  formData.append('file', image);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};


export const updateFoodItem = async (foodItem) => {
  const response = await axios.put(`${API_URL}/${foodItem.id}`, foodItem);
  return response.data;
};

export const deleteFoodItem = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};