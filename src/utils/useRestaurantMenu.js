// src/utils/useRestaurantMenu.js
import { useState, useEffect } from "react";
import menu from "../data/207611.json"; // Import JSON directly

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    if (!resId) return;

    // Since JSON is imported, we can filter if needed
    if (menu.data && resId === "207611") {
      setResInfo(menu.data);
    }
  }, [resId]);

  return resInfo;
};

export default useRestaurantMenu;
