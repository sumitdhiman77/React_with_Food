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
    // Optional chaining to prevent crashes if discount info is missing
    const { header, subHeader } = props.resData?.aggregatedDiscountInfoV3 || {};

    return (
      <div className="relative">
        {header && (
          <label className="absolute z-10 bottom-[145px] left-8 text-white font-extrabold text-lg bg-gradient-to-t from-black/80 to-transparent w-[180px] px-2 rounded-b-md">
            {header} {subHeader}
          </label>
        )}
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
