import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import LazyLoadCard from "../components/LazyLoadCard";
import ProductFilters from "../components/ProductFilters";
import ProductGridCard from "../components/ProductGridCard";
import { getProducts } from "../utils/api";

function AllProducts() {
  const { categorySlug } = useParams();

  const [products, setProducts] = useState([]);

  // Temporary filter selections
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({
    min: "",
    max: "",
  });
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedProductTypes, setSelectedProductTypes] = useState([]);

  // Applied filters
  const [appliedFilters, setAppliedFilters] = useState({
    selectedCategories: [],
    priceRange: {
      min: "",
      max: "",
    },
    selectedBrands: [],
    selectedRatings: [],
    selectedDiscounts: [],
    inStockOnly: false,
    selectedProductTypes: [],
  });

  const [manualFilterValue, setManualFilterValue] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    loadProducts();
  }, []);

  const pageTitle = categorySlug
    ? categorySlug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "All Products";

  const filteredProducts = useMemo(() => {
    let result = [...products];

    /*
      =========================
      ROUTE / COLLECTION FILTER
      =========================
    */

    if (categorySlug) {
      const slug = categorySlug.toLowerCase();

      result = result.filter((product) => {
        if (slug === "men" || slug === "women") {
          return product.tags?.includes(slug);
        }

        if (slug === "new-arrivals") {
          return Boolean(product.newArrival);
        }

        if (slug === "best-selling") {
          return Boolean(product.bestSelling);
        }

        if (slug === "sale") {
          return Number(product.discount) > 0;
        }

        const productCategory = product.category
          ?.toLowerCase()
          .replace(/\s+/g, "-");

        return productCategory === slug;
      });
    }

    /*
      =========================
      CATEGORY FILTER
      =========================
    */

    if (appliedFilters.selectedCategories.length > 0) {
      result = result.filter((product) => {
        const productCategory = product.category
          ?.toLowerCase()
          .replace(/\s+/g, "-");

        return appliedFilters.selectedCategories.some(
          (category) =>
            category.toLowerCase().replace(/\s+/g, "-") === productCategory,
        );
      });
    }

    /*
      =========================
      PRICE FILTER
      =========================
    */

    if (appliedFilters.priceRange.min !== "") {
      result = result.filter(
        (product) =>
          Number(product.price) >= Number(appliedFilters.priceRange.min),
      );
    }

    if (appliedFilters.priceRange.max !== "") {
      result = result.filter(
        (product) =>
          Number(product.price) <= Number(appliedFilters.priceRange.max),
      );
    }

    /*
      =========================
      BRAND FILTER
      =========================
    */

    if (appliedFilters.selectedBrands.length > 0) {
      result = result.filter((product) =>
        appliedFilters.selectedBrands.includes(product.brand),
      );
    }

    /*
      =========================
      RATING FILTER
      =========================
    */

    if (appliedFilters.selectedRatings.length > 0) {
      const minimumRating = Math.min(
        ...appliedFilters.selectedRatings.map(Number),
      );

      result = result.filter(
        (product) => Number(product.rating) >= minimumRating,
      );
    }

    /*
      =========================
      DISCOUNT FILTER
      =========================
    */

    if (appliedFilters.selectedDiscounts.length > 0) {
      const minimumDiscount = Math.min(
        ...appliedFilters.selectedDiscounts.map(Number),
      );

      result = result.filter(
        (product) => Number(product.discount) >= minimumDiscount,
      );
    }

    /*
      =========================
      AVAILABILITY FILTER
      =========================
    */

    if (appliedFilters.inStockOnly) {
      result = result.filter(
        (product) => product.stock === true || Number(product.stockCount) > 0,
      );
    }

    /*
      =========================
      PRODUCT TYPE FILTER
      =========================
    */

    if (appliedFilters.selectedProductTypes.length > 0) {
      result = result.filter((product) =>
        appliedFilters.selectedProductTypes.some((type) => {
          if (type === "Best Selling") {
            return Boolean(product.bestSelling);
          }

          if (type === "New Arrivals") {
            return Boolean(product.newArrival);
          }

          if (type === "Featured") {
            return Boolean(product.featured);
          }

          return false;
        }),
      );
    }

    return result;
  }, [products, categorySlug, appliedFilters]);

  /*
    =========================
    SORTING
    =========================
  */

  const displayProducts = useMemo(() => {
    const sortedProducts = [...filteredProducts];

    if (manualFilterValue === "newest") {
      sortedProducts.sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();

        const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();

        return dateB - dateA;
      });
    }

    if (manualFilterValue === "price-low") {
      sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (manualFilterValue === "price-high") {
      sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (manualFilterValue === "featured") {
      sortedProducts.sort((a, b) => {
        if (Boolean(a.featured) !== Boolean(b.featured)) {
          return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
        }

        if (Boolean(a.bestSelling) !== Boolean(b.bestSelling)) {
          return (
            Number(Boolean(b.bestSelling)) - Number(Boolean(a.bestSelling))
          );
        }

        return Number(b.rating || 0) - Number(a.rating || 0);
      });
    }

    return sortedProducts;
  }, [filteredProducts, manualFilterValue]);

  /*
    =========================
    FILTER ACTIONS
    =========================
  */

  const handleApplyFilters = () => {
    setAppliedFilters({
      selectedCategories: [...selectedCategories],
      priceRange: {
        ...priceRange,
      },
      selectedBrands: [...selectedBrands],
      selectedRatings: [...selectedRatings],
      selectedDiscounts: [...selectedDiscounts],
      inStockOnly,
      selectedProductTypes: [...selectedProductTypes],
    });
  };

  const handleClearAllFilters = () => {
    const emptyFilters = {
      selectedCategories: [],
      priceRange: {
        min: "",
        max: "",
      },
      selectedBrands: [],
      selectedRatings: [],
      selectedDiscounts: [],
      inStockOnly: false,
      selectedProductTypes: [],
    };

    setSelectedCategories([]);
    setPriceRange({
      min: "",
      max: "",
    });
    setSelectedBrands([]);
    setSelectedRatings([]);
    setSelectedDiscounts([]);
    setInStockOnly(false);
    setSelectedProductTypes([]);

    setAppliedFilters(emptyFilters);
  };

  const handleSortChange = (e) => {
    setManualFilterValue(e.target.value);
  };

  return (
    <main className="w-full max-w-[1920px] bg-gray-50">
      {/* ================= PAGE HEADER ================= */}

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-[1920px] px-4 py-0 sm:px-6 md:py-8 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="hidden md:block text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                Collection
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                {pageTitle}
              </h1>

              <p className="mt-2 hidden text-sm text-gray-500 md:block">
                Discover our latest collection and find something you'll love.
              </p>
            </div>

            <p className="text-sm text-gray-500">
              {displayProducts.length}{" "}
              {displayProducts.length === 1 ? "product" : "products"}
            </p>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS AREA ================= */}

      <div className="mx-auto flex w-full max-w-[1920px] gap-4 px-1 py-2 sm:px-4 md:px-6 md:py-6 lg:px-8">
        {/* ================= DESKTOP FILTER ================= */}

        <aside className="hidden w-60 shrink-0 lg:block">
          <ProductFilters
            products={products}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            pageTitle={pageTitle}
            minPrice={priceRange.min}
            maxPrice={priceRange.max}
            setPriceRange={setPriceRange}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            selectedRatings={selectedRatings}
            setSelectedRatings={setSelectedRatings}
            selectedDiscounts={selectedDiscounts}
            setSelectedDiscounts={setSelectedDiscounts}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            selectedProductTypes={selectedProductTypes}
            setSelectedProductTypes={setSelectedProductTypes}
            onApplyFilters={handleApplyFilters}
            onClearAll={handleClearAllFilters}
          />
        </aside>

        {/* ================= PRODUCTS ================= */}

        <section className="min-w-0 flex-1">
          {/* Mobile Toolbar */}

          <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300"
            >
              Filters
            </button>

            <select
              value={manualFilterValue}
              onChange={handleSortChange}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Desktop Toolbar */}

          <div className="mb-5 hidden items-center justify-between lg:flex">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium text-gray-900">
                {displayProducts.length}
              </span>{" "}
              products
            </p>

            <select
              value={manualFilterValue}
              onChange={handleSortChange}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 outline-none transition focus:border-gray-400"
            >
              <option value="featured">Sort: Featured</option>
              <option value="newest">Sort: Newest</option>
              <option value="price-low">Sort: Price: Low to High</option>
              <option value="price-high">Sort: Price: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}

          {displayProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-2 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
              {displayProducts.map((product) => (
                <LazyLoadCard key={product.id} height={360}>
                  <ProductGridCard product={product} />
                </LazyLoadCard>
              ))}
            </div>
          ) : (
            <div className="flex min-h-100 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6">
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  No products found
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  We couldn't find any products matching your filters.
                </p>

                <button
                  type="button"
                  onClick={handleClearAllFilters}
                  className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-gray-700"
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* ================= MOBILE FILTER DRAWER ================= */}

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-60 lg:hidden">
          {/* Backdrop */}

          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/40"
          />

          {/* Drawer */}

          <div className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-white shadow-2xl">
            {/* Drawer Header */}

            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
              <div>
                <h2 className="text-base font-bold text-gray-900">Filters</h2>

                <p className="mt-0.5 text-xs text-gray-400">
                  Refine your products
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                aria-label="Close filters"
              >
                ×
              </button>
            </div>

            {/* Drawer Filters */}

            <div className="min-h-0 flex-1">
              <ProductFilters
                products={products}
                mobile
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                pageTitle={pageTitle}
                minPrice={priceRange.min}
                maxPrice={priceRange.max}
                setPriceRange={setPriceRange}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                selectedRatings={selectedRatings}
                setSelectedRatings={setSelectedRatings}
                selectedDiscounts={selectedDiscounts}
                setSelectedDiscounts={setSelectedDiscounts}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                selectedProductTypes={selectedProductTypes}
                setSelectedProductTypes={setSelectedProductTypes}
                onApplyFilters={() => {
                  handleApplyFilters();
                  setMobileFiltersOpen(false);
                }}
                onClearAll={handleClearAllFilters}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default AllProducts;
