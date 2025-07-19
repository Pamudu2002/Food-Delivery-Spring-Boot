import { createContext, useState, useEffect } from "react";
import { fetchFoodItems } from "../services/foodService";


export const StoreContext = createContext(null);
export const StoreProvider = (props) => {

  const [foodList, setFoodList] = useState([]);


  const contextValue = {
    foodList
  };

    useEffect(() => {
      async function loadData() {
        const data = await fetchFoodItems();
        setFoodList(data);
      }
        loadData();
    }, []);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
