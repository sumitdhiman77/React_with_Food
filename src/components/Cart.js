import { useSelector } from "react-redux";
import { useEffect } from "react";
import ItemList from "./ItemList";
import { useDispatch } from "react-redux";
import { removeItem } from "../utils/cartSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  useEffect(() => {
    let itemList = document.querySelector(".itemList");
    Array.from(itemList.querySelectorAll(".add")).forEach((el) => el.remove());
    Array.from(itemList.querySelectorAll(".del")).forEach((el) => el.remove());
    let dishes = document
      .querySelector(".itemsBox")
      .querySelector(".itemList")
      .querySelectorAll(".dish");
    dishes = Array.from(dishes);
    dishes.map((dish, index) => {
      const button = document.createElement("button");
      const text = document.createTextNode("Delete");
      button.appendChild(text);
      button.classList.add("del");
      dish.appendChild(button);
      button.addEventListener("click", () => {
        dispatch(removeItem(index));
      });
    });
  });

  return (
    <div className="w-6/12 m-auto itemsBox">
      <ItemList items={cartItems}></ItemList>
    </div>
  );
};

export default Cart;
