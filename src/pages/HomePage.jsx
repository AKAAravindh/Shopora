import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import HeroSlides from "../components/HeroSlides";
import products from "../utils/products";

function HomePage() {
  const featuredProducts = products.filter((product) => product.featured);

  const bestSellingProducts = products.filter((product) => product.bestSelling);

  const newArrivalProducts = products.filter((product) => product.newArrival);

  return (
    <main className="bg-white">
      {/* ================= HERO ================= */}
      <HeroSlides />

      {/* ================= CATEGORIES ================= */}
      <section className="lg:mx-0 max-w-[1920px] px-4 py-10 pb-4 lg:py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Explore</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
              Shop by category
            </h2>
          </div>

          <Link
            to="/products"
            className="hidden text-sm font-medium text-gray-600 hover:text-gray-900 sm:block"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {/* Men */}
          <Link
            to="/products/men"
            className="group relative h-64 overflow-hidden rounded-2xl bg-gray-100"
          >
            <img
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=700&q=80"
              alt="Men"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/25 transition group-hover:bg-black/35" />

            <div className="absolute bottom-5 left-5 text-white">
              <h3 className="text-xl font-bold">Men</h3>
              <p className="mt-1 text-sm text-white/80">Explore collection</p>
            </div>
          </Link>

          {/* Women */}
          <Link
            to="/products/women"
            className="group relative h-64 overflow-hidden rounded-2xl bg-gray-100"
          >
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80"
              alt="Women"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/25 transition group-hover:bg-black/35" />

            <div className="absolute bottom-5 left-5 text-white">
              <h3 className="text-xl font-bold">Women</h3>
              <p className="mt-1 text-sm text-white/80">Explore collection</p>
            </div>
          </Link>

          {/* Shoes */}
          <Link
            to="/products/shoes"
            className="group relative h-64 overflow-hidden rounded-2xl bg-gray-100"
          >
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
              alt="Shoes"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/25 transition group-hover:bg-black/35" />

            <div className="absolute bottom-5 left-5 text-white">
              <h3 className="text-xl font-bold">Shoes</h3>
              <p className="mt-1 text-sm text-white/80">Explore collection</p>
            </div>
          </Link>

          {/* Accessories */}
          <Link
            to="/products/accessories"
            className="group relative h-64 overflow-hidden rounded-2xl bg-gray-100"
          >
            <img
              src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80"
              alt="Accessories"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/25 transition group-hover:bg-black/35" />

            <div className="absolute bottom-5 left-5 text-white">
              <h3 className="text-xl font-bold">Accessories</h3>
              <p className="mt-1 text-sm text-white/80">Explore collection</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      {featuredProducts.length > 0 && (
        <section className="lg:mx-0 max-w-[1920px] px-4 py-4 lg:py-8 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Handpicked for you
              </p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                Featured products
              </h2>
            </div>

            <Link
              to="/products/featured"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              View all →
            </Link>
          </div>

          <div className="flex lg:grid gap-4 overflow-scroll lg:grid-cols-4 pb-3 lg:pb-0 scrollbar-none">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ================= PROMOTIONAL BANNER ================= */}
      <section className="lg:mx-10 max-w-[1920px] px-4 py-4 lg:py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gray-900">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1800&q=80"
              alt="Season sale"
              className="h-full w-full object-cover opacity-50"
            />
          </div>

          <div className="relative px-8 py-20 text-center sm:px-16">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
              Limited time
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Up to 40% off
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm text-white/70 sm:text-base">
              Refresh your wardrobe with our latest collection. Selected styles
              are now available at special prices.
            </p>

            <Link
              to="/products/sale"
              className="mt-7 inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              Shop Sale
            </Link>
          </div>
        </div>
      </section>

      {/* ================= BEST SELLERS ================= */}
      {bestSellingProducts.length > 0 && (
        <section className="bg-white py-4 lg:py-8">
          <div className="lg:mx-0 max-w-[1920px] px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Customer favourites
                </p>

                <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                  Best sellers
                </h2>
              </div>

              <Link
                to="/products/best-selling"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                View all →
              </Link>
            </div>

            <div className="flex lg:grid gap-4 overflow-scroll lg:grid-cols-4 pb-3 lg:pb-0 scrollbar-none">
              {bestSellingProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= NEW ARRIVALS ================= */}
      {newArrivalProducts.length > 0 && (
        <section className="lg:mx-0 max-w-[1920px] px-4 py-4 lg:py-8 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Just dropped</p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                New arrivals
              </h2>
            </div>

            <Link
              to="/products/new-arrivals"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              View all →
            </Link>
          </div>

          <div className="flex lg:grid gap-4 overflow-scroll lg:grid-cols-4 pb-3 lg:pb-0 scrollbar-none">
            {newArrivalProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ================= BENEFITS ================= */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-gray-200 px-0 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8 justify-items-center lg:justify-items-normal">
          <div className="flex items-center gap-4 py-8 lg:px-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl">
              🚚
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Free shipping
              </h3>

              <p className="mt-1 text-xs text-gray-500">On orders above ₹999</p>
            </div>
          </div>

          <div className="flex items-center gap-4 py-8 lg:px-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl">
              ↩
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Easy returns
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                7-day hassle-free returns
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 py-8 lg:px-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl">
              ✓
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Secure payments
              </h3>

              <p className="mt-1 text-xs text-gray-500">100% secure checkout</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
