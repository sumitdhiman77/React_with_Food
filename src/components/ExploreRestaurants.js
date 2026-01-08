import useExploreRestaurants from "../utils/useExploreRestaurants";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";
const ExploreRestaurants = () => {
  const { collectionId } = useParams();
  const restaurantsList = useExploreRestaurants(collectionId);
  if (restaurantsList === null) return <Shimmer />;
  const [description, filter, ...collectionOfRestaurants] =
    restaurantsList.cards;
  return (
    <div className="px-5 overflow-x-hidden overflow-y-auto grow">
      <div className="mx-7 pt-16 pb-4">
        <div className="my-3 mx-4 font-semibold text-[40px] opacity-90">
          {description.card.card.title}
        </div>
        <div className="my-3 mx-4 text-lg opacity-90">
          {description.card.card.description}
        </div>
      </div>
      <div className=" mx-5 px-5 flex flex-row justify-start items-start flex-wrap">
        {collectionOfRestaurants.map((restaurant) => (
          <Link
            key={restaurant.card.card.info.id}
            to={`/restaurants/${restaurant.card.card.info.id}`}
          >
            <RestaurantCard resData={restaurant.card.card} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default ExploreRestaurants;
