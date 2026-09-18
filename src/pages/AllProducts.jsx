import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import LazyLoadCard from "../components/LazyLoadCard";
import AllProductsAside from "../components/ProductFilters";
import ProductGridCard from "../components/ProductGridCard";
import { getProducts } from "../utils/api";

function AllProducts() {
  const { categorySlug } = useParams();

  const [products, setProducts] = useState([]);

  const [manualFilterValue, setManualFilterValue] = useState("featured");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({
    min: "",
    max: "",
  });

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Failed to load products:", error));
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (categorySlug) {
      const slug = categorySlug.toLowerCase();

      result = result.filter((product) => {
        if (selectedCategories.length > 0) {
          if (selectedCategories.includes("All Products")) {
            return true;
          }

          const productCategory = product.category
            ?.toLowerCase()
            .replace(/\s+/g, "-");

          const matchesCategory = selectedCategories.some(
            (category) =>
              category.toLowerCase().replace(/\s+/g, "-") === productCategory,
          );

          if (!matchesCategory) {
            return false;
          }
        }

        if (slug === "men" || slug === "women") {
          return product.tags?.includes(slug);
        }

        if (slug === "new-arrivals") {
          return product.newArrival;
        }

        if (slug === "best-selling") {
          return product.bestSelling;
        }

        if (slug === "sale") {
          return product.discount > 0;
        }

        const productCategory = product.category
          ?.toLowerCase()
          .replace(/\s+/g, "-");

        return productCategory === slug;
      });
    } else if (selectedCategories.length > 0) {
      result = result.filter((product) => {
        const productCategory = product.category
          ?.toLowerCase()
          .replace(/\s+/g, "-");

        return selectedCategories.some(
          (category) =>
            category.toLowerCase().replace(/\s+/g, "-") === productCategory,
        );
      });
    }

    if (priceRange.min) {
      result = result.filter(
        (product) => product.price >= Number(priceRange.min),
      );
    }

    if (priceRange.max) {
      result = result.filter(
        (product) => product.price <= Number(priceRange.max),
      );
    }

    return result;
  }, [products, categorySlug, selectedCategories, priceRange]);

  const displayProducts = useMemo(() => {
    const sortedProducts = [...filteredProducts];

    if (manualFilterValue === "newest") {
      sortedProducts.reverse();
    }

    if (manualFilterValue === "price-low") {
      sortedProducts.sort((a, b) => a.price - b.price);
    }

    if (manualFilterValue === "price-high") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    return sortedProducts;
  }, [filteredProducts, manualFilterValue]);

  const pageTitle = categorySlug
    ? categorySlug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "All Products";

  const handleFilterChange = (e) => {
    setManualFilterValue(e.target.value);
  };

  return (
    <main className="bg-gray-50 grid w-full max-w-[1920px] absolute">
      {/* ================= PAGE HEADER ================= */}
      <section className="border-b border-gray-200 w-full">
        <div className="lg:mx-0 max-w-[1920px] w-full px-4 py-4 md:py-8 sm:px-6 lg:px-8">
          <div className="flex flex-row gap-4 items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                Collection
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                {pageTitle}
              </h1>

              <p className="mt-2 text-sm text-gray-500 hidden md:block">
                Discover our latest collection and find something you'll love.
              </p>
            </div>

            <p className="text-sm text-gray-500">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </p>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS AREA ================= */}
      <div className="lg:mx-0 max-w-[1920px] flex md:gap-6 py-2 md:py-0 px-1 md:pt-6 md:px-6 lg:px-8 sticky top-0">
        {/* ================= FILTERS ================= */}
        <aside className="hidden w-60 shrink-0 lg:block h-auto">
          <AllProductsAside
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            pageTitle={pageTitle}
            minPrice={priceRange.min}
            maxPrice={priceRange.max}
            setPriceRange={setPriceRange}
          />
        </aside>

        {/* ================= PRODUCTS ================= */}
        <section className="min-w-0 flex-1">
          {/* Mobile filter */}
          <div className="mb-2 md:mb-5 flex items-center justify-between lg:hidden">
            <button
              type="button"
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300"
            >
              Filters
            </button>

            <select
              value={manualFilterValue}
              onChange={(e) => handleFilterChange(e)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Desktop toolbar */}
          <div className="mb-5 hidden items-center justify-between lg:flex">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium text-gray-900">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>

            <select
              value={manualFilterValue}
              onChange={(e) => handleFilterChange(e)}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 outline-none transition focus:border-gray-400"
            >
              <option value="featured">Sort: Featured</option>
              <option value="newest">Sort: Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Product grid */}
          {displayProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-1 md:gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {displayProducts.map((product) => (
                <LazyLoadCard key={product.id} height={360}>
                  <ProductGridCard product={product} />
                </LazyLoadCard>
              ))}
            </div>
          ) : (
            <div className="flex min-h-100 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white">
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  No products found
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  We couldn't find any products in this collection.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default AllProducts;
