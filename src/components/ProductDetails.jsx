import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import products from "../utils/products";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useWishlist } from "../hooks/useWishlist";
import { FiHeart } from "react-icons/fi";
import { useCart } from "../hooks/useCart";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("9");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();

  const selectedProduct = products?.find((item) => item.id?.toString() === id);

  const {
    name,
    brand,
    category,
    subcategory,
    price,
    originalPrice,
    discount,
    rating,
    reviews,
    stock,
    stockCount,
    featured,
    bestSelling,
    newArrival,
    sizes,
    colors,
    tags,
    images,
    description,
  } = selectedProduct;

  // const stockCount = 1;

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = allReviews.filter(
      (review) => review.rating === rating,
    ).length;

    const percentage =
      allReviews.length > 0 ? Math.round((count / allReviews.length) * 100) : 0;

    return {
      rating,
      percentage,
    };
  });

  const relatedProducts = products.filter(
    (item) => item.category === category && item.id !== selectedProduct.id,
  );

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < stockCount) {
      setQuantity(quantity + 1);
    }
  };

  const { addToCart } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();

  const onWishlist = wishlistItems.some(
    (item) => item.id?.toString() === id?.toString(),
  );

  // Color classes for the color swatches - TEMP
  const colorClasses = {
    Black: "bg-black",
    White: "bg-white",
    Red: "bg-red-500",
    Grey: "bg-gray-500",
    Blue: "bg-blue-500",
    Green: "bg-green-500",
    Brown: "bg-amber-800",
    Beige: "bg-stone-300",
    "Dark Blue": "bg-blue-800",
    Cream: "bg-yellow-50",
    Olive: "bg-lime-700",
    Navy: "bg-slate-800",
    Khaki: "bg-yellow-700",
    Pink: "bg-pink-400",
    Natural: "bg-stone-200",
    Silver: "bg-gray-300",
    Gold: "bg-yellow-500",
    Midnight: "bg-slate-950",
    Oak: "bg-amber-700",
    Walnut: "bg-amber-950",
    Purple: "bg-purple-500",
    Clear: "bg-transparent",
    Nude: "bg-orange-100",
    Neutral: "bg-neutral-400",
    Mixed: "bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400",
  };

  return (
    <div className="min-h-screen bg-gray-50 mx-auto max-w-[1920px]">
      {/* Breadcrumb */}
      <div className="mx-auto lg:mx-0 max-w-[1920px] px-4 lg:px-8 pt-6">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link to="/" className="cursor-pointer hover:text-gray-900">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="cursor-pointer hover:text-gray-900">
            Products
          </Link>
          <span>/</span>
          <Link
            to={`/products/${category}`}
            className="cursor-pointer hover:text-gray-900"
          >
            {category}
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-700">{name}</span>
        </div>
      </div>

      {/* Main Product */}
      <main className="mx-auto lg:mx-0 max-w-[1920px] lg:px-8 px-4 py-8">
        <div className="grid grid-cols-1 lg:gap-4 xl:gap-6 lg:grid-cols-[500px_1fr] xl:grid-cols-[700px_1fr]">
          {/* ================= IMAGE SECTION ================= */}
          <div className="flex flex-col-reverse xl:flex-row gap-2">
            {/* Thumbnails */}
            <div className="flex xl:flex-col flex-row gap-2 min-w-max overflow-x-auto scrollbar-hide p-1 mb-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`h-19 w-19 overflow-hidden rounded-lg border ring-2 border-transparent bg-white transition-all duration-300 shrink-0
                     ${
                       selectedImage === index
                         ? "ring-blue-600 ring-offset-0"
                         : "hover:ring-white ring-2 hover:cursor-pointer ring-transparent"
                     }`}
                >
                  <img
                    src={image}
                    alt={`${name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl bg-white">
              <img
                src={images[selectedImage]}
                alt={name}
                className="object-cover transition duration-500 hover:scale-105"
              />

              {/* Discount Badge */}
              <div className="absolute left-5 top-5 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-bold text-white">
                {discount}% OFF
              </div>

              {/* Product Badges */}
              <div className="absolute right-5 top-5 flex flex-col gap-2">
                {bestSelling && (
                  <span className="rounded-lg bg-gray-900 px-3 py-1.5 text-[10px] font-semibold text-white">
                    BEST SELLER
                  </span>
                )}

                {featured && (
                  <span className="rounded-lg bg-white px-3 py-1.5 text-[10px] font-semibold text-gray-900 shadow-sm">
                    FEATURED
                  </span>
                )}

                {newArrival && (
                  <span className="rounded-lg bg-blue-600 px-3 py-1.5 text-[10px] font-semibold text-white">
                    NEW
                  </span>
                )}
              </div>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(selectedProduct)}
                className={`absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition cursor-pointer ${
                  onWishlist
                    ? "bg-white text-red-500 hover:text-red-600"
                    : "bg-white text-gray-700 hover:bg-white hover:text-red-500"
                }`}
              >
                <FiHeart
                  size={16}
                  stroke="currentColor"
                  fill={onWishlist ? "currentColor" : "none"}
                />
              </button>
            </div>
          </div>

          {/* ================= PRODUCT DETAILS ================= */}
          <div className="flex flex-col">
            {/* Brand */}
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
              {brand}
            </p>

            {/* Product Name */}
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
              {name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-md bg-green-600 px-2 py-1 text-xs font-semibold text-white">
                {rating}
                <span>★</span>
              </div>

              <span className="text-sm text-gray-500">{reviews} reviews</span>

              <span className="h-1 w-1 rounded-full bg-gray-300" />

              <span
                className={`text-sm ${stockCount <= 10 ? "text-yellow-500" : stockCount <= 5 ? "text-red-500" : "text-green-500"}`}
              >
                {stockCount > 0 && stockCount}
                {stockCount > 0 ? (
                  " stocks available"
                ) : (
                  <span className="text-red-500">Out Of Stock</span>
                )}
              </span>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-100" />

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-900">${price}</span>

              <span className="text-lg text-gray-400 line-through">
                ${originalPrice}
              </span>

              <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-500">
                {discount}% OFF
              </span>
            </div>

            <p className="mt-2 text-xs text-gray-400">Inclusive of all taxes</p>

            {/* Stock */}
            <div className="mt-6 rounded-lg border border-green-100 bg-green-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  {stock && stockCount > 0 ? (
                    <p className="text-sm font-semibold text-green-700">
                      ✓ In Stock
                    </p>
                  ) : (
                    <p className="text-sm font-semibold text-red-700">
                      ✘ Out Of Stock
                    </p>
                  )}

                  {stockCount > 10 ? (
                    <p className="mt-1 text-xs text-green-600">
                      {stockCount} items available
                    </p>
                  ) : stockCount > 5 ? (
                    <p className="mt-1 text-xs text-yellow-600">
                      Only {stockCount} item available
                    </p>
                  ) : stockCount > 0 ? (
                    <p className="mt-1 text-xs text-red-600">
                      Only {stockCount} item available
                    </p>
                  ) : (
                    <p className="mt-1 text-xs text-red-600">Out of stock</p>
                  )}
                </div>

                <span
                  className={`rounded-md bg-white px-2 py-1 text-[10px] ${stockCount > 0 && stock ? "text-green-600" : "text-gray-300"} font-medium`}
                >
                  READY TO SHIP
                </span>
              </div>
            </div>

            {/* Size */}
            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">
                  Select Size
                </h3>

                <button className="text-xs font-medium text-gray-500 underline hover:text-gray-900">
                  Size Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex h-11 min-w-12 items-center justify-center rounded-lg border px-4 text-sm font-medium transition cursor-pointer outline-0 ${
                      selectedSize === size
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mt-7">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">
                Color
              </h3>

              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition cursor-pointer ${
                      selectedColor === color
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`h-5 w-5 rounded-full border ${
                        colorClasses[color]
                      } ${
                        selectedColor === color
                          ? "border-gray-900"
                          : "border-gray-200"
                      }`}
                    />

                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-7">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">
                Quantity
              </h3>

              <div className="flex h-11 w-32.5 items-center rounded-lg border border-gray-200 bg-white">
                <button
                  onClick={decreaseQuantity}
                  className="flex h-full w-10 items-center justify-center text-lg text-gray-500 transition hover:text-gray-900 cursor-pointer"
                >
                  <BiMinus size={16} />
                </button>

                <span className="flex-1 text-center text-sm font-semibold text-gray-900">
                  {quantity}
                </span>

                <button
                  onClick={increaseQuantity}
                  className="flex h-full w-10 items-center justify-center text-lg text-gray-500 transition hover:text-gray-900 cursor-pointer"
                >
                  <BiPlus size={16} />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-7 flex gap-3">
              <button
                onClick={() => addToCart(selectedProduct)}
                className="flex-1 rounded-xl bg-gray-900 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-700 active:scale-[0.99] cursor-pointer"
              >
                Add to Cart
              </button>

              <button className="flex-1 rounded-xl border border-gray-900 bg-white py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50 active:scale-[0.99] cursor-pointer">
                Buy Now
              </button>
            </div>

            {/* Wishlist */}
            <button
              onClick={() => toggleWishlist(selectedProduct)}
              className={`mt-4 flex items-center justify-center gap-2 rounded-xl border border-gray-900 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50 active:scale-[0.99] cursor-pointer ${
                onWishlist
                  ? "text-white bg-red-500 hover:bg-red-600"
                  : "text-gray-900 bg-white"
              }`}
            >
              <FiHeart
                size={16}
                stroke="currentColor"
                fill={onWishlist ? "currentColor" : "none"}
              />
              {onWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>

            {/* Delivery */}
            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-gray-100 bg-white p-4">
                <div className="text-lg">🚚</div>
                <p className="mt-2 text-xs font-semibold text-gray-900">
                  Free Delivery
                </p>
                <p className="mt-1 text-[10px] text-gray-400">
                  On orders above $50
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-4">
                <div className="text-lg">↩</div>
                <p className="mt-2 text-xs font-semibold text-gray-900">
                  Easy Returns
                </p>
                <p className="mt-1 text-[10px] text-gray-400">
                  30 day return policy
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PRODUCT INFORMATION ================= */}
        <section className="mt-14 rounded-2xl border border-gray-200 bg-white p-7">
          <h2 className="text-lg font-bold text-gray-900">
            Product Information
          </h2>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Description
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                {description}
              </p>

              {/* Tags */}
              <div className="mt-5">
                <h3 className="text-sm font-semibold text-gray-900">Tags</h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-500"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Details</h3>

              <div className="mt-3 overflow-hidden rounded-xl border border-gray-100">
                <div className="flex justify-between border-b border-gray-100 px-4 py-3 text-xs">
                  <span className="text-gray-400">Brand</span>
                  <span className="font-medium text-gray-900">{brand}</span>
                </div>

                <div className="flex justify-between border-b border-gray-100 px-4 py-3 text-xs">
                  <span className="text-gray-400">Category</span>
                  <span className="font-medium text-gray-900">{category}</span>
                </div>

                <div className="flex justify-between border-b border-gray-100 px-4 py-3 text-xs">
                  <span className="text-gray-400">Subcategory</span>
                  <span className="font-medium text-gray-900">
                    {subcategory}
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-100 px-4 py-3 text-xs">
                  <span className="text-gray-400">Availability</span>
                  <span className="font-medium text-green-600">
                    {stock ? (
                      <span className="font-medium text-green-600">
                        In Stock
                      </span>
                    ) : (
                      <span className="font-medium text-red-600">
                        Out of Stock
                      </span>
                    )}
                  </span>
                </div>

                <div className="flex justify-between border-b border-gray-100 px-4 py-3 text-xs">
                  <span className="text-gray-400">Stock</span>
                  <span className="font-medium text-gray-900">
                    {stockCount} units
                  </span>
                </div>

                <div className="flex justify-between px-4 py-3 text-xs">
                  <span className="text-gray-400">Product ID</span>
                  <span className="font-medium text-gray-900">
                    #{id.toString().padStart(5, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= allReviews ================= */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-7">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Customer Reviews
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Based on {reviews.length} reviews
              </p>
            </div>

            <button className="rounded-lg bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-gray-700">
              Write a Review
            </button>
          </div>

          <div className="mt-7 grid gap-8 lg:grid-cols-[250px_1fr]">
            {/* Rating Summary */}
            <div className="rounded-xl bg-gray-50 p-6 text-center">
              <p className="text-4xl font-bold text-gray-900">{rating}</p>

              <div className="mt-2 text-sm tracking-wide text-yellow-500">
                ★★★★★
              </div>

              <p className="mt-2 text-xs text-gray-400">
                {reviews.length} ratings
              </p>

              <div className="mt-5 space-y-2">
                {ratingDistribution.map(({ rating, percentage }) => (
                  <div
                    key={rating}
                    className="flex items-center gap-2 text-[10px]"
                  >
                    <span className="w-4 text-gray-500">{rating}</span>

                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-gray-900 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <span className="w-8 text-right text-gray-400">
                      {percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* allReviews */}
            <div className="space-y-5">
              {allReviews.map((review, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 pb-5 last:border-0"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {review.name}
                      </p>

                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs tracking-wide text-yellow-500">
                          {"★".repeat(review.rating)}
                          <span className="text-gray-200">
                            {"★".repeat(5 - review.rating)}
                          </span>
                        </span>

                        <span className="text-[10px] text-gray-400">
                          {review.date}
                        </span>
                      </div>
                    </div>

                    <span className="rounded-md bg-green-50 px-2 py-1 text-[10px] font-medium text-green-600">
                      Verified
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-6 text-gray-500">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= RELATED PRODUCTS ================= */}
        <section className="mt-14 pb-12">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                You may also like
              </p>

              <h2 className="mt-1 text-xl font-bold text-gray-900">
                Related Products
              </h2>
            </div>

            <button className="text-xs font-semibold text-gray-500 transition hover:text-gray-900">
              View All →
            </button>
          </div>

          <div className="mt-6 grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
            {relatedProducts.slice(0, 8).map((item, index) => (
              <div
                key={item.id ?? index}
                className={`group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  index >= 6 ? "md:hidden lg:block" : ""
                }`}
              >
                {/* Image */}
                <div className="relative h-[max-width] sm:h-60 md:h-45 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Discount */}
                  {item.discount > 0 && (
                    <span className="absolute left-2 top-2 rounded-md bg-red-500 px-2 py-1 text-[10px] font-semibold text-white">
                      {item.discount}% OFF
                    </span>
                  )}

                  {/* Wishlist */}
                  <button
                    type="button"
                    className="absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-base shadow-md transition hover:text-red-500"
                    aria-label={`Add ${item.name} to wishlist`}
                  >
                    ♡
                  </button>
                </div>

                {/* Details */}
                <div className="p-3.5">
                  {/* Brand */}
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    {item.brand}
                  </p>

                  {/* Product Name */}
                  <h3 className="mt-1 truncate text-sm font-semibold text-gray-900">
                    {item.name}
                  </h3>

                  {/* Rating */}
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="rounded bg-green-600 px-1.5 py-0.5 text-[10px] font-medium text-white">
                      {item.rating} ★
                    </span>

                    <span className="text-[10px] text-gray-400">
                      {item.reviews} reviews
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${item.price}
                    </span>

                    {item.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ${item.originalPrice}
                      </span>
                    )}

                    {item.discount > 0 && (
                      <span className="text-[10px] font-semibold text-red-500">
                        {item.discount}% off
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetails;

const allReviews = [
  {
    name: "John D.",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Really comfortable shoes. I've been using them for my morning runs and they feel great.",
  },
  {
    name: "Michael R.",
    rating: 5,
    date: "1 month ago",
    comment:
      "The quality is excellent and the shoes look even better in person. Very happy with the purchase.",
  },
  {
    name: "David K.",
    rating: 4,
    date: "2 months ago",
    comment:
      "Good shoes overall. Comfortable and lightweight. The sizing was accurate for me.",
  },
  {
    name: "Sarah M.",
    rating: 3,
    date: "3 days ago",
    comment: "Nice shoes, but the cushioning could be better.",
  },
];
