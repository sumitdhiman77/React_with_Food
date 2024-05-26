import { CDN_URL } from "../utils/constants";
const RestaurantCard = (props) => {
  const { resData } = props;
  const { name, id, avgRating, cuisines, areaName, cloudinaryImageId } =
    resData?.info;
  return (
    <div className="w-44  h-60 my-14 mx-16">
      <img
        className="w-52  h-36 object-cover rounded-md shadow-md"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3>{name}</h3>
      <h2>{id}</h2>
      <h5>{areaName}</h5>
      <h3>{avgRating}</h3>
      <p>{cuisines.join(",")}</p>
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
