import { addItem, clearCart } from "../utils/cartSlice";
import {
  clearRestaurantData,
  addRestaurantName,
} from "../utils/restaurantNameSlice";
import useLocalStorage from "../utils/useLocalStorage";
import { useDispatch } from "react-redux";
const NotificationBanner = ({ item, name, cloudinaryImageId, areaName }) => {
  // console.log(areaName);
  const dispatch = useDispatch();
  const [count, setCount] = useLocalStorage(item.id, null);
  const handleYesClick = (item) => {
    dispatch(clearCart());
    dispatch(clearRestaurantData());
    dispatch(addItem(item));
    dispatch(addRestaurantName(name));
    dispatch(addRestaurantName(cloudinaryImageId));
    dispatch(addRestaurantName(areaName));
    // console.log(count);
    setCount(count + 1);
    // console.log(count);
  };
  return (
    <div id="banner" className="">
      <div className="flex items-end justify-center fixed top-0 left-0 w-[100vw] h-[100vh] bg-transparent opacity-[1] z-[10001]">
        <div className="opacity-[1]">
          <div className="inline-block bg-white p-8 shadow-md max-w-max-[520px] min-w-[300px] mb-9">
            <div className="mb-6">
              <div className="font-bold">"Items already in cart"</div>
              <div>
                Your cart contains items from other restaurant. Would you like
                to reset your cart for adding items from this restaurant?
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() =>
                  document.getElementById("banner").classList.toggle("hidden")
                }
                className="bg-white uppercase text-green-400 hover:shadow-md"
              >
                no
              </button>
              <button
                onClick={() => {
                  document.getElementById("banner").classList.toggle("hidden"),
                    handleYesClick(item);
                }}
                className="bg-green-400 uppercase text-white hover:shadow-md"
              >
                yes,start afresh
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotificationBanner;
