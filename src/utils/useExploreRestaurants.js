import { useState, useEffect, useContext } from "react";
import { ExploreRestaurants_URL } from "./constants";
import LocationContext from "./LocationContext";

const useExploreRestaurants = (collectionId) => {
  const [header, setHeader] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const { lat, lng } = useContext(LocationContext);

  useEffect(() => {
    if (!lat || !lng || !collectionId) return;
    fetchHeader();
  }, [lat, lng, collectionId]);

  const fetchHeader = async () => {
    const res = await fetch(
      `${ExploreRestaurants_URL}&lat=${lat}&lng=${lng}&collection=${collectionId}`
    );
    const json = await res.json();

    const masthead = json?.data?.cards?.find(
      c => c?.card?.card?.["@type"]?.includes("CollectionMasthead")
    )?.card?.card;

    setHeader(masthead);
    setRestaurants([]); // restaurants come later
  };

  return { header, restaurants };
};


export default useExploreRestaurants;
