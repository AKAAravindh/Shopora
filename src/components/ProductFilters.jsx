const ProductFilters = () => {
  return (
    <aside className="sticky top-5 w-[250px] shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div>
          <h2 className="text-sm font-bold text-gray-900">Filters</h2>
          <p className="mt-0.5 text-[10px] text-gray-400">
            Refine your products
          </p>
        </div>

        <button className="text-[10px] font-semibold text-gray-400 transition hover:text-gray-900">
          Clear all
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="max-h-[calc(100vh-130px)] overflow-y-auto px-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
        <div className="space-y-6 py-5">
          {/* Categories */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900">
                Categories
              </h3>

              <span className="text-[10px] text-gray-400">8</span>
            </div>

            <div className="space-y-2.5">
              {[
                ["All Products", "124"],
                ["Shoes", "32"],
                ["Clothing", "28"],
                ["Bags", "18"],
                ["Accessories", "16"],
                ["Electronics", "14"],
                ["Home", "10"],
                ["Sports", "6"],
              ].map(([name, count]) => (
                <label
                  key={name}
                  className="group flex cursor-pointer items-center justify-between text-xs text-gray-600"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 cursor-pointer rounded border-gray-300 accent-gray-900"
                    />

                    <span className="transition group-hover:text-gray-900">
                      {name}
                    </span>
                  </div>

                  <span className="text-[10px] text-gray-400">{count}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Price */}
          <section className="border-t border-gray-100 pt-5">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-900">
              Price
            </h3>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">
                  $
                </span>

                <input
                  type="number"
                  placeholder="Min"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-6 pr-2 text-xs text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white"
                />
              </div>

              <span className="text-xs text-gray-300">—</span>

              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">
                  $
                </span>

                <input
                  type="number"
                  placeholder="Max"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-6 pr-2 text-xs text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white"
                />
              </div>
            </div>

            {/* Fake price range */}
            <div className="mt-5 px-1">
              <div className="relative h-1 rounded-full bg-gray-200">
                <div className="absolute left-[15%] right-[20%] h-1 rounded-full bg-gray-900" />

                <span className="absolute left-[15%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gray-900 bg-white" />

                <span className="absolute right-[20%] top-1/2 h-3.5 w-3.5 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gray-900 bg-white" />
              </div>

              <div className="mt-3 flex justify-between text-[10px] text-gray-400">
                <span>$0</span>
                <span>$500+</span>
              </div>
            </div>
          </section>

          {/* Brand */}
          <section className="border-t border-gray-100 pt-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900">
                Brand
              </h3>

              <span className="text-[10px] text-gray-400">5</span>
            </div>

            <div className="space-y-2.5">
              {["Nike", "Adidas", "Puma", "Apple", "Samsung"].map((brand) => (
                <label
                  key={brand}
                  className="group flex cursor-pointer items-center gap-2.5 text-xs text-gray-600"
                >
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 cursor-pointer rounded border-gray-300 accent-gray-900"
                  />

                  <span className="transition group-hover:text-gray-900">
                    {brand}
                  </span>
                </label>
              ))}
            </div>

            <button className="mt-3 text-[10px] font-semibold text-gray-500 hover:text-gray-900">
              + Show more
            </button>
          </section>

          {/* Rating */}
          <section className="border-t border-gray-100 pt-5">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-900">
              Rating
            </h3>

            <div className="space-y-2.5">
              {[
                ["4", "Excellent"],
                ["3", "Good"],
                ["2", "Average"],
              ].map(([rating, label]) => (
                <label
                  key={rating}
                  className="group flex cursor-pointer items-center gap-2.5"
                >
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 cursor-pointer rounded border-gray-300 accent-gray-900"
                  />

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] tracking-tight text-yellow-500">
                      {"★".repeat(Number(rating))}
                      <span className="text-gray-300">
                        {"★".repeat(5 - Number(rating))}
                      </span>
                    </span>

                    <span className="text-[10px] text-gray-500">& above</span>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Discount */}
          <section className="border-t border-gray-100 pt-5">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-900">
              Discount
            </h3>

            <div className="space-y-2.5">
              {["10% or more", "20% or more", "30% or more", "50% or more"].map(
                (discount) => (
                  <label
                    key={discount}
                    className="group flex cursor-pointer items-center gap-2.5 text-xs text-gray-600"
                  >
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 cursor-pointer rounded border-gray-300 accent-gray-900"
                    />

                    <span className="transition group-hover:text-gray-900">
                      {discount}
                    </span>
                  </label>
                ),
              )}
            </div>
          </section>

          {/* Availability */}
          <section className="border-t border-gray-100 pt-5">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-900">
              Availability
            </h3>

            <label className="group flex cursor-pointer items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 cursor-pointer rounded border-gray-300 accent-gray-900"
                />

                <span className="transition group-hover:text-gray-900">
                  In Stock
                </span>
              </div>

              <span className="text-[10px] text-gray-400">98</span>
            </label>
          </section>

          {/* Product Type */}
          <section className="border-t border-gray-100 pt-5">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-900">
              Product Type
            </h3>

            <div className="space-y-2.5">
              {["Best Selling", "New Arrivals", "Featured"].map((type) => (
                <label
                  key={type}
                  className="group flex cursor-pointer items-center gap-2.5 text-xs text-gray-600"
                >
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 cursor-pointer rounded border-gray-300 accent-gray-900"
                  />

                  <span className="transition group-hover:text-gray-900">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="border-t border-gray-100 bg-white p-4">
        <button className="w-full rounded-lg bg-gray-900 py-2.5 text-xs font-semibold text-white transition hover:bg-gray-700 active:scale-[0.98]">
          Apply Filters
        </button>
      </div>
    </aside>
  );
};

export default ProductFilters;
