import { useState, useEffect } from "react";
import { MENU_URL } from "../utils/constants";

const useRestaurantMenu = (resId, lat, lang) => {
  const [resInfo, setResInfo] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      `${MENU_URL}&lat=${lat}&lng=${lng}&restaurantId=${id}`
    );
    console.log(data);
    const json = await data.json();
    console.log(json);
    setResInfo(json.data);
  };
  return resInfo;
};
export default useRestaurantMenu;
