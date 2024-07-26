import { useState, useEffect } from "react";
import { ExploreRestaurants_URL } from "./constants";
const useExploreRestaurants = (collectionId) => {
  const [restaurantsList, setRestaurantsList] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      ExploreRestaurants_URL + collectionId + "&sortBy=&filters=&type=rcv2"
    );

    const json = await data.json();
    setRestaurantsList(json.data);
  };
  return restaurantsList;
};
export default useExploreRestaurants;
