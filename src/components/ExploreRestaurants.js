import useExploreRestaurants from "../utils/useExploreRestaurants";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";

const ExploreRestaurants = () => {
  const { collectionId } = useParams();
  const restaurants = useExploreRestaurants(collectionId);

  if (!restaurants || restaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="px-5 pt-20 flex flex-wrap gap-6">
      {restaurants.map((restaurant) => (
        <Link
          key={restaurant.info.id}
          to={`/restaurants/${restaurant.info.id}`}
        >
          <RestaurantCard resData={restaurant} />
        </Link>
      ))}
    </div>
  );
};

export default ExploreRestaurants;
