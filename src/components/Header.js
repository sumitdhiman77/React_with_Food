import {
  FaBriefcase,
  FaMagnifyingGlass,
  FaCompass,
  FaUser,
  FaCartShopping,
} from "react-icons/fa6";
import { LOGO_URL } from "../utils/constants";
import { Link, useLocation } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const Header = () => {
  let location = useLocation();
  useEffect(() => {
    location.pathname = "/"
      ? document.getElementById("header").classList.add("sticky")
      : document.getElementById("header").classList.add("fixed");
  }, []);
  const userInfo = useSelector((store) => store.user.userInfo);
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const cartItems = useSelector((store) => store.cart.items);
  return (
    <div
      id={"header"}
      className="font-[Roboto] bg-white z-[1001] top-0 flex justify-between shadow-lg"
    >
      <div className="flex grow items-center">
        <img className="w-[177px]" src={LOGO_URL}></img>
      </div>
      <div>
        <ul className="opacity-70 list-none p-0 m-0 flex">
          <li>
            <Link className="my-8 mr-5  flex items-center" to="/">
              <FaMagnifyingGlass className="text-red-500 m-2" />
              Home
            </Link>
          </li>
          <li>
            <Link className="my-8 mr-5 flex items-center" to="/about">
              <FaBriefcase className="text-red-500 m-2" />
              About
            </Link>
          </li>
          <li>
            <Link className="my-8 mr-5 flex items-center" to="/contact">
              <FaCompass className="text-red-500 m-2" />
              Contact
            </Link>
          </li>
          <li>
            <Link className="my-8 mr-5 flex items-center" to="/signin">
              <FaUser className="text-red-500 m-2" />
              Sign in
            </Link>
          </li>
          <li>
            <Link className="my-8 mr-5  flex items-center" to="/grocery">
              <FaBriefcase className="text-red-500 m-2" />
              Grocery
            </Link>
          </li>
          <li className="relative">
            <Link to="/cart">
              <FaCartShopping className="text-black-500 my-8 flex items-center mx-5 text-4xl " />
              <span className=" text-white absolute top-[31px] left-[36px]">
                {cartItems.length}
              </span>
            </Link>
          </li>

          <li className=" my-7 flex items-center">
            <button
              className="font-bold border rounded-md bg-gray-300 p-1"
              onClick={() => {
                btnName === "Login"
                  ? setBtnName(userInfo)
                  : setBtnName("Login");
              }}
            >
              {btnName}
            </button>
          </li>
          <span>Online Status: {onlineStatus ? "✅" : "🔴"}</span>
        </ul>
      </div>
    </div>
  );
};
export default Header;
