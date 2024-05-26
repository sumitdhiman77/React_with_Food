import ItemList from "./ItemList";
import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { GiThreeLeaves } from "react-icons/gi";
const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const clickItem = () => {
    const toggle = () => {
      document.querySelector(".itemList").classList.toggle("hidden");
    };
    showItems ? toggle() : setShowIndex();
  };

  const veg = data.itemCards.filter((element) => {
    return element.card.info.itemAttribute.vegClassifier == "VEG";
  });
  const [boolean, setBoolean] = useState(true);
  return (
    <div className="border-b selectedElem">
      <label className="relative flex justify-between items-center mx-3 p-2  font-medium text-xl">
        Only Veg
        <input
          type="checkbox"
          className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
          onClick={() => {
            {
              setBoolean(!boolean);
            }
            const notVeg = document.querySelectorAll(".NONVEG , .EGG");
            notVeg.forEach((node) => {
              node.classList.toggle("hidden");
            });
          }}
        />
        <span className="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6"></span>
      </label>
      <span
        className="flex justify-between bg-gray-100 p-2 rounded-lg"
        onClick={clickItem}
      >
        <span className="font-bold flex ml-2">
          {boolean
            ? `${data.title} (${data.itemCards.length})`
            : `${data.title} (${veg.length})`}
          {boolean ? "" : <GiThreeLeaves className="text-green-500 w-6 h-6" />}
        </span>
        <MdOutlineKeyboardArrowDown />
      </span>
      {showItems && <ItemList items={data.itemCards} />}
    </div>
  );
};
export default RestaurantCategory;
