import { useState, useEffect } from "react";
import menu from "../data/207611.json";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    if (!resId) return;

    // Directly set the imported JSON
    setResInfo(menu.data);
  }, [resId]);

  return resInfo;
};

export default useRestaurantMenu;
