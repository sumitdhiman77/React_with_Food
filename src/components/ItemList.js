import { useDispatch } from "react-redux";
import { ITEM_IMG_URL } from "../utils/constants";
import { BiCheckboxSquare } from "react-icons/bi";
import { addItem } from "../utils/cartSlice";
const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div className="itemList ">
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className={
            "flex items-center py-6 dish " +
            item.card.info.itemAttribute.vegClassifier
          }
        >
          <div className="w-9/12 item-info">
            {item.card.info.itemAttribute.vegClassifier === "VEG" ? (
              <BiCheckboxSquare className="text-green-500 w-6 h-8" />
            ) : (
              <BiCheckboxSquare className="text-red-500 w-6 h-8" />
            )}
            <h3 className="font-bold text-gray-500 text-base">
              {item?.card?.info?.name}
            </h3>
            <span className="font-bold  text-gray-400 text-sm">
              ₹
              {item?.card?.info?.price
                ? item?.card?.info?.price / 100
                : item?.card?.info?.defaultPrice / 100}
            </span>
            <p className="text-gray-400 text-xs">
              {item?.card?.info?.description}
            </p>
          </div>
          <div className="ml-32 relative">
            {item?.card?.info?.imageId ? (
              <img
                src={ITEM_IMG_URL + item?.card?.info?.imageId}
                className=" h-28 w-32 object-cover rounded-lg shadow-md"
                alt="Food Image is Here"
              />
            ) : (
              ""
            )}
            <button
              className="bg-black text-white absolute top-[88px] px-[1px]"
              onClick={() => {
                handleAddItem(item);
                console.log(dish.lastChild);
              }}
            >
              Add+
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ItemList;
