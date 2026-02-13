import { BiCheckboxSquare } from "react-icons/bi";
import { EXPLORE_IMG_URL } from "../utils/constants";
import AddButton from "./AddButton";
import { useState } from "react";
const ItemList = ({ items, name, cloudinaryImageId, areaName, setItem }) => {
  const [, forceRender] = useState(undefined);
  const forceRenderCart = () => {
    forceRender((prev) => !prev);
  };
  return items.map((item, index) => (
    <div key={item.id}>
      <div className="h-36 w-[100%] flex justify-between">
        <div className="w-[80%] gap-y-0 pr-28 grid  bg-white font-[Roboto]">
          <div className="text-base font-normal tracking-tighter">
            <BiCheckboxSquare
              className={`text-2xl 
            ${item?.itemAttribute?.vegClassifier === "VEG" ? "text-green-600" : "text-red-600"}`}
            ></BiCheckboxSquare>
            {item.name}
            <div className="text-base font-normal tracking-tighter">
              {item.price ? "₹ " + item.price / 100 : "sorry, Not deliverable"}
            </div>
          </div>
          <div className="font-normal text-base text-gray-400">
            {item.description}
          </div>
        </div>
        <div className="relative h-[113px]">
          <img
            className="w-40 h-36 object-cover rounded-lg shadow-lg"
            alt="yummy food image"
            src={EXPLORE_IMG_URL + item.imageId}
          ></img>
          <div className="absolute bottom-[-9px] left-7">
            <AddButton
              item={item}
              index={index}
              name={name}
              areaName={areaName}
              cloudinaryImageId={cloudinaryImageId}
              setItem={setItem}
            />
          </div>
        </div>
      </div>
      <div className="border-b my-6"></div>
    </div>
  ));
};

export default ItemList;
