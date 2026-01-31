import useExploreRestaurants from "../utils/useExploreRestaurants";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";
const ExploreRestaurants = () => {
  const parameters = useParams();
  console.log(parameters);
  const { collectionId, tags, query } = useParams();
  const data = useExploreRestaurants(collectionId, tags, query);
  console.log("data is", data);
  if (!data) return <Shimmer />;

  const { header, restaurants } = data;

  return (
    <div className="px-5 grow">
      {header && (
        <div className="mx-7 pt-16 pb-4">
          <h1 className="text-[40px] font-semibold">{header.title}</h1>
          <p className="text-lg">{header.description}</p>
          <p className="opacity-60">{header.count}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-6 px-5">
        {restaurants.map((restaurant) => (
          <Link
            key={restaurant.id}
            to={`/restaurants/${restaurant.id}/${query}`}
            className="hover:scale-95 transition-transform duration-200" // Optional: adds a nice "press" effect
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExploreRestaurants;
