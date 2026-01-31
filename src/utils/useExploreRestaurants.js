import { useState, useEffect, useContext } from "react";
import { ExploreRestaurants_URL } from "./constants";
import LocationContext from "./LocationContext";

const useExploreRestaurants = (collectionId, tags) => {
  const [data, setData] = useState(null);
  const { lat, lng } = useContext(LocationContext);
  console.log("la & lang", lat, lng);
  useEffect(() => {
    if (!lat || !lng) return;
    fetchData();
  }, [lat, lng, collectionId]);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=32.2182266&lng=76.3172673&restaurantId=408501&catalog_qa=undefined&submitAction=ENTER`,
      );
      console.log(res);
      const json = await res.json();
      console.log("json is ", json);
      const cards = json?.data?.data?.cards || [];

      // 🔹 HEADER (collection masthead)
      const header =
        cards.find(
          (c) =>
            c?.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.gandalf.widgets.v2.CollectionMasthead",
        )?.card?.card || null;
      console.log("header is", header);
      // 🔹 RESTAURANTS
      const restaurants =
        cards
          .filter(
            (c) =>
              c?.card?.card?.["@type"] ===
              "type.googleapis.com/swiggy.presentation.food.v2.Restaurant",
          )
          .map((c) => c?.card?.card?.info) || [];

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
