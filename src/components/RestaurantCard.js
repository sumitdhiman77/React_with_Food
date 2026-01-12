import { CDN_URL } from "../utils/constants";
const RestaurantCard = ({ resData }) => {
  console.log("in restaurant card resdata is:", resData);
  const { name, avgRating, cuisines, areaName, cloudinaryImageId } = resData;
  return (
    <div className="truncate grid w-44 h-60 ml-16 ">
      <img
        className="w-52 h-36 object-cover rounded-md shadow-md 
        transition ease-linear delay-50 hover:-translate-y-1 hover:scale-110 duration-70"
        src={CDN_URL + cloudinaryImageId}
      />
      <div>
        <div className="font-bold tracking-tighter-[-0.3px] text-black text-lg">
          {name}
        </div>
        <div className="font-bold tracking-tighter-[-0.3px text-black text-md">
          {avgRating}
        </div>
        {/* <div className="tracking-tighter text-base font-medium text-gray-500">
          {cuisines.join(",")}
        </div> */}
        <div className="font-medium tracking-tighter text-gray-500 text-base">
          {areaName}
        </div>
      </div>
    </div>
  );
};
export const withOffer = (RestaurantCard) => {
  return (props) => {
    const { header, subHeader } = props.resData.info.aggregatedDiscountInfoV3;
    return (
      <div>
        <label className="absolute z-50  bottom-[149px] left-[67px] text-white text-base font-bold">
          {header} {subHeader}
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
export default RestaurantCard;
