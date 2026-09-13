import { FiHeart, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { useOther } from "../hooks/useOther";
import { useWishlist } from "../hooks/useWishlist";
import ConfirmationModal from "../components/ConfirmationModal";

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
    <main className="min-h-[calc(100vh-80px)] bg-gray-50">
      {/* ================= PAGE HEADER ================= */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-10 max-w-[1920px] px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Saved for later
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                My Wishlist
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Your favorite products, all in one place.
              </p>
            </div>
            <p className="text-sm text-gray-500">
              {wishlistItems.length}
              {wishlistItems.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>
      </section>

      {/* ================= WISHLIST PRODUCTS ================= */}
      <section className="mx-10 max-w-[1920px] px-4 py-6 sm:px-6 lg:px-8">
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {wishlistItems.map((product) => (
              <div
                key={product.id}
                className="group min-w-50 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg select-none"
              >
                {/* ================= IMAGE ================= */}
                <div className="relative h-55 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  {/* Product Badge */}
                  {product.newArrival ? (
                    <span className="absolute left-2 top-2 rounded-md bg-gray-900 px-2 py-1 text-[10px] font-semibold text-white">
                      NEW
                    </span>
                  ) : product.bestSelling ? (
                    <span className="absolute left-2 top-2 rounded-md bg-orange-500 px-2 py-1 text-[10px] font-semibold text-white">
                      BEST SELLER
                    </span>
                  ) : (
                    <span className="absolute left-2 top-2 rounded-md bg-red-500 px-2 py-1 text-[10px] font-semibold text-white">
                      {product.discount}% OFF
                    </span>
                  )}

                  {/* Wishlist */}
                  <button
                    type="button"
                    onClick={() => handleRemoveFromWishlist(product)}
                    aria-label="Remove from wishlist"
                    className="absolute right-2 top-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-red-600 shadow-md transition hover:bg-gray-100 active:scale-95"
                  >
                    <FiHeart size={17} className="fill-current" />
                  </button>
                </div>

                {/* ================= DETAILS ================= */}
                <div className="p-3.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    {product.brand}
                  </p>
                  <h3 className="mt-1 truncate text-sm font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  {/* Rating */}
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="rounded bg-green-600 px-1.5 py-0.5 text-[10px] font-medium text-white">
                      {product.rating} ★
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {product.reviews} reviews
                    </span>
                  </div>
                  {/* Price */}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="text-[10px] font-semibold text-red-500">
                      {product.discount}% off
                    </span>
                  </div>
                </div>
                {/* ================= ACTIONS ================= */}
                <div className="px-3.5 pb-3.5">
                  <div className="flex items-center justify-between gap-3">
                    {product.stock ? (
                      <span className="text-[10px] font-medium text-green-600">
                        ✓ In Stock
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-red-600">
                        ✘ Out Of Stock
                      </span>
                    )}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={!product.stock}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[10px] font-semibold text-white transition active:scale-[0.98] ${product.stock ? "cursor-pointer bg-gray-900 hover:bg-gray-700" : "cursor-not-allowed bg-gray-300"}`}
                      >
                        <FiShoppingBag size={13} />
                        {product.stock ? "Add to Cart" : "Unavailable"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveFromWishlist(product)}
                        aria-label="Remove from wishlist"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-gray-300 hover:bg-gray-50 hover:text-red-500 active:scale-95"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ================= EMPTY STATE ================= */ <div className="flex min-h-125 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <FiHeart size={24} />
              </div>
              <h2 className="mt-5 text-lg font-semibold text-gray-900">
                Your wishlist is empty
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Save products you love and find them here later.
              </p>
            </div>
          </div>
        )}
      </section>

      <ConfirmationModal />
    </main>
  );
}
export default WishlistPage;
