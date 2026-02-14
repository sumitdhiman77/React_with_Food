const Shimmer = () => {
  // We create an array of 12 empty items to show a grid of skeleton cards
  const shimmerCards = Array(12).fill("");

  return (
    <div className="flex flex-wrap justify-center gap-6 p-8 animate-pulse">
      {shimmerCards.map((_, index) => (
        <div
          key={index}
          className="w-72 h-80 rounded-2xl bg-gray-200 flex flex-col gap-4 p-4 shadow-sm"
        >
          {/* Image Placeholder */}
          <div className="w-full h-44 bg-gray-300 rounded-xl"></div>

          {/* Title Placeholder */}
          <div className="w-3/4 h-6 bg-gray-300 rounded-md mt-2"></div>

          {/* Subtitle/Rating Placeholder */}
          <div className="w-1/2 h-4 bg-gray-300 rounded-md"></div>

          {/* Price/Time Placeholder */}
          <div className="flex justify-between mt-auto">
            <div className="w-1/4 h-4 bg-gray-300 rounded-md"></div>
            <div className="w-1/4 h-4 bg-gray-300 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
