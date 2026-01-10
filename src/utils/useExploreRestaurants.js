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
        `${ExploreRestaurants_URL}&lat=${lat}&lng=${lng}&collection=${collectionId}&tags=layout_CCS_Pizza&sortBy=&filters=&type=rcv2&offset=0&page_type=null`
      );
      console.log(res);
      const json = await res.json();
      console.log("json is ", json);
      const cards = json?.data?.cards || [];

      // 🔹 HEADER (collection masthead)
      const header =
        cards.find((c) => c?.card?.card?.header?.title)?.card?.card?.header ||
        null;
      console.log("header is", header);
      // 🔹 RESTAURANTS
      const restaurants =
        cards.find(
          (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      console.log("restaurants is", restaurants);
      setData({
        header,
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
