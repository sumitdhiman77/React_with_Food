import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ITEM_IMG_URL } from "../utils/constants";
import RestaurantCard, { withOffer } from "./RestaurantCard";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useDispatch } from "react-redux";
import { showUserInfo } from "../utils/userSlice";
import Chat from "./chat";
const Body = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const [userInput, setUserInput] = useState("");
  const dispatch = useDispatch();
  const blur = () => {
    dispatch(showUserInfo(userInput));
  };
  const [bannerItems, setBannerItems] = useState([]);
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [title, setTitle] = useState("");
  const RestaurantWithOffer = withOffer(RestaurantCard);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=32.219042&lng=76.3234037&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    setTitle(json.data.cards[0].card.card.header.title);
    setBannerItems(
      json.data.cards[0].card.card.gridElements.infoWithStyle.info
    );
    // console.log(json.data.cards[0].card.card.gridElements.infoWithStyle.info);
    setListOfRestaurants(
      json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants ??
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
    );
    setFilteredRestaurants(
      json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants ??
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
    );
  };
  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return (
      <h1>Look Like You're offline!!Please Check your Internet Connection;</h1>
    );

  return listOfRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="bg-slate-50 bg-opacity-20 font-[Lato] relative">
        <div className="px-5 mt-14 mb-20 flex justify-between">
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
            <label className="font-semibold">Username:</label>
            <input
              id="userName"
              className="border border-black p-1 rounded-lg"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
              onBlur={() => blur()}
            ></input>
          </div>
          <div>
            <button
              className="font-medium text-2xl tracking-tighter"
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
        <div className="ml-[calc(10%+36px)] mr-[calc(10%+36px)] ">
          <h2 className="font-[Lato] font-extrabold text-2xl tracking-tight line leading-7">
            {title}
          </h2>
          <div className="p-5 mb-16 z-0 border-b-2 border-gray-100">
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={false}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={false}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px "
            >
              {bannerItems.map((bannerItem) => {
                const collectionId = bannerItem.action.link.match(/(\d+)/);
                {
                  /* console.log(collectionId); */
                }
                return (
                  <div key={bannerItem.id}>
                    <Link to={"/collections/" + collectionId[0]}>
                      <img
                        className="w-36 h-48 border-none rounded-full object-cover"
                        src={ITEM_IMG_URL + bannerItem.imageId}
                      />
                    </Link>
                  </div>
                );
              })}
            </Carousel>
          </div>
          <div className="h-[529px] flex flex-wrap content-between ">
            {filteredRestaurants?.map((restaurant) => (
              <Link
                className="relative z-0"
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
      </div>
      <Chat className="sticky top-0" />
    </>
  );
};
export default Body;
