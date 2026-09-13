import { FiArrowLeft, FiMinus, FiPlus, FiTag, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import { useCart } from "../hooks/useCart";
import { useOther } from "../hooks/useOther";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
  } = useCart();
  const { setItemToRemove } = useOther();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const totalOriginalPrice = cartItems.reduce(
    (total, item) => total + item.originalPrice * item.quantity,
    0,
  );

  const totalDiscount = totalOriginalPrice - totalPrice;

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1920px] px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Shopping Cart
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {totalItems} items in your cart
              </p>
            </div>

            <Link
              to="/products"
              className="hidden items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-black sm:flex"
            >
              <FiArrowLeft size={17} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="mx-auto max-w-[1920px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          {/* LEFT SIDE */}
          <section className="space-y-4">
            {/* Cart Header */}
            <div className="hidden rounded-xl border border-gray-200 bg-white px-6 py-4 md:flex md:items-center md:justify-between">
              <p className="text-sm font-semibold text-gray-900">Cart Items</p>

              <button
                onClick={() =>
                  cartItems.length > 0 &&
                  setItemToRemove({
                    title: "Remove all items?",
                    message:
                      "Are you sure you want to remove all items from your cart?",
                    confirmText: "Remove All",
                    cancelText: "Cancel",
                    onConfirm: clearCart,
                  })
                }
                className="text-sm font-medium text-red-500 transition hover:text-red-600 cursor-pointer"
              >
                Remove All
              </button>
            </div>

            {/* Products */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5"
              >
                <div className="flex gap-4 sm:gap-6">
                  {/* Image */}
                  <div className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-36 sm:w-32">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                          {item.brand}
                        </p>

                        <h2 className="mt-1 line-clamp-2 text-base font-semibold text-gray-900 sm:text-lg">
                          {item.name}
                        </h2>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() =>
                          setItemToRemove({
                            title: "Remove item?",
                            message: `Are you sure you want to remove ${item.name} from your cart?`,
                            confirmText: "Remove",
                            cancelText: "Cancel",

                            onConfirm: () => removeFromCart(item.id),
                          })
                        }
                        className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500 cursor-pointer"
                        title="Remove item"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>

                    {/* Variant */}
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-500">
                      <span>
                        Size:{" "}
                        <strong className="font-medium text-gray-800">
                          {item.size}
                        </strong>
                      </span>

                      <span>
                        Color:{" "}
                        <strong className="font-medium text-gray-800">
                          {item.color}
                        </strong>
                      </span>
                    </div>

                    {/* Bottom */}
                    <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                      {/* Price */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900">
                            ₹{item.price.toLocaleString("en-IN")}
                          </span>

                          <span className="text-sm text-gray-400 line-through">
                            ₹{item.originalPrice.toLocaleString("en-IN")}
                          </span>
                        </div>

                        <p className="mt-0.5 text-xs font-medium text-green-600">
                          {item.discount}% OFF
                        </p>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center rounded-lg border border-gray-200">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-100 cursor-pointer"
                        >
                          <FiMinus size={14} />
                        </button>

                        <span className="flex h-9 min-w-9 items-center justify-center border-x border-gray-200 text-sm font-semibold text-gray-900">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-gray-100 cursor-pointer"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery */}
                <div className="mt-4 border-t border-gray-100 pt-3">
                  <p className="text-xs font-medium text-green-600">
                    ✓ Free delivery available
                  </p>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              to="/products"
              className="flex w-fit items-center gap-2 pt-2 text-sm font-semibold text-gray-700 transition hover:text-black"
            >
              <FiArrowLeft size={16} />
              Continue Shopping
            </Link>
          </section>

          {/* RIGHT SIDE */}
          <aside className="space-y-4">
            {/* Coupon */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-2">
                <FiTag className="text-gray-500" />
                <h2 className="text-sm font-semibold text-gray-900">
                  Apply Coupon
                </h2>
              </div>

              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 cursor-text"
                />

                <button className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black">
                  Apply
                </button>
              </div>

              <p className="mt-3 text-xs text-gray-400">
                Try <span className="font-semibold text-gray-700">SAVE500</span>{" "}
                to get ₹500 off.
              </p>
            </div>

            {/* Order Summary */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
              <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>

                  <span className="font-medium text-gray-900">
                    ₹{totalOriginalPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Product Discount</span>

                  <span className="font-medium text-green-600">
                    - ₹{totalDiscount.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery</span>

                  <span className="font-semibold text-green-600">FREE</span>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-base font-semibold text-gray-900">
                        Total
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        Inclusive of all taxes
                      </p>
                    </div>

                    <span className="text-2xl font-bold text-gray-900">
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout */}
              <button className="mt-6 w-full rounded-xl bg-gray-900 py-3.5 text-sm font-semibold text-white transition hover:bg-black">
                Proceed to Checkout
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <span>🔒</span>
                Secure & encrypted checkout
              </div>
            </div>

            {/* Benefits */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm">
                    🚚
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Free Delivery
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      On orders above ₹999
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm">
                    ↩
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Easy Returns
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      7-day return policy
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm">
                    ✓
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Quality Guaranteed
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      Genuine products only
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <ConfirmationModal />
    </div>
  );
};

export default Cart;
