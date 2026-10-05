import { FiArrowLeft, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { createOrder, saveUserCart } from "../utils/api";

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    postalCode: "",
    address: "",
    city: "",
    state: "",
  });

  const [addressError, setAddressError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const { cartItems, clearCart } = useCart();
  const { token } = useAuth();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Your cart is empty
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Add some products to your cart before checking out.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  if (orderPlaced) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Order Placed Successfully!
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Thank you for your purchase. Your order has been placed
            successfully.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Checkout
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Complete your order securely
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FiLock size={14} />
            Secure Checkout
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto w-full max-w-[1920px] px-4 py-6 sm:px-6 md:py-8 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
          {/* Left */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
              <h2 className="text-lg font-bold text-gray-900">
                Shipping Address
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Enter the address where you'd like your order delivered.
              </p>

              {/* Address Form */}
              <form
                id="checkout-address-form"
                onSubmit={async (e) => {
                  e.preventDefault();

                  const hasEmptyField = Object.values(shippingAddress).some(
                    (value) => !value.trim(),
                  );

                  if (hasEmptyField) {
                    setAddressError("Please fill in all address fields.");
                    return;
                  }

                  const phoneRegex = /^[0-9]{10}$/;

                  if (!phoneRegex.test(shippingAddress.phone)) {
                    setAddressError(
                      "Please enter a valid 10-digit phone number.",
                    );
                    return;
                  }

                  const postalCodeRegex = /^[0-9]{6}$/;

                  if (!postalCodeRegex.test(shippingAddress.postalCode)) {
                    setAddressError(
                      "Please enter a valid 6-digit postal code.",
                    );
                    return;
                  }

                  if (!paymentMethod) {
                    setAddressError("Please select a payment method.");
                    return;
                  }

                  setAddressError("");

                  const checkoutData = {
                    items: cartItems,
                    shippingAddress,
                    paymentMethod,
                    totalPrice,
                  };

                  console.log("Checkout Data:", checkoutData);

                  if (paymentMethod === "cod") {
                    try {
                      const data = await createOrder(token, checkoutData);

                      console.log("Order Created:", data);

                      // Clear the cart after successful order placement
                      await saveUserCart(token, []);

                      clearCart();

                      setOrderPlaced(true);

                      return;
                    } catch (error) {
                      setAddressError(
                        error.message || "Failed to place order.",
                      );
                    }
                  }
                }}
                className="mt-6 space-y-4"
              >
                {addressError && (
                  <p className="text-sm font-medium text-red-500">
                    {addressError}
                  </p>
                )}

                {/* Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={shippingAddress.fullName}
                    onChange={(e) => {
                      setShippingAddress({
                        ...shippingAddress,
                        fullName: e.target.value,
                      });
                      setAddressError("");
                    }}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400"
                  />
                </div>

                {/* Phone Number and Postal Code */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="Enter phone number"
                      value={shippingAddress.phone}
                      onChange={(e) => {
                        setShippingAddress({
                          ...shippingAddress,
                          phone: e.target.value,
                        });
                        setAddressError("");
                      }}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="postalCode"
                      className="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      Postal Code
                    </label>

                    <input
                      id="postalCode"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="Postal code"
                      value={shippingAddress.postalCode}
                      onChange={(e) => {
                        setShippingAddress({
                          ...shippingAddress,
                          postalCode: e.target.value,
                        });
                        setAddressError("");
                      }}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>

                  <textarea
                    id="address"
                    rows="3"
                    placeholder="House / Flat / Street / Area"
                    value={shippingAddress.address}
                    onChange={(e) => {
                      setShippingAddress({
                        ...shippingAddress,
                        address: e.target.value,
                      });
                      setAddressError("");
                    }}
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="city"
                      className="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>

                    <input
                      id="city"
                      type="text"
                      placeholder="City"
                      value={shippingAddress.city}
                      onChange={(e) => {
                        setShippingAddress({
                          ...shippingAddress,
                          city: e.target.value,
                        });
                        setAddressError("");
                      }}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      State
                    </label>

                    <input
                      id="state"
                      type="text"
                      placeholder="State"
                      value={shippingAddress.state}
                      onChange={(e) => {
                        setShippingAddress({
                          ...shippingAddress,
                          state: e.target.value,
                        });
                        setAddressError("");
                      }}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Payment */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
              <h2 className="text-lg font-bold text-gray-900">
                Payment Method
              </h2>

              <div className="mt-6 space-y-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-gray-400">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setAddressError("");
                    }}
                    className="h-4 w-4"
                  />

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Cash on Delivery
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      Pay when your order is delivered.
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-gray-400">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setAddressError("");
                    }}
                    className="h-4 w-4"
                  />

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Online Payment
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      Pay securely using an online payment method.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right */}
          <aside>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
              <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

              <div className="mt-6 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-sm font-medium text-gray-900">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {paymentMethod && (
                <div className="mt-6 border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Payment</span>

                    <span className="text-sm font-semibold text-gray-900">
                      {paymentMethod === "cod"
                        ? "Cash on Delivery"
                        : "Online Payment"}
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-6 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total</span>

                  <span className="text-2xl font-bold text-gray-900">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-address-form"
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-gray-900 py-3.5 text-sm font-semibold text-white transition hover:bg-black"
              >
                {paymentMethod === "cod"
                  ? "Place Order"
                  : "Continue to Payment"}
              </button>

              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <FiLock size={12} />
                Your payment is secure
              </p>
            </div>

            <Link
              to="/cart"
              className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              <FiArrowLeft size={16} />
              Back to Cart
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Checkout;
