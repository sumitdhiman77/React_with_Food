import {
  FaBriefcase,
  FaMagnifyingGlass,
  FaCompass,
  FaUser,
  FaCartShopping,
} from "react-icons/fa6";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
import { useState } from "react";

const Header = () => {
  const userInfo = useSelector((store) => store.user.userInfo);
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <header className="sticky top-0 z-[1001] w-full bg-white shadow-md transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/">
            <img
              className="w-40 transition-transform hover:scale-105 active:scale-95"
              src={LOGO_URL}
              alt="Logo"
            />
          </Link>
        </div>

        {/* Navigation Items */}
        <nav>
          <ul className="flex items-center gap-6 font-roboto text-[15px] font-semibold text-gray-700">
            <li>
              <Link
                className="flex items-center gap-2 py-4 hover:text-orange-500 transition-colors"
                to="/"
              >
                <FaMagnifyingGlass className="text-gray-500" />
                Home
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 py-4 hover:text-orange-500 transition-colors"
                to="/about"
              >
                <FaBriefcase className="text-gray-500" />
                About
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 py-4 hover:text-orange-500 transition-colors"
                to="/contact"
              >
                <FaCompass className="text-gray-500" />
                Contact
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 py-4 hover:text-orange-500 transition-colors"
                to="/signin"
              >
                <FaUser className="text-gray-500" />
                Sign in
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 py-4 hover:text-orange-500 transition-colors"
                to="/grocery"
              >
                <FaBriefcase className="text-gray-500" />
                Grocery
              </Link>
            </li>

            {/* Cart Section */}
            <li className="relative group">
              <Link to="/cart" className="flex items-center py-4">
                <FaCartShopping className="text-2xl text-gray-700 group-hover:text-orange-500 transition-colors" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white shadow-sm">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </li>

            {/* User Button */}
            <li>
              <button
                className="ml-2 rounded-lg bg-orange-500 px-5 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-orange-600 active:scale-95"
                onClick={() => {
                  btnName === "Login"
                    ? setBtnName(userInfo || "User")
                    : setBtnName("Login");
                }}
              >
                {btnName}
              </button>
            </li>

            {/* Online Status Indicator */}
            <li className="flex items-center pl-2 text-xs border-l border-gray-200 ml-2 py-4">
              <span className="mr-1 hidden lg:block text-gray-400">
                Status:
              </span>
              {onlineStatus ? "✅" : "🔴"}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
