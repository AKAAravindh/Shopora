import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";

const ProductGridCard = ({ product }) => {
  const {
    id,
    name,
    brand,
    price,
    originalPrice,
    discount,
    rating,
    reviews,
    stock,
    image,
    bestSelling,
    newArrival,
    category,
  } = product;

  const categorySlug = category?.toLowerCase();
  const nameSlug = name?.toLowerCase().split(" ").join("-");

  const { addToCart } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();

  const onWishlist = wishlistItems.some((item) => item.id === id);

  return (
    <div className="group min-w-50 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg select-none">
      {/* Clickable Product Area */}
      <Link to={`/products/${categorySlug}/${nameSlug}/${id}`}>
        {/* Image */}
        <div className="relative h-55 overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {/* Product Badge */}
          {newArrival ? (
            <span className="absolute left-2 top-2 rounded-md bg-gray-900 px-2 py-1 text-[10px] font-semibold text-white">
              NEW
            </span>
          ) : bestSelling ? (
            <span className="absolute left-2 top-2 rounded-md bg-orange-500 px-2 py-1 text-[10px] font-semibold text-white">
              BEST SELLER
            </span>
          ) : (
            <span className="absolute left-2 top-2 rounded-md bg-red-500 px-2 py-1 text-[10px] font-semibold text-white">
              {discount}% OFF
            </span>
          )}
        </div>
      </Link>

      {/* Wishlist Button */}
      <button
        type="button"
        onClick={() => toggleWishlist(product)}
        aria-label={onWishlist ? "Remove from wishlist" : "Add to wishlist"}
        className={`absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full shadow-sm backdrop-blur transition-all duration-300 ${
          onWishlist
            ? "bg-red-500 text-white"
            : "bg-white text-gray-700 hover:bg-red-500 hover:text-white"
        }`}
      >
        <FiHeart size={16} className={onWishlist ? "fill-current" : ""} />
      </button>

      {/* Details */}
      <Link to={`/products/${categorySlug}/${nameSlug}/${id}`}>
        <div className="p-3.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            {brand}
          </p>

          <h3 className="mt-1 truncate text-sm font-semibold text-gray-900">
            {name}
          </h3>

          <div className="mt-1.5 flex items-center gap-2">
            <span className="rounded bg-green-600 px-1.5 py-0.5 text-[10px] font-medium text-white">
              {rating} ★
            </span>

            <span className="text-[10px] text-gray-400">{reviews} reviews</span>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">${price}</span>

            <span className="text-xs text-gray-400 line-through">
              ${originalPrice}
            </span>

            <span className="text-[10px] font-semibold text-red-500">
              {discount}% off
            </span>
          </div>
        </div>
      </Link>

      {/* Non-clickable controls */}
      <div className="px-3.5 pb-3.5">
        <div className="flex items-center justify-between gap-3">
          {stock ? (
            <span className="text-[10px] font-medium text-green-600">
              ✓ In Stock
            </span>
          ) : (
            <span className="text-[10px] font-medium text-red-600">
              ✘ Out Of Stock
            </span>
          )}

          {/* Add to Cart */}
          <button
            type="button"
            disabled={!stock}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              addToCart({
                id,
                name,
                brand,
                price,
                originalPrice,
                discount,
                stock,
                image,
                category,
              });
            }}
            className={`cursor-pointer rounded-lg px-4 py-2 text-[10px] font-semibold text-white transition active:scale-[0.98] ${
              stock
                ? "bg-gray-900 hover:bg-gray-700"
                : "cursor-not-allowed bg-gray-300"
            }`}
          >
            {stock ? "Add to Cart" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGridCard;
