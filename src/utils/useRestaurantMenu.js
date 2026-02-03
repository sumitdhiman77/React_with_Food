import { useState, useEffect } from "react";
import { MENU_URL } from "./constants";
const useRestaurantMenu = (resId, lat, lng, query) => {
  const [resInfo, setResInfo] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${MENU_URL}&page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resId}&catalog_qa=undefined&query=${query}&submitAction=ENTER`,
      );
      let resData = await res.json();
      if (!resData?.data?.cards) {
        resData = await fetch(`/mock-menus/${query}.json}`);
        console.log("resData is:", resData);
        // console.error("Invalid Swiggy response:", resData);
        // return;
      }
      console.log("in useRestaurantMenu resData is", resData);
      setResInfo(resData);
      console.log(resInfo);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (!lat || !lng) return;
    fetchData();
  }, [lat, lng]);
};

export default useRestaurantMenu;
