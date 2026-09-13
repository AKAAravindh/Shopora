const TopProductCard = () => {
  return (
    <div className="group relative h-36 w-72 shrink-0 overflow-hidden rounded-xl bg-gray-100">
      {/* Product Image */}
      <img
        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
        alt="Nike Air Max"
        className="absolute right-0 h-full w-1/2 object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Content */}
      <div className="relative z-10 flex h-full w-1/2 flex-col justify-center p-4">
        <span className="text-[10px] font-semibold uppercase text-red-500">
          Limited Offer
        </span>

        <h3 className="mt-1 text-sm font-bold text-gray-900">Nike Air Max</h3>

        <p className="mt-1 text-xs text-gray-500">Up to 30% off</p>

        <button className="mt-2 w-fit rounded-md bg-black px-3 py-1.5 text-[10px] font-semibold text-white">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default TopProductCard;
