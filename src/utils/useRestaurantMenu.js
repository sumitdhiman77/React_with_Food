import { useState, useEffect } from "react";
import { MENU_URL } from "../utils/constants";

const useRestaurantMenu = (resId, lat, lng) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    if (!resId || !lat || !lng) return;
    fetchMenu();
  }, [resId, lat, lng]);

  const fetchMenu = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=32.219042&lng=76.26450&restaurantId=917055"
        // `${MENU_URL}&lat=${lat}&lng=${lng}&restaurantId=${resId}`
      );

      if (!response.ok) {
        throw new Error("Menu fetch failed");
      }

      const json = await response.json();
      setResInfo(json?.data);
    } catch (err) {
      console.error("Swiggy menu error:", err);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
