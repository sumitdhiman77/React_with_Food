import useLocalStorage from "../utils/useLocalStorage";
import { addItem, removeItem, clearCart } from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { addRestaurantName } from "../utils/restaurantNameSlice";
const AddButton = ({
  item,
  name,
  cloudinaryImageId,
  areaName,
  cartPage,
  forceRenderCart,
  setItem,
}) => {
  const dispatch = useDispatch();
  const id = item.id;
  const [count, setCount] = useLocalStorage(id, null);
  const cartItems = useSelector((store) => store.cart.items);
  const restaurantData = useSelector(
    (store) => store.restaurant.restaurantName
  );
  const handleRestaurantData = () => {
    dispatch(addRestaurantName(name));
    dispatch(addRestaurantName(cloudinaryImageId));
    dispatch(addRestaurantName(areaName));
  };
  const handleRemove = (item) => {
    cartItems.includes(item) && dispatch(removeItem(cartItems.indexOf(item)));
    setCount(null);
    localStorage.removeItem(id);
    cartPage && forceRenderCart();
  };
  return (
    <>
      {count ? (
        <div
          className="border bg-white flex justify-around font-bold text-2xl countBox w-24 hover:bg-gray-200  rounded-md text-green-400
       absolute"
        >
          <button
            onClick={() => {
              setCount(count + 1);
              cartPage && forceRenderCart();
            }}
          >
            +
          </button>
          <span>{count}</span>
          <button
            onClick={() => {
              count === 1 ? handleRemove(item) : setCount(count - 1);
              cartItems.length === 0 && clearCart();
              cartPage && forceRenderCart();
            }}
          >
            -
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            cartItems.length === 0 || restaurantData[0] === name
              ? (restaurantData.length === 0 && handleRestaurantData(),
                !cartItems.includes(item) && dispatch(addItem(item)),
                setCount(count + 1))
              : setItem(item);
            //  document.getElementById("banner").classList.toggle("hidden");
          }}
          id={id}
          className="uppercase add border bg-white w-24 text-2xl hover:bg-gray-200 z-4 rounded-md text-green-400 absolute"
        >
          Add
        </button>
      )}
    </>
  );
};
export default AddButton;
