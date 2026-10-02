import { FiArrowRight, FiHeart, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";

import ConfirmationModal from "../components/ConfirmationModal";
import WishlistProductCard from "../components/WishlistProductCard";
import { useOther } from "../hooks/useOther";
import { useWishlist } from "../hooks/useWishlist";

function WishlistPage() {
  const { wishlistItems, toggleWishlist } = useWishlist();

  const { setItemToRemove } = useOther();

  const handleRemoveFromWishlist = (product) => {
    setItemToRemove({
      title: "Remove from wishlist?",
      message: "Are you sure you want to remove this item from your wishlist?",
      confirmText: "Remove",
      cancelText: "Cancel",
      onConfirm: () => {
        toggleWishlist(product);
      },
    });
  };

  return (
    <main className="bg-gray-50 min-h-[60vh]">
      {/* ================= PAGE HEADER ================= */}

      {/* ================= WISHLIST CONTENT ================= */}
      <section className="mx-auto w-full max-w-[1920px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 pt-0">
        {wishlistItems.length > 0 ? (
          <>
            {/* Section heading */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                  Your favorites
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Products you've saved for later.
                </p>
              </div>

              <Link
                to="/products"
                className="group hidden items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:text-gray-900 sm:flex"
              >
                Continue shopping
                <FiArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            {/* Wishlist grid */}
            <div className="grid grid-cols-2 gap-1 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {wishlistItems.map((product) => (
                <WishlistProductCard
                  key={product.id}
                  product={product}
                  onRemove={handleRemoveFromWishlist}
                />
              ))}
            </div>

            {/* Mobile continue shopping */}
            <Link
              to="/products"
              className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 sm:hidden"
            >
              Continue shopping
              <FiArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </>
        ) : (
          /* ================= EMPTY STATE ================= */
          <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-3xl bg-white px-6 py-12">
            {/* Decorative circles */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-50 blur-3xl" />

            <div className="relative mx-auto max-w-md text-center">
              {/* Icon */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-gray-100 text-gray-400 shadow-inner">
                <FiHeart size={30} strokeWidth={1.8} />
              </div>

              {/* Heading */}
              <h2 className="mt-7 text-2xl font-bold tracking-tight text-gray-900">
                Your wishlist is waiting
              </h2>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
                You haven't saved anything yet. Explore our collection and tap
                the heart on products you want to keep.
              </p>

              {/* CTA */}
              <Link
                to="/products"
                className="group mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gray-900/10 transition hover:-translate-y-0.5 hover:bg-gray-800"
              >
                <FiShoppingBag size={17} />
                Explore products
                <FiArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        )}
      </section>

      <ConfirmationModal />
    </main>
  );
}

export default WishlistPage;
