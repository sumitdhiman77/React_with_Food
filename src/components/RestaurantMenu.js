import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import Shimmer from "./Shimmer";
import LocationContext from "../utils/LocationContext";
import { useContext } from "react";
import { useState } from "react";
import { FaBicycle } from "react-icons/fa6";
import { GiThreeLeaves } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { GrLocationPin } from "react-icons/gr";
import NotificationBanner from "./NotificationBanner";

const RestaurantMenu = () => {
  const { lat, lng } = useContext(LocationContext);
  const [item, setItem] = useState(null);
  const [veg, setVeg] = useState(false);
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId, lat, lng, query);
  console.log("resInfo is:", resInfo);
  if (!resInfo) return <Shimmer />;

  const {
    name,
    avgRatingString,
    cuisines,
    totalRatingsString,
    costForTwoMessage,
    areaName,
    feeDetails,
    sla,
    cloudinaryImageId,
  } = resInfo?.data?.cards[2]?.card?.card?.info;

  const categories =
    resInfo?.data?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.MenuVegFilterAndBadge",
    );

  return (
    <>
      {item && (
        <NotificationBanner
          item={item}
          name={name}
          cloudinaryImageId={cloudinaryImageId}
          areaName={areaName}
        />
      )}
      <div className="font-[Lato] w-[52rem] min-h-[800px] mt-5 mx-auto">
        <h1 className="border-b bg-white shadow-b sticky top-0 w-full py-4 text-2xl font-normal tracking-tighter">
          {name}
        </h1>
        <div className="-z-40 w-[701px] mx-auto mt-5 mb-0">
          <div className="bg-slate-100 px-4 pb-4 rounded-bl-3xl rounded-br-3xl">
            <div className="border p-6 rounded-xl bg-white shadow-lg">
              <div className="font-bold text-sm tracking-wide">
                <span className="font-bold text-3xl text-green-800">✪ </span>
                {avgRatingString} ({totalRatingsString})
                <span className="text-base font-bold text-gray-500">.</span>
                {costForTwoMessage}
              </div>
              <div className="text-orange-700 font-bold text-sm tracking-wide">
                {cuisines.toString()}
              </div>
              <div className="flex items-center font-normal text-sm leading-7 tracking-wide">
                <GrLocationPin />
                {areaName}
              </div>
              <div className="flex items-center font-normal text-sm leading-7 tracking-wide">
                {sla.minDeliveryTime} - {sla.maxDeliveryTime} mins
              </div>
              <div className="flex mb-2 items-center">
                <FaBicycle
                  style={{
                    color: "red",
                    fontSize: "20px",
                    marginRight: "10px",
                  }}
                />
                <div className="font-semibold text-sm tracking-wide text-slate-500">
                  {feeDetails.message}
                </div>
              </div>
            </div>
          </div>

          <label className="relative flex justify-between items-center mx-3 p-2 font-medium text-xl">
            <div className="flex items-center">
              <GiThreeLeaves className="text-green-600" />
              <span> Only Veg</span>
            </div>
            <input
              type="checkbox"
              className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
              onClick={() => setVeg(!veg)}
            />
            <span className="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6"></span>
          </label>

          {categories.map((category, index) => {
            const vegItems = category.card.card.itemCards.filter(
              (item) =>
                item?.card?.info?.itemAttribute?.vegClassifier === "VEG",
            );

            return (
              <div
                key={category?.card?.card?.title}
                className="grid gap-1 my-5 mx-4"
              >
                <div
                  className="flex justify-between text-2xl font-normal tracking-tighter"
                  onClick={() => {
                    document.getElementById(index).classList.toggle("hidden");
                    document
                      .getElementsByClassName(index)[0]
                      .classList.toggle("rotate-180");
                  }}
                >
                  <div>{category?.card?.card?.title}</div>
                  <span className={index}>
                    <IoIosArrowDown />
                  </span>
                </div>
                <div id={index}>
                  <RestaurantCategory
                    data={veg ? vegItems : category?.card?.card.itemCards}
                    name={name}
                    areaName={areaName}
                    cloudinaryImageId={cloudinaryImageId}
                    setItem={setItem}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RestaurantMenu;
