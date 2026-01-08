import { useState, useEffect, useContext } from "react";
import { ExploreRestaurants_URL } from "./constants";
import LocationContext from "./LocationContext";

const useExploreRestaurants = (collectionId) => {
  const [restaurants, setRestaurants] = useState([]);
  const { lat, lng } = useContext(LocationContext);

  useEffect(() => {
    if (!lat || !lng) return;
    fetchData();
  }, [lat, lng, collectionId]);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${ExploreRestaurants_URL}&lat=${lat}&lng=${lng}&collection=${collectionId}`
      );

      const json = await res.json();

      const restaurantCards =
        json?.data?.cards
          ?.filter(
            (c) =>
              c?.card?.card?.["@type"] ===
              "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
          )
          .map((c) => c.card.card) || [];

      setRestaurants(restaurantCards);
    } catch (err) {
      console.error("Explore restaurants error:", err);
      setRestaurants([]);
    }
  };

  return restaurants;
};

export default useExploreRestaurants;
