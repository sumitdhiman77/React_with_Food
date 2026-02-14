export const RestaurantCard = ({ resData }) => {
  const { name, avgRating, cuisines, areaName, cloudinaryImageId } = resData;
  return (
    // Standardize widths and add relative for the HOC
    <div className="relative w-52 ml-16 flex flex-col gap-2">
      <img
        className="w-52 h-36 object-cover rounded-2xl shadow-lg transition-transform duration-200 hover:scale-105"
        src={CDN_URL + cloudinaryImageId}
        alt={name}
      />
      <div className="px-1">
        {/* Use truncate on the text itself */}
        <div className="font-bold text-lg text-gray-800 truncate tracking-tight">
          {name}
        </div>
        <div className="flex items-center gap-1 font-bold text-gray-700">
          <span>⭐ {avgRating}</span>
        </div>
        <div className="text-blue-500 text-sm truncate">{areaName}</div>
      </div>
    </div>
  );
};

export const withOffer = (RestaurantCard) => {
  return (props) => {
    const { header, subHeader } = props.resData?.aggregatedDiscountInfoV3 || {};
    return (
      <div className="relative">
        {" "}
        {/* Required for absolute children */}
        {header && (
          <label className="absolute z-10 top-28 left-4 text-white text-lg font-extrabold drop-shadow-md uppercase italic">
            {header} {subHeader}
          </label>
        )}
        <RestaurantCard {...props} />
      </div>
    );
  };
};
