// src/utils/useRestaurantMenu.js
import { useState, useEffect } from "react";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=32.08830&lng=76.26450&restaurantId=820385&catalog_qa=undefined&query=Pizza&submitAction=ENTER"
    );
    // Since JSON is imported, we can filter if needed
    if (menu.data && resId === "820385") {
      setResInfo(menu.data);
    }
  }, [resId]);

  return resInfo;
};

export default useRestaurantMenu;
