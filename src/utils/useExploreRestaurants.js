import { useState, useEffect, useContext } from "react";
import { ExploreRestaurants_URL } from "./constants";
import LocationContext from "./LocationContext";

const useExploreRestaurants = (collectionId) => {
  const [data, setData] = useState(null);
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
console.log(res);
      const json = await res.json();

      const cards = json?.data?.cards || [];

      // 🔹 HEADER (collection masthead)
      const headerCard = cards.find(
        (c) =>
          c?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.gandalf.widgets.v2.CollectionMasthead"
      )?.card?.card;
console.log("headerCard is",headerCard);
      // 🔹 RESTAURANTS
      const restaurants =
        cards.find(
          (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
console.log("restaurants is",restaurants);
      setData({
        header: headerCard,
        restaurants,
      });
    } catch (err) {
      console.error("ExploreRestaurants error:", err);
      setData({ header: null, restaurants: [] });
    }
  };

  return data;
};

export default useExploreRestaurants;
