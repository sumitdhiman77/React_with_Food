import useExploreRestaurants from "../utils/useExploreRestaurants";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";

const ExploreRestaurants = () => {
  const { collectionId } = useParams();
  const data = useExploreRestaurants(collectionId);

  if (!data) return <Shimmer />;

  const { header, restaurants } = data;

  return (
    <div className="px-5 grow">
      <div className="mx-7 pt-16 pb-4">
        <h1 className="text-[40px] font-semibold">
          {header?.card?.card?.title}
        </h1>
        <p className="text-lg">{header?.card?.card?.description}</p>
      </div>

      <div className="flex flex-wrap gap-6 px-5">
        {restaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={`/restaurants/${restaurant.info.id}`}
          >
            <RestaurantCard resData={restaurant.info} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExploreRestaurants;
