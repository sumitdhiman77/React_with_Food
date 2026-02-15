import { useState, useEffect } from "react";
const useRestaurantMenu = (name, lat, lng, query) => {
  const [resInfo, setResInfo] = useState(null);
  console.log(resInfo);
  const fetchData = async () => {
    try {
      const res = await fetch(`/mock-menus/${query}.json`);

      if (!res.ok) {
        console.log("file missing or wrong file name");
        return;
      }
      const resData = await res.json();
      setResInfo(resData);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(resInfo);
  }, [query]);
  console.log("in useRestaurantMenu resInfo is", resInfo);
  return resInfo;
};

export default useRestaurantMenu;
