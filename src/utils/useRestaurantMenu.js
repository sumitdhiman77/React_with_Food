import { useState, useEffect } from "react";
import { MENU_URL } from "./constants";
const useRestaurantMenu = (resId, lat, lng, query) => {
  const [resInfo, setResInfo] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${MENU_URL}&lat=${lat}&lng=${lng}&restaurantId=${resId}&catalog_qa=undefined&query=${query}&submitAction=ENTER`
      );
      // "/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=32.08830&lng=76.26450&restaurantId=820385&catalog_qa=undefined&query=Pizza&submitAction=ENTER"
      const resData = await res.json();
      if (!resData?.data?.cards) {
        console.error("Invalid Swiggy response", json);
        return;
      }
      console.log("in useRestaurantMenu resData is", resData);
      setResInfo(resData);
    } catch (error) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    if (!lat || !lng) return;
    fetchData();
  }, [lat, lng]);
};

export default useRestaurantMenu;
