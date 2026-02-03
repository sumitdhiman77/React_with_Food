import { useState, useEffect } from "react";
import { MENU_URL } from "./constants";
const useRestaurantMenu = (resId, lat, lng, query) => {
  const [resInfo, setResInfo] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(`/mock-menus/${query}.json`);
      // `${MENU_URL}&page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resId}&catalog_qa=undefined&query=${query}&submitAction=ENTER`,
      if (!res.ok) {
        console.log("file missing or wrong file name");
        return;
      }
      const resData = await res.json();
      setResInfo(resData);
      console.log("in useRestaurantMenu resInfo is", resInfo);
      return resInfo;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    // if (!lat || !lng) return;
    fetchData();
    console.log(resInfo);
  }, [query]);
};

export default useRestaurantMenu;
