import { useMemo } from "react";
import { useParams } from "react-router-dom";

import ProductGridCard from "../components/ProductGridCard";
import AllProductsAside from "../components/ProductFilters";
import LazyLoadCard from "../components/LazyLoadCard";
import products from "../utils/products";

function AllProducts() {
  const { categorySlug } = useParams();

  const filteredProducts = useMemo(() => {
    if (!categorySlug) {
      return products;
    }

    const slug = categorySlug.toLowerCase();

    return products.filter((product) => {
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
  }, [categorySlug]);

  const pageTitle = categorySlug
    ? categorySlug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "All Products";

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gray-50 grid w-full justify-center">
      {/* ================= PAGE HEADER ================= */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-20 max-w-[1920px] px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                Collection
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                {pageTitle}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
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
      <div className="mx-10 max-w-[1920px] flex gap-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* ================= FILTERS ================= */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <AllProductsAside />
        </aside>

        {/* ================= PRODUCTS ================= */}
        <section className="min-w-0 flex-1">
          {/* Mobile filter */}
          <div className="mb-5 flex items-center justify-between lg:hidden">
            <button
              type="button"
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300"
            >
              Filters
            </button>

            <select
              defaultValue="featured"
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
              defaultValue="featured"
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 outline-none transition focus:border-gray-400"
            >
              <option value="featured">Sort: Featured</option>
              <option value="newest">Sort: Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Product grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
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
