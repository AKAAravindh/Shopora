import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";

const ProductCard = ({ product }) => {
  const {
    id,
    name,
    brand,
    price,
    originalPrice,
    discount,
    rating,
    reviews,
    image,
    bestSelling,
    newArrival,
    category,
  } = product;

  const { addToCart } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();

  const onWishlist = wishlistItems.some((item) => item.id === id);

  const productSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const categorySlug = category
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <article className="group w-full min-w-0">
      {/* ================= IMAGE ================= */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
        <Link
          to={`/products/${categorySlug}/${productSlug}/${id}`}
          className="block h-full w-full"
        >
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Top badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 cursor-pointer">
          {discount > 0 && (
            <span className="w-fit rounded-full bg-black px-2.5 py-1 text-[10px] font-semibold text-white">
              -{discount}%
            </span>
          )}

          {newArrival && (
            <span className="w-fit rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-gray-900 shadow-sm ">
              New
            </span>
          )}

          {bestSelling && !newArrival && (
            <span className="w-fit rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-gray-900 shadow-sm">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={onWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full shadow-sm backdrop-blur transition-all duration-300 ${
            onWishlist
              ? "bg-white text-red-500 hover:text-red-600"
              : "bg-white/90 text-gray-700 hover:bg-white hover:text-red-500"
          }`}
        >
          <FiHeart size={16} className={onWishlist ? "fill-current" : ""} />
        </button>

        {/* Add to cart */}
        <button
          type="button"
          onClick={() => addToCart(product)}
          aria-label="Add to cart"
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition-all duration-300 hover:bg-black hover:text-white cursor-pointer"
        >
          <FiShoppingBag size={17} />
        </button>
      </div>

      {/* ================= PRODUCT INFO ================= */}
      <div className="px-1 pt-3">
        {/* Brand */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
          {brand}
        </p>

        {/* Product name */}
        <Link
          to={`/products/${categorySlug}/${productSlug}/${id}`}
          className="mt-1 block"
        >
          <h2 className="truncate text-sm font-semibold text-gray-900 transition hover:text-gray-500">
            {name}
          </h2>
        </Link>

        {/* Price + rating */}
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="text-sm font-bold text-gray-900 sm:text-base">
              ₹{price.toLocaleString("en-IN")}
            </span>

            {originalPrice && (
              <span className="truncate text-xs text-gray-400 line-through">
                ₹{originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Rating */}
          {rating && (
            <div className="flex shrink-0 items-center gap-1 text-xs text-gray-500">
              <FiStar size={11} className="fill-current" />

              <span>{rating}</span>

              {reviews && (
                <span className="hidden text-gray-400 sm:inline">
                  ({reviews})
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
