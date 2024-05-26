import { useState, useEffect } from "react";
import RestaurantCard, { withOffer } from "./RestaurantCard";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useDispatch } from "react-redux";
import { showUserInfo } from "../utils/userSlice";
import { RemoveUserInfo } from "../utils/userSlice";
const Body = () => {
  const dispatch = useDispatch();
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [userInput, setUserInput] = useState("");
  const RestaurantWithOffer = withOffer(RestaurantCard);
  const handleLogIn = () => {
    dispatch(showUserInfo(userInput));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=32.219042&lng=76.3234037&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);
    setListOfRestaurants(
      json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );

    setFilteredRestaurants(
      json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return (
      <h1>Look Like You're offline!!Please Check your Internet Connection;</h1>
    );

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div>
      <div className="flex justify-between pr-44 pl-28 my-3">
        <div>
          <input
            className="py-2 px-6 border border-gray-100 rounded-md "
            placeholder="Search Restaurant"
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></input>
          <button
            className="font-semibold  ml-1 italic"
            onClick={() => {
              const selectedRestaurants = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurants(selectedRestaurants);
            }}
          >
            Search
          </button>
        </div>
        <div>
          <label>Username:</label>
          <input
            id="userName"
            className="border border-black p-1 rounded-lg"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          ></input>
        </div>
        {handleLogIn()}
        <div>
          <button
            className="font-medium italic"
            onClick={() => {
              const topRestaurants = listOfRestaurants.filter(
                (res) => res.info.avgRating >= 4
              );
              setFilteredRestaurants(topRestaurants);
            }}
          >
            Top Rating Restaurant
          </button>
        </div>
      </div>
      <div className="flex flex-wrap mx-12">
        {filteredRestaurants.map((restaurant) => (
          <Link
            className="mb-5 overflow-hidden relative z-0"
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            {restaurant.info.aggregatedDiscountInfoV3 ? (
              <RestaurantWithOffer resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Body;
