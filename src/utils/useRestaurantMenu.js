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
        `https://proxy.corsfix.com/?${MENU_URL}`
      );
// &lat=${lat}&lng=${lng}&restaurantId=${resId}
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
