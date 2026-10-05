import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiCalendar,
  FiCheck,
  FiChevronRight,
  FiCreditCard,
  FiMapPin,
  FiPackage,
  FiShield,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getOrderById } from "../utils/api";

function OrderDetailsPage() {
  const { orderId } = useParams();
  const { token } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await getOrderById(token, orderId);
        setOrder(data);
      } catch (error) {
        console.error("Failed to load order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token && orderId) {
      loadOrder();
    }
  }, [token, orderId]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatOrderId = (id) => {
    return id.slice(-8).toUpperCase();
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "placed":
        return "border-blue-100 bg-blue-50 text-blue-700";
      case "confirmed":
        return "border-indigo-100 bg-indigo-50 text-indigo-700";
      case "processing":
        return "border-amber-100 bg-amber-50 text-amber-700";
      case "shipped":
        return "border-purple-100 bg-purple-50 text-purple-700";
      case "delivered":
        return "border-green-100 bg-green-50 text-green-700";
      case "cancelled":
        return "border-red-100 bg-red-50 text-red-700";
      default:
        return "border-gray-200 bg-gray-50 text-gray-600";
    }
  };

  const getPaymentStatusStyle = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-50 text-green-600";
      case "failed":
        return "bg-red-50 text-red-600";
      default:
        return "bg-amber-50 text-amber-600";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-[1920px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="mx-auto max-w-6xl animate-pulse space-y-6">
            <div className="h-4 w-32 rounded bg-gray-200" />

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-xl bg-gray-200" />
                <div className="space-y-3">
                  <div className="h-3 w-24 rounded bg-gray-200" />
                  <div className="h-7 w-48 rounded bg-gray-200" />
                  <div className="h-4 w-40 rounded bg-gray-200" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="h-5 w-32 rounded bg-gray-200" />
              <div className="mt-8 h-12 rounded bg-gray-100" />
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="h-5 w-32 rounded bg-gray-200" />
              <div className="mt-6 space-y-5">
                <div className="h-20 rounded-xl bg-gray-100" />
                <div className="h-20 rounded-xl bg-gray-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-[1920px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-3xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm sm:px-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <FiPackage className="text-3xl" />
              </div>

              <h1 className="mt-6 text-2xl font-bold text-gray-900">
                Order Not Found
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                We couldn't find the order you're looking for. It may have been
                removed or the order link may be invalid.
              </p>

              <Link
                to="/orders"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
              >
                <FiArrowLeft />
                Back to Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const statuses = [
    { label: "Placed", value: "placed" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Processing", value: "processing" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
  ];

  const currentStatusIndex = statuses.findIndex(
    (status) => status.value === order.orderStatus,
  );

  const isCancelled = order.orderStatus === "cancelled";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[1920px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <main className="mx-auto max-w-6xl">
          {/* Back */}
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-orange-500"
          >
            <FiArrowLeft />
            Back to Orders
          </Link>

          {/* Order Header */}
          <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                  <FiPackage className="text-xl" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Order Details
                  </p>

                  <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    #{formatOrderId(order._id)}
                  </h1>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <FiCalendar className="text-gray-400" />
                      {formatDate(order.createdAt)}
                    </span>

                    <span>
                      {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"}
                    </span>
                  </div>
                </div>
              </div>

              <span
                className={`w-fit rounded-full border px-3.5 py-1.5 text-xs font-semibold capitalize ${getStatusStyle(
                  order.orderStatus,
                )}`}
              >
                {order.orderStatus}
              </span>
            </div>
          </section>

          {/* Status */}
          <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <FiTruck className="text-lg" />
              </div>

              <div>
                <h2 className="text-base font-bold text-gray-900">
                  Order Status
                </h2>
                <p className="mt-0.5 text-xs text-gray-400">
                  Track the progress of your order
                </p>
              </div>
            </div>

            {isCancelled ? (
              <div className="mt-6 flex gap-3 rounded-xl border border-red-100 bg-red-50 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500">
                  <FiPackage />
                </div>

                <div>
                  <p className="text-sm font-semibold text-red-700">
                    This order has been cancelled.
                  </p>

                  <p className="mt-1 text-xs leading-5 text-red-600">
                    Please contact support if you need assistance with this
                    order.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-8 overflow-x-auto pb-1">
                <div className="min-w-[620px]">
                  <div className="flex items-start">
                    {statuses.map((step, index) => {
                      const isCompleted =
                        currentStatusIndex >= 0 && index <= currentStatusIndex;

                      const isCurrent = index === currentStatusIndex;
                      const isLast = index === statuses.length - 1;

                      return (
                        <div
                          key={step.value}
                          className={`relative flex flex-1 flex-col items-center ${
                            !isLast
                              ? "after:absolute after:left-1/2 after:right-[-50%] after:top-5 after:h-0.5"
                              : ""
                          } ${
                            !isLast && index < currentStatusIndex
                              ? "after:bg-orange-400"
                              : !isLast
                                ? "after:bg-gray-200"
                                : ""
                          }`}
                        >
                          <div
                            className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                              isCompleted
                                ? "border-orange-500 bg-orange-500 text-white"
                                : "border-gray-200 bg-white text-gray-300"
                            } ${isCurrent ? "ring-4 ring-orange-50" : ""}`}
                          >
                            {isCompleted ? (
                              <FiCheck className="text-sm" />
                            ) : (
                              <span className="text-xs font-semibold">
                                {index + 1}
                              </span>
                            )}
                          </div>

                          <p
                            className={`mt-3 text-center text-xs font-semibold ${
                              isCompleted ? "text-gray-900" : "text-gray-400"
                            }`}
                          >
                            {step.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Ordered Items */}
          <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-500">
                  <FiShoppingBag className="text-lg" />
                </div>

                <div>
                  <h2 className="text-base font-bold text-gray-900">
                    Ordered Items
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-400">
                    {order.items.length}{" "}
                    {order.items.length === 1 ? "item" : "items"} in this order
                  </p>
                </div>
              </div>

              <FiPackage className="text-lg text-gray-300" />
            </div>

            <div className="mt-5 divide-y divide-gray-100">
              {order.items.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex gap-4 py-5 first:pt-0 last:pb-0"
                >
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-28">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <FiPackage className="text-2xl text-gray-300" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {item.brand}
                    </p>

                    <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-5 text-gray-900 sm:text-base">
                      {item.name}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                      <span>Qty: {item.quantity}</span>

                      {item.size && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span>Size: {item.size}</span>
                        </>
                      )}

                      {item.color && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span>Color: {item.color}</span>
                        </>
                      )}
                    </div>

                    <p className="mt-3 text-xs text-green-600">
                      ✓ Genuine product
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-base font-bold text-gray-900">
                      ₹
                      {(
                        Number(item.price || 0) * Number(item.quantity || 0)
                      ).toLocaleString("en-IN")}
                    </p>

                    <p className="mt-1 text-[11px] text-gray-400">
                      ₹{Number(item.price || 0).toLocaleString("en-IN")} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Address + Payment */}
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {/* Address */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                  <FiMapPin className="text-lg" />
                </div>

                <div>
                  <h2 className="text-base font-bold text-gray-900">
                    Delivery Address
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Your order will be delivered here
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-blue-50/60 p-4">
                <p className="text-sm font-bold text-gray-900">
                  {order.shippingAddress.fullName}
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {order.shippingAddress.address}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                  <br />
                  PIN: {order.shippingAddress.postalCode}
                </p>

                <div className="mt-4 flex items-center gap-2 border-t border-blue-100 pt-3">
                  <FiMapPin className="text-blue-500" />

                  <div>
                    <p className="text-[11px] text-gray-400">Contact Number</p>

                    <p className="mt-0.5 text-sm font-semibold text-gray-700">
                      {order.shippingAddress.phone}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-500">
                  <FiCreditCard className="text-lg" />
                </div>

                <div>
                  <h2 className="text-base font-bold text-gray-900">
                    Payment Summary
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Your order payment details
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-500">Payment Method</span>

                  <span className="text-right text-sm font-semibold text-gray-900">
                    {order.paymentMethod === "cod"
                      ? "Cash on Delivery"
                      : order.paymentMethod}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-500">Payment Status</span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getPaymentStatusStyle(
                      order.paymentStatus || "pending",
                    )}`}
                  >
                    {order.paymentStatus || "pending"}
                  </span>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-4">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-base font-bold text-gray-900">
                        Order Total
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Inclusive of all taxes
                      </p>
                    </div>

                    <span className="text-2xl font-bold text-gray-900">
                      ₹{Number(order.totalPrice || 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-gray-50 py-3 text-xs text-gray-500">
                <FiShield className="text-green-500" />
                Secure order information
              </div>
            </section>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-6 flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/orders"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-orange-500"
            >
              <FiArrowLeft />
              Back to Orders
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 transition hover:text-orange-600"
            >
              Continue Shopping
              <FiChevronRight />
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
