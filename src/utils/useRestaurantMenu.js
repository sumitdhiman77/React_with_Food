import { useState, useEffect } from "react";
import { MENU_URL } from "../utils/constants";

const useRestaurantMenu = (resId, lat, lng) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    if (!resId || !lat || !lng) return;
    fetchData();
  }, [resId, lat, lng]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${MENU_URL}&lat=${lat}&lng=${lng}&restaurantId=${resId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch menu");
      }

      const json = await response.json();
      setResInfo(json?.data);
    } catch (error) {
      console.error("Menu fetch error:", error);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
