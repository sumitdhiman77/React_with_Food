import { useState, useEffect } from "react";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    if (!resId) return;
    fetchMenu();
  }, [resId]);

  const fetchMenu = async () => {
    try {
      const response = await fetch(`/data/${resId}.json`);

      if (!response.ok) {
        throw new Error("Menu fetch failed");
      }

      const json = await response.json();
      setResInfo(json.data);
    } catch (err) {
      console.error("Menu error:", err);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
