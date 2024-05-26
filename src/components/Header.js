import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaBriefcase } from "react-icons/fa6";
import { FaCompass } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const userName = useSelector((store) => store.user.userInfo);

  return (
    <div className="flex justify-between bg-pink-50 shadow-lg">
      <div className="flex items-center">
        <img className="w-[177px]" src={LOGO_URL}></img>
        {/* <p>Dharamshala,Himachal Pradesh,India</p> */}
      </div>
      <div className="nav-items">
        <ul className="list-none p-0 m-0 flex">
          <li>
            <Link className="my-8 mr-1  flex items-center" to="/">
              <FaMagnifyingGlass className="text-red-500 m-2" />
              Home
            </Link>
          </li>
          <li>
            {" "}
            <Link className="my-8 mr-2 flex items-center" to="/about">
              <FaBriefcase className="text-red-500 m-2" />
              About
            </Link>
          </li>
          <li>
            <Link className="my-8 mr-2 flex items-center" to="/contact">
              <FaCompass className="text-red-500 m-2" />
              Contact
            </Link>
          </li>
          <li>
            <Link className="my-8 mr-2 flex items-center" to="/signin">
              <FaUser className="text-red-500 m-2" />
              Sign in
            </Link>
          </li>
          <li>
            <Link className="my-8 mr-2  flex items-center" to="/grocery">
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
                  ? setBtnName(userName)
                  : setBtnName("Login");
              }}
            >
              {btnName}
            </button>
          </li>
          <span>
            Online Status: {onlineStatus ? "✅" : "🔴"}
            {/* <h6 className="mt-[18px] font-bold text-xs">
              default User default
            </h6> */}
          </span>
        </ul>
      </div>
    </div>
  );
};
export default Header;
