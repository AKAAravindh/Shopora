import { useEffect, useState } from "react";
import {
  FiBox,
  FiCalendar,
  FiChevronRight,
  FiPackage,
  FiShoppingBag,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getUserOrders } from "../utils/api";

function OrdersPage() {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getUserOrders(token);
        setOrders(data);
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadOrders();
    }
  }, [token]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-[1920px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="animate-pulse">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gray-200" />

              <div className="space-y-2">
                <div className="h-7 w-40 rounded-lg bg-gray-200" />
                <div className="h-4 w-60 rounded bg-gray-200" />
              </div>
            </div>

            <div className="mx-auto max-w-6xl space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6"
                >
                  <div className="flex gap-4">
                    <div className="h-20 w-20 rounded-xl bg-gray-200" />

                    <div className="flex-1 space-y-3">
                      <div className="h-4 w-32 rounded bg-gray-200" />
                      <div className="h-5 w-48 rounded bg-gray-200" />
                      <div className="h-3 w-64 rounded bg-gray-200" />
                    </div>

                    <div className="hidden space-y-2 sm:block">
                      <div className="h-4 w-20 rounded bg-gray-200" />
                      <div className="h-6 w-24 rounded bg-gray-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-[1920px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-3xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm sm:px-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                <FiShoppingBag className="text-3xl" />
              </div>

              <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                No Orders Yet
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                You haven't placed any orders yet. Once you complete a purchase,
                your order history will appear here.
              </p>

              <Link
                to="/products"
                className="mt-7 inline-flex items-center justify-center rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[1920px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <FiBox className="text-xl" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  My Orders
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  {orders.length} {orders.length === 1 ? "order" : "orders"} in
                  your account
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders */}
        <main className="mx-auto max-w-6xl space-y-4">
          {orders.map((order) => (
            <Link
              key={order._id}
              to={`/orders/${order._id}`}
              className="group block rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-md sm:p-5"
            >
              {/* Top */}
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 gap-4">
                  {/* Product Preview */}
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100 sm:h-24 sm:w-24">
                    {order.items?.[0]?.image ? (
                      <img
                        src={order.items[0].image}
                        alt={order.items[0].name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <FiPackage className="text-2xl text-gray-400" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-gray-900">
                        #{formatOrderId(order._id)}
                      </p>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${getStatusStyle(
                          order.orderStatus,
                        )}`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>

                    <p className="mt-2 truncate text-sm font-semibold text-gray-900 sm:text-base">
                      {order.items?.[0]?.name}
                    </p>

                    {order.items?.length > 1 && (
                      <p className="mt-1 text-xs text-gray-400">
                        + {order.items.length - 1} more{" "}
                        {order.items.length - 1 === 1 ? "item" : "items"}
                      </p>
                    )}

                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <FiCalendar className="text-gray-400" />
                        {formatDate(order.createdAt)}
                      </span>

                      <span>
                        {order.items?.length || 0}{" "}
                        {order.items?.length === 1 ? "item" : "items"}
                      </span>

                      <span className="capitalize">
                        {order.paymentMethod === "cod"
                          ? "Cash on Delivery"
                          : order.paymentMethod}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 sm:border-0 sm:pt-0 sm:text-right">
                  <div>
                    <p className="text-xs text-gray-400">Order Total</p>

                    <p className="mt-1 text-lg font-bold text-gray-900">
                      ₹{Number(order.totalPrice || 0).toLocaleString("en-IN")}
                    </p>

                    {order.paymentStatus && (
                      <p
                        className={`mt-1 text-xs font-medium capitalize ${
                          order.paymentStatus === "paid"
                            ? "text-green-600"
                            : order.paymentStatus === "failed"
                              ? "text-red-500"
                              : "text-amber-600"
                        }`}
                      >
                        Payment {order.paymentStatus}
                      </p>
                    )}
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all group-hover:bg-orange-50 group-hover:text-orange-500 sm:ml-5">
                    <FiChevronRight className="text-lg transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Bottom */}
              <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="flex -space-x-2">
                  {order.items?.slice(0, 3).map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className="h-9 w-9 overflow-hidden rounded-lg border-2 border-white bg-gray-100"
                    >
                      {item.images?.[0] ? (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <FiPackage className="text-xs text-gray-400" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-gray-600">
                    {order.items?.[0]?.brand}
                  </p>

                  <p className="truncate text-xs text-gray-400">
                    {order.items?.[0]?.name}
                    {order.items?.length > 1 &&
                      ` + ${order.items.length - 1} more`}
                  </p>
                </div>

                <span className="ml-auto hidden text-xs font-semibold text-orange-500 sm:block">
                  View Order
                </span>
              </div>
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
}

export default OrdersPage;
