import ItemList from "./ItemList";
const RestaurantCategory = ({
  data,
  name,
  cloudinaryImageId,
  areaName,
  setShowBanner,
  setItem,
}) => {
  const dataInfo = data.map((item) => item.card.info);
  return (
    <ItemList
      items={dataInfo}
      name={name}
      areaName={areaName}
      cloudinaryImageId={cloudinaryImageId}
      setShowBanner={setShowBanner}
      setItem={setItem}
    />
  );
};
export default RestaurantCategory;
