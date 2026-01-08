import { useState, useEffect, useContext } from "react";
import { ExploreRestaurants_URL } from "./constants";
import LocationContext from "./LocationContext";

const useExploreRestaurants = (collectionId) => {
  const [restaurantsList, setRestaurantsList] = useState([]);
  const { lat, lng } = useContext(LocationContext);

  useEffect(() => {
    if (!lat || !lng) return;
    fetchData();
  }, [lat, lng, collectionId]);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${ExploreRestaurants_URL}&lat=${lat}&lng=${lng}${
          collectionId ? `&collection=${collectionId}` : ""
        }&sortBy=&filters=&type=rcv2`
      );

      const json = await res.json();

      const restaurants =
        json?.data?.cards?.find(
          (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      setRestaurantsList(restaurants);
    } catch (err) {
      console.error("Explore restaurants error:", err);
      setRestaurantsList([]);
    }
  };

  return restaurantsList;
};

export default useExploreRestaurants;
