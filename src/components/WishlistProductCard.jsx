import { FiArrowRight, FiHeart, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const WishlistProductCard = ({ product, onRemove }) => {
  const { addToCart } = useCart();

  const categorySlug = product.category?.toLowerCase().replace(/\s+/g, "-");

  const productSlug = product.name
    ?.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  const productImage = product.images?.[0] || product.image;

  const productUrl = `/products/${categorySlug}/${productSlug}/${product.id}`;

  const isInStock = product.stock && product.stockCount > 0;

  const handleAddToCart = () => {
    if (!isInStock) {
      return;
    }

    addToCart(product);
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl">
      {/* ================= IMAGE ================= */}
      <div className="relative aspect-[4/4.8] overflow-hidden bg-gray-100">
        <Link to={productUrl} className="block h-full w-full">
          <img
            src={productImage}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
          />
        </Link>

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        {/* ================= TOP BADGES ================= */}
        <div className="absolute left-3 top-3">
          {product.discount > 0 ? (
            <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold tracking-wide text-red-500 shadow-sm backdrop-blur">
              -{product.discount}%
            </span>
          ) : product.newArrival ? (
            <span className="rounded-full bg-gray-900/95 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-white shadow-sm backdrop-blur">
              NEW
            </span>
          ) : product.bestSelling ? (
            <span className="rounded-full bg-orange-500/95 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-white shadow-sm backdrop-blur">
              BEST SELLER
            </span>
          ) : null}
        </div>

        {/* ================= WISHLIST ================= */}
        <button
          type="button"
          onClick={() => onRemove(product)}
          aria-label={`Remove ${product.name} from wishlist`}
          className="absolute right-3 top-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-red-500 shadow-md transition duration-200 hover:bg-red-50 active:scale-90"
        >
          <FiHeart size={18} className="fill-current" />
        </button>

        {/* ================= VIEW PRODUCT ================= */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Link
            to={productUrl}
            className="flex items-center justify-center gap-2 rounded-xl bg-white/95 px-4 py-3 text-xs font-semibold text-gray-900 shadow-lg backdrop-blur transition hover:bg-white"
          >
            View product
            <FiArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* ================= DETAILS ================= */}
      <div className="p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
          {product.brand}
        </p>

        <Link to={productUrl} className="block">
          <h3 className="mt-1.5 truncate text-sm font-semibold text-gray-900 transition hover:text-gray-600">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-green-600 px-2 py-1 text-[10px] font-semibold text-white">
            {product.rating}
            <span>★</span>
          </span>

          <span className="text-[10px] text-gray-400">
            {product.reviews} reviews
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>

          {product.originalPrice > product.price && (
            <span className="text-xs text-gray-400 line-through">
              ${product.originalPrice}
            </span>
          )}

          {product.discount > 0 && (
            <span className="text-[10px] font-semibold text-red-500">
              Save {product.discount}%
            </span>
          )}
        </div>
      </div>

      {/* ================= ACTION AREA ================= */}
      <div className="border-t border-gray-100 px-4 py-3.5">
        <div className="flex items-center justify-between gap-3">
          {/* Stock */}
          <div className="min-w-0">
            {isInStock ? (
              <>
                <p className="flex items-center gap-1.5 text-[10px] font-semibold text-green-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  In stock
                </p>

                {product.stockCount <= 5 && (
                  <p className="mt-0.5 text-[9px] text-gray-400">
                    Only {product.stockCount} left
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="flex items-center gap-1.5 text-[10px] font-semibold text-red-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  Out of stock
                </p>

                <p className="mt-0.5 text-[9px] text-gray-400">
                  Currently unavailable
                </p>
              </>
            )}
          </div>

          {/* Add to cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!isInStock}
            className={`flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-[10px] font-semibold transition active:scale-95 ${
              isInStock
                ? "cursor-pointer bg-gray-900 text-white hover:bg-gray-700"
                : "cursor-not-allowed bg-gray-100 text-gray-400"
            }`}
          >
            <FiShoppingBag size={13} />
            {isInStock ? "Add to cart" : "Unavailable"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default WishlistProductCard;
