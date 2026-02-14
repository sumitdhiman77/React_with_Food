import { useState, useEffect, useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// Utils & Components
import { ITEM_IMG_URL, ExploreRestaurants_URL } from "../utils/constants";
import RestaurantCard, { withOffer } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import { showUserInfo } from "../utils/userSlice";
import LocationContext from "../utils/LocationContext";

const Body = () => {
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 6 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
  };

  const { lat, lng } = useContext(LocationContext);
  const [userInput, setUserInput] = useState("");
  const [bannerItems, setBannerItems] = useState([]);
  const [localListTitle, setLocalListTitle] = useState(
    "Top Restaurants Near You",
  );
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const RestaurantWithOffer = withOffer(RestaurantCard);
  const onlineStatus = useOnlineStatus();

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${ExploreRestaurants_URL}&lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
      );
      const json = await res.json();

      const cards = json?.data?.cards || json?.data?.data?.cards;
      if (!cards) return;

      // Extract Title
      const titleCard = cards.find((c) =>
        c?.card?.card?.header?.title?.includes("Top"),
      );
      setLocalListTitle(
        titleCard?.card?.card?.header?.title || "Top Restaurants Near You",
      );

      // Extract Banner Items
      const bannerCard = cards.find((c) =>
        c?.card?.card?.gridElements?.infoWithStyle?.["@type"]?.includes(
          "ImageInfoLayoutCard",
        ),
      );
      setBannerItems(
        bannerCard?.card?.card?.gridElements?.infoWithStyle?.info || [],
      );

      // Extract Restaurants
      const restaurantCard = cards.find((c) =>
        c?.card?.card?.gridElements?.infoWithStyle?.["@type"]?.includes(
          "FoodRestaurantGridListingInfo",
        ),
      );
      const restaurants =
        restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        [];

      setListOfRestaurants(restaurants);
      setFilteredRestaurants(restaurants);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    if (lat && lng) fetchData();
  }, [lat, lng]);

  if (!onlineStatus) {
    return (
      <div className="flex h-screen flex-col items-center justify-center font-roboto">
        <h1 className="text-2xl font-bold text-red-500">🔴 You are offline!</h1>
        <p className="text-gray-600">Please check your internet connection.</p>
      </div>
    );
  }

  return listOfRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="min-h-screen bg-white font-roboto animate-slideIn">
      {/* Search & Filter Section */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-b bg-white px-8 py-6 md:flex-row">
        <div className="flex w-full items-center gap-2 md:w-auto">
          <input
            className="flex-grow rounded-l-md border border-gray-300 px-4 py-2 focus:border-orange-400 focus:outline-none md:w-80"
            placeholder="Search for restaurants..."
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="rounded-r-md bg-orange-500 px-6 py-2 font-bold text-white transition-colors hover:bg-orange-600"
            onClick={() => {
              const filtered = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase()),
              );
              setFilteredRestaurants(filtered);
            }}
          >
            Search
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
            onClick={() => {
              const topRes = listOfRestaurants.filter(
                (res) => res.info.avgRating >= 4,
              );
              setFilteredRestaurants(topRes);
            }}
          >
            Ratings 4.0+
          </button>

          <input
            className="rounded-lg border border-gray-300 p-2 text-sm outline-none focus:ring-1 focus:ring-orange-400"
            placeholder="Set Username"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onBlur={() => dispatch(showUserInfo(userInput))}
          />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="mx-auto max-w-7xl px-8 pt-10">
        {/* Banner Carousel Section */}
        <section className="mb-12">
          <h2 className="mb-6 font-lato text-2xl font-extrabold tracking-tight text-gray-800">
            What's on your mind?
          </h2>
          <div className="border-b border-gray-100 pb-10">
            <Carousel responsive={responsive} infinite={true} itemClass="px-2">
              {bannerItems?.map((bannerItem) => {
                const url = new URL(bannerItem.action.link);
                const collectionId = url.searchParams.get("collection_id");
                const query = bannerItem.action.text
                  ?.replace(/s$/, "")
                  .toLowerCase();
                const tags = url.searchParams.get("tags");
                const type = url.searchParams.get("type");

                return (
                  <Link
                    key={bannerItem.id}
                    to={`/collections/${collectionId}/${query}/${tags}/${type}`}
                    className="block transition-transform hover:scale-105"
                  >
                    <img
                      className="aspect-[3/4] w-full rounded-2xl object-cover shadow-sm"
                      src={ITEM_IMG_URL + bannerItem.imageId}
                      alt={bannerItem.action.text}
                    />
                  </Link>
                );
              })}
            </Carousel>
          </div>
        </section>

        {/* Restaurant Grid Section */}
        <section className="pb-20">
          <h2 className="mb-8 font-lato text-2xl font-extrabold tracking-tight text-gray-800">
            {localListTitle}
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredRestaurants?.map((restaurant) => (
              <Link
                key={restaurant.info.id}
                to={"/restaurants/" + restaurant.info.id}
                className="transition-transform duration-200 hover:scale-95"
              >
                {restaurant.info.aggregatedDiscountInfoV3 ? (
                  <RestaurantWithOffer resData={restaurant.info} />
                ) : (
                  <RestaurantCard resData={restaurant.info} />
                )}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Body;
