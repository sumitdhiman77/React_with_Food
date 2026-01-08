import useExploreRestaurants from "../utils/useExploreRestaurants";
import { useParams, Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import RestaurantCard from "./RestaurantCard";

const ExploreRestaurants = () => {
  const { collectionId } = useParams();
  const restaurantsList = useExploreRestaurants(collectionId);

  if (!restaurantsList || restaurantsList.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="px-5 overflow-x-hidden overflow-y-auto grow">
      <div className="mx-5 px-5 flex flex-row flex-wrap">
        {restaurantsList.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={`/restaurants/${restaurant.info.id}`}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExploreRestaurants;
