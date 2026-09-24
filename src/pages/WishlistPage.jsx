import { FiHeart } from "react-icons/fi";
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
    <main className="min-h-[calc(100vh-80px)] bg-gray-50">
      {/* ================= PAGE HEADER ================= */}
      <section className="border-b border-gray-200 bg-white">
        <div className="lg:mx-10 max-w-[1920px] mx-auto p-4 md:py-5 sm:px-6 lg:px-8">
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
      <section className="lg:mx-10 max-w-[1920px] p-4 md:py-8 mx-auto sm:px-6 lg:px-8">
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {wishlistItems.map((product) => (
              <WishlistProductCard
                key={product.id}
                product={product}
                onRemove={handleRemoveFromWishlist}
              />
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
