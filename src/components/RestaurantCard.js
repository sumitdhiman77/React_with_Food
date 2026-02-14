import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const { name, avgRating, cuisines, areaName, cloudinaryImageId } = resData;

  return (
    <div className="m-4 w-[200px] h-[300px] transition-transform duration-200 hover:scale-95">
      <img
        className="w-full h-[150px] object-cover rounded-2xl shadow-md"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <div className="px-2 py-1">
        <h3 className="font-bold text-lg truncate tracking-tight text-gray-800">
          {name}
        </h3>
        <h4 className="font-bold text-md flex items-center gap-1 text-gray-700">
          ⭐ {avgRating}
        </h4>
        <h4 className="text-cyan-950 truncate font-medium tracking-tight">
          {cuisines.join(", ")}
        </h4>
        <h4 className="text-orange-900 font-medium">{areaName}</h4>
      </div>
    </div>
  );
};

export const withOffer = (RestaurantCard) => {
  return (props) => {
    const { header, subHeader } = props.resData?.aggregatedDiscountInfoV3 || {};

    return (
      <div className="relative transition-transform duration-200 hover:scale-95">
        {header && (
          <label
            className="absolute z-10 bottom-[108px] left-4 right-4 
            text-white font-black text-xl uppercase italic tracking-tighter
            drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] pointer-events-none"
          >
            {header} {subHeader}
          </label>
        )}
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
