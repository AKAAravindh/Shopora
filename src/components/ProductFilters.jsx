import { useMemo, useState } from "react";

const ProductFilters = ({
  products,
  selectedCategories,
  setSelectedCategories,
  pageTitle,
  minPrice,
  maxPrice,
  setPriceRange,
  selectedBrands,
  setSelectedBrands,
  selectedRatings,
  setSelectedRatings,
  selectedDiscounts,
  setSelectedDiscounts,
  inStockOnly,
  setInStockOnly,
  selectedProductTypes,
  setSelectedProductTypes,
  mobile = false,
  onApplyFilters,
  onClearAll,
}) => {
  const [showAllBrands, setShowAllBrands] = useState(false);

  /*
    =========================
    CATEGORIES
    =========================
  */

  const productCategories = useMemo(() => {
    const categoryMap = new Map();

    products.forEach((product) => {
      if (!product.category) {
        return;
      }

      categoryMap.set(
        product.category,
        (categoryMap.get(product.category) || 0) + 1,
      );
    });

    return Array.from(categoryMap, ([name, count]) => ({
      name,
      count,
    })).sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  /*
    =========================
    BRANDS
    =========================
  */

  const productBrands = useMemo(() => {
    const brandMap = new Map();

    products.forEach((product) => {
      if (!product.brand) {
        return;
      }

      brandMap.set(product.brand, (brandMap.get(product.brand) || 0) + 1);
    });

    return Array.from(brandMap, ([name, count]) => ({
      name,
      count,
    })).sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  const visibleBrands = showAllBrands
    ? productBrands
    : productBrands.slice(0, 5);

  /*
    =========================
    RATING OPTIONS
    =========================
  */

  const ratingOptions = useMemo(() => {
    return [5, 4, 3, 2, 1]
      .map((rating) => ({
        value: String(rating),
        count: products.filter((product) => Number(product.rating) >= rating)
          .length,
      }))
      .filter((option) => option.count > 0);
  }, [products]);

  /*
    =========================
    DISCOUNT OPTIONS
    =========================
  */

  const discountOptions = useMemo(() => {
    return [50, 30, 20, 10]
      .map((discount) => ({
        value: String(discount),
        label: `${discount}% or more`,
        count: products.filter(
          (product) => Number(product.discount) >= discount,
        ).length,
      }))
      .filter((option) => option.count > 0);
  }, [products]);

  /*
    =========================
    AVAILABILITY
    =========================
  */

  const inStockCount = useMemo(() => {
    return products.filter(
      (product) => product.stock === true || Number(product.stockCount) > 0,
    ).length;
  }, [products]);

  /*
    =========================
    PRODUCT TYPE
    =========================
  */

  const productTypeOptions = useMemo(() => {
    const types = [
      {
        name: "Best Selling",
        key: "bestSelling",
      },
      {
        name: "New Arrivals",
        key: "newArrival",
      },
      {
        name: "Featured",
        key: "featured",
      },
    ];

    return types
      .map((type) => ({
        ...type,
        count: products.filter((product) => Boolean(product[type.key])).length,
      }))
      .filter((type) => type.count > 0);
  }, [products]);

  /*
    =========================
    PRICE LIMITS
    =========================
  */

  const priceLimits = useMemo(() => {
    const prices = products
      .map((product) => Number(product.price))
      .filter((price) => Number.isFinite(price));

    if (prices.length === 0) {
      return {
        min: 0,
        max: 0,
      };
    }

    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [products]);

  const currentMinPrice =
    minPrice === ""
      ? priceLimits.min
      : Math.max(priceLimits.min, Math.min(Number(minPrice), priceLimits.max));

  const currentMaxPrice =
    maxPrice === ""
      ? priceLimits.max
      : Math.min(priceLimits.max, Math.max(Number(maxPrice), priceLimits.min));

  const priceRangeDifference = priceLimits.max - priceLimits.min;

  const minPosition =
    priceRangeDifference > 0
      ? ((currentMinPrice - priceLimits.min) / priceRangeDifference) * 100
      : 0;

  const maxPosition =
    priceRangeDifference > 0
      ? ((currentMaxPrice - priceLimits.min) / priceRangeDifference) * 100
      : 100;

  return (
    <aside
      className={
        mobile
          ? "flex h-full w-full flex-col bg-white"
          : "sticky top-0 flex h-screen w-full shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
      }
    >
      {/* ================= HEADER ================= */}
      {!mobile && (
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Filters</h2>

            <p className="mt-0.5 text-[10px] text-gray-400">
              Refine your products
            </p>
          </div>

          <button
            type="button"
            onClick={onClearAll}
            className="cursor-pointer p-2 text-[10px] font-semibold text-gray-400 transition hover:text-red-500"
          >
            Clear all
          </button>
        </div>
      )}

      {/* ================= CONTENT ================= */}
      <div className="min-h-0 flex-1 overflow-auto px-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
        {/* Categories */}

        {pageTitle === "All Products" && (
          <section className="border-b border-gray-100 py-5">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-900">
              Categories
            </h3>

            <div className="space-y-2.5">
              {productCategories.map(({ name, count }) => (
                <label
                  key={name}
                  className="group flex cursor-pointer items-center justify-between text-xs text-gray-600"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(name)}
                      onChange={() => {
                        setSelectedCategories((prev) =>
                          prev.includes(name)
                            ? prev.filter((item) => item !== name)
                            : [...prev, name],
                        );
                      }}
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
        )}

        {/* Price */}

        <section className="border-b border-gray-100 py-5">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-900">
            Price
          </h3>

          <div className="flex items-center gap-2">
            {/* Minimum */}

            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">
                ₹
              </span>

              <input
                type="number"
                min={priceLimits.min}
                max={priceLimits.max}
                placeholder="Min"
                value={minPrice}
                onChange={(e) => {
                  const value = e.target.value;

                  if (value === "") {
                    setPriceRange((prev) => ({
                      ...prev,
                      min: "",
                    }));

                    return;
                  }

                  const numericValue = Number(value);

                  if (numericValue <= currentMaxPrice) {
                    setPriceRange((prev) => ({
                      ...prev,
                      min: value,
                    }));
                  }
                }}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-6 pr-2 text-xs text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white"
              />
            </div>

            <span className="text-xs text-gray-300">—</span>

            {/* Maximum */}

            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">
                ₹
              </span>

              <input
                type="number"
                min={priceLimits.min}
                max={priceLimits.max}
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => {
                  const value = e.target.value;

                  if (value === "") {
                    setPriceRange((prev) => ({
                      ...prev,
                      max: "",
                    }));

                    return;
                  }

                  const numericValue = Number(value);

                  if (numericValue >= currentMinPrice) {
                    setPriceRange((prev) => ({
                      ...prev,
                      max: value,
                    }));
                  }
                }}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-6 pr-2 text-xs text-gray-900 outline-none transition focus:border-gray-400 focus:bg-white"
              />
            </div>
          </div>

          {/* Dual range */}

          <div className="mt-5 px-1">
            <div className="relative h-6">
              <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gray-200" />

              <div
                className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-gray-900"
                style={{
                  left: `${minPosition}%`,
                  right: `${100 - maxPosition}%`,
                }}
              />

              <input
                type="range"
                min={priceLimits.min}
                max={priceLimits.max}
                value={currentMinPrice}
                disabled={priceLimits.min === priceLimits.max}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (value <= currentMaxPrice) {
                    setPriceRange((prev) => ({
                      ...prev,
                      min: value,
                    }));
                  }
                }}
                className="price-range-input absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 appearance-none bg-transparent"
                aria-label="Minimum price"
              />

              <input
                type="range"
                min={priceLimits.min}
                max={priceLimits.max}
                value={currentMaxPrice}
                disabled={priceLimits.min === priceLimits.max}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (value >= currentMinPrice) {
                    setPriceRange((prev) => ({
                      ...prev,
                      max: value,
                    }));
                  }
                }}
                className="price-range-input absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 appearance-none bg-transparent"
                aria-label="Maximum price"
              />
            </div>

            <div className="mt-3 flex justify-between text-[10px] text-gray-400">
              <span>₹{priceLimits.min.toLocaleString()}</span>

              <span>₹{priceLimits.max.toLocaleString()}</span>
            </div>
          </div>
        </section>

        {/* Brand */}

        <section className="border-b border-gray-100 py-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900">
              Brand
            </h3>

            <span className="text-[10px] text-gray-400">
              {productBrands.length}
            </span>
          </div>

          <div className="space-y-2.5">
            {visibleBrands.map(({ name, count }) => (
              <label
                key={name}
                className="group flex cursor-pointer items-center justify-between text-xs text-gray-600"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(name)}
                    onChange={() => {
                      setSelectedBrands((prev) =>
                        prev.includes(name)
                          ? prev.filter((item) => item !== name)
                          : [...prev, name],
                      );
                    }}
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

          {productBrands.length > 5 && (
            <button
              type="button"
              onClick={() => setShowAllBrands((prev) => !prev)}
              className="mt-3 cursor-pointer text-[10px] font-semibold text-gray-500 hover:text-gray-900"
            >
              {showAllBrands ? "Show less" : "+ Show more"}
            </button>
          )}
        </section>

        {/* Rating */}

        <section className="border-b border-gray-100 py-5">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-900">
            Rating
          </h3>

          <div className="space-y-2.5">
            {ratingOptions.map(({ value, count }) => (
              <label
                key={value}
                className="group flex cursor-pointer items-center justify-between text-xs text-gray-600"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(value)}
                    onChange={() => {
                      setSelectedRatings((prev) =>
                        prev.includes(value)
                          ? prev.filter((item) => item !== value)
                          : [...prev, value],
                      );
                    }}
                    className="h-3.5 w-3.5 cursor-pointer rounded border-gray-300 accent-gray-900"
                  />

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] tracking-tight text-yellow-500">
                      {"★".repeat(Number(value))}

                      <span className="text-gray-300">
                        {"★".repeat(5 - Number(value))}
                      </span>
                    </span>

                    <span className="text-[10px] text-gray-500">& above</span>
                  </div>
                </div>

                <span className="text-[10px] text-gray-400">{count}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Discount */}

        <section className="border-b border-gray-100 py-5">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-900">
            Discount
          </h3>

          <div className="space-y-2.5">
            {discountOptions.map(({ value, label, count }) => (
              <label
                key={value}
                className="group flex cursor-pointer items-center justify-between text-xs text-gray-600"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={selectedDiscounts.includes(value)}
                    onChange={() => {
                      setSelectedDiscounts((prev) =>
                        prev.includes(value)
                          ? prev.filter((item) => item !== value)
                          : [...prev, value],
                      );
                    }}
                    className="h-3.5 w-3.5 cursor-pointer rounded border-gray-300 accent-gray-900"
                  />

                  <span className="transition group-hover:text-gray-900">
                    {label}
                  </span>
                </div>

                <span className="text-[10px] text-gray-400">{count}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Availability */}

        <section className="border-b border-gray-100 py-5">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-900">
            Availability
          </h3>

          <label className="group flex cursor-pointer items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="h-3.5 w-3.5 cursor-pointer rounded border-gray-300 accent-gray-900"
              />

              <span className="transition group-hover:text-gray-900">
                In Stock
              </span>
            </div>

            <span className="text-[10px] text-gray-400">{inStockCount}</span>
          </label>
        </section>

        {/* Product Type */}

        <section className="py-5">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-900">
            Product Type
          </h3>

          <div className="space-y-2.5">
            {productTypeOptions.map(({ name, count }) => (
              <label
                key={name}
                className="group flex cursor-pointer items-center justify-between text-xs text-gray-600"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={selectedProductTypes.includes(name)}
                    onChange={() => {
                      setSelectedProductTypes((prev) =>
                        prev.includes(name)
                          ? prev.filter((item) => item !== name)
                          : [...prev, name],
                      );
                    }}
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
      </div>
      {/* ================= BOTTOM ACTION ================= */}
      <div className="shrink-0 border-t border-gray-200 bg-white p-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClearAll}
            className="flex-1 rounded-lg border border-gray-200 py-2.5 text-xs font-semibold text-gray-600 transition hover:border-gray-300 hover:text-gray-900"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={onApplyFilters}
            className="flex-[1.5] rounded-lg bg-gray-900 py-2.5 text-xs font-semibold text-white transition hover:bg-gray-700 active:scale-[0.98]"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ProductFilters;
