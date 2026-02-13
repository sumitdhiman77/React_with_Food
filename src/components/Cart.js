import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AddButton from "./AddButton";
import { clearCart } from "../utils/cartSlice";
import { clearRestaurantData } from "../utils/restaurantNameSlice";
import { useEffect, useState } from "react";
import { CDN_URL } from "../utils/constants";
const Cart = () => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(null);
  const [, forceRender] = useState(undefined);
  const cartPage = true;
  const priceArray = [];
  const cartItems = useSelector((store) => store.cart.items);
  const nameOfRestaurant = useSelector(
    (store) => store.restaurant.restaurantName,
  );
  useEffect(() => {
    setTotalPrice(
      priceArray
        .reduce((accumulator, currentValue) => {
          return (accumulator += currentValue);
        }, 0)
        .toFixed(2),
    );
  });
  const forceRenderCart = () => {
    forceRender((prev) => !prev);
  };
  useEffect(() => {
    forceRenderCart();
  }, [cartItems.length]);
  const handleClearCart = () => {
    localStorage.clear();
    dispatch(clearRestaurantData());
    dispatch(clearCart());
  };
  return (
    <div className="bg-gray-200 font-[Roboto]">
      <div className="w-[50%] my-14 mx-auto ">
        {cartItems.length !== 0 ? (
          <div className="p-8 bg-white grid gap-12">
            <div className="flex w-80 items-center">
              <div className="mr-2">
                <img
                  className="w-10  h-12 object-cover rounded-md shadow-lg hover:shadow-xl
 
        transition ease-linear delay-50 hover:-translate-y-1 hover:scale-110 duration-70"
                  src={CDN_URL + nameOfRestaurant[1]}
                />
              </div>
              <div>
                <h1>{nameOfRestaurant[0]}</h1>
                <div className="text-gray-300 tracking-tighter text-sm">
                  {nameOfRestaurant[2]}
                </div>
                <hr></hr>
              </div>
            </div>
            {cartItems.map((cartItem) => {
              const count = JSON.parse(localStorage.getItem(cartItem.id));
              {
                /* console.log(count); */
              }
              priceArray.push((cartItem.price / 100) * count);
              return (
                count && (
                  <div
                    id={cartItem.id}
                    key={cartItem.id}
                    className="flex items-center justify-between"
                  >
                    <div className="text-sm font-bold w-[55%]">
                      {cartItem.name}
                    </div>
                    <div className="w-[30%] self-start">
                      <AddButton
                        item={cartItem}
                        forceRenderCart={forceRenderCart}
                        cartPage={cartPage}
                      />
                    </div>
                    <div
                      id={"price" + cartItem.id}
                      className="font-bold text-amber-600 w-[15%]"
                    >
                      ₹ {parseFloat((cartItem.price / 100) * count).toFixed(2)}
                    </div>
                  </div>
                )
              );
            })}
            <div className="bg-gray-50 border-t-2 border-t-black border-b-2 py-3 border-gray-200">
              <div className="w-[93%] flex justify-between">
                <div className="font-semibold text-sky-600">To Pay :</div>
                <div className="font-semibold text-xl">₹ {totalPrice}</div>
              </div>
            </div>
            <button
              onClick={() => handleClearCart()}
              className="block hover:bg-blue-200 hover:text-red-700 rounded-md shadow-lg mx-auto text-red-400 font-bold text-2xl"
            >
              Clear Cart
            </button>
          </div>
        ) : (
          <h1 className="tracking-wider leading-7 font-extrabold text-3xl text-blue-600 p-32 m-auto">
            Your Cart is Empty please add some items
          </h1>
        )}
      </div>
    </div>
  );
};

export default Cart;
