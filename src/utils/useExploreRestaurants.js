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
        `${ExploreRestaurants_URL}&lat=${lat}&lng=${lng}${
          collectionId ? `&collection=${collectionId}` : ""
        }&type=rcv2`
      );

      const json = await res.json();

      const cards = json?.data?.cards || [];

      const headerCard = cards[0];
      const restaurantCard = cards.find(
        (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );

      const restaurants =
        restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        [];

      setData({ header: headerCard, restaurants });
    } catch (err) {
      console.error(err);
      setData(null);
    }
  };

  return data;
};

export default useExploreRestaurants;
