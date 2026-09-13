const CategoryCard = () => {
  return (
    <div className="group w-36 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Category Image */}
      <div className="h-36 w-full overflow-hidden bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
          alt="Watches"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Category Name */}
      <div className="p-2.5 text-center">
        <h3 className="text-sm font-semibold text-gray-800">Watches</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
