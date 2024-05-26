import RestaurantCategory from "./RestaurantCategory";
import { FaBicycle } from "react-icons/fa6";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useState } from "react";
const RestaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(null);
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  if (resInfo === null) return <Shimmer />;
  const { name, cuisines, costForTwoMessage, id, areaName } =
    resInfo?.cards[2]?.card?.card?.info;
  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  return (
    <div className="w-[800] mx-auto mt-5 mb-0 ">
      <h2 className="font-bold border-b border-amber-500/100 mb-2">{name}</h2>
      <span className="font-medium text-slate-500 text-xs mb-3 ">
        <p>{cuisines.toString()}</p>
        <p>{areaName}</p>
        <p>Order above 149 for discounted delivery feed</p>
      </span>
      <span className="flex mb-2 ">
        <FaBicycle
          style={{ color: "red", fontSize: "20px", marginRight: "10px" }}
        />
        <p className=" text-slate-500">{costForTwoMessage}</p>
      </span>
      <div id="all" className=" my-5 mx-4 ">
        {categories.map((category, index) => (
          <RestaurantCategory
            key={category?.card?.card?.title}
            data={category?.card?.card}
            showItems={index === showIndex ? true : false}
            setShowIndex={() => setShowIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
export default RestaurantMenu;
