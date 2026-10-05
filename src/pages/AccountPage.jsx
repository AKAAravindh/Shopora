import {
  FiArrowRight,
  FiHeart,
  FiLogOut,
  FiMapPin,
  FiPackage,
  FiShoppingBag,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";

const AccountPage = () => {
  const { user, logout, loading } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-2xl bg-orange-50">
              <FiUser className="text-xl text-orange-400" />
            </div>
            <p className="text-sm text-gray-500">Loading account...</p>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     GUEST
  ========================================================= */

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto grid min-h-screen max-w-[1920px] lg:grid-cols-2">
          {/* IMAGE PANEL */}
          <section className="relative hidden overflow-hidden bg-gray-900 lg:block">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=85"
              alt="Shopora shopping collection"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/55" />

            <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-16">
              <Link
                to="/"
                className="w-fit text-3xl font-black tracking-tight text-white"
              >
                SHOP<span className="text-orange-400">ORA</span>
              </Link>

              <div className="max-w-xl">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/20 text-orange-300 backdrop-blur-sm">
                  <FiShoppingBag className="text-lg" />
                </div>

                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                  Your shopping space
                </p>

                <h1 className="mt-4 text-4xl font-bold leading-tight text-white xl:text-5xl">
                  Everything you love,
                  <br />
                  in one place.
                </h1>

                <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
                  Sign in to manage your account, save favourites and keep your
                  shopping cart ready across visits.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-500/20 text-pink-300">
                      <FiHeart size={16} />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-white">
                      Wishlist
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/55">
                      Save products you want to come back to.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/20 text-orange-300">
                      <FiShoppingBag size={16} />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-white">
                      Shopping cart
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/55">
                      Keep your selected products ready for checkout.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-white/35">
                © {new Date().getFullYear()} Shopora
              </p>
            </div>
          </section>

          {/* GUEST PANEL */}
          <section className="flex items-center justify-center px-4 py-10 sm:px-8 lg:px-12">
            <div className="w-full max-w-lg">
              {/* Mobile Brand */}
              <div className="mb-8 lg:hidden">
                <Link
                  to="/"
                  className="text-2xl font-black tracking-tight text-gray-900"
                >
                  SHOP<span className="text-orange-500">ORA</span>
                </Link>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                {/* Mobile image */}
                <div className="mb-7 overflow-hidden rounded-2xl lg:hidden">
                  <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80"
                    alt="Shopora shopping collection"
                    className="h-52 w-full object-cover"
                  />
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                  <FiUser size={23} />
                </div>

                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                  My Account
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Welcome to Shopora
                </h1>

                <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                  You're currently browsing as a guest. Choose an option below
                  to continue.
                </p>

                {/* Main Actions */}
                <div className="mt-8 space-y-3">
                  <Link
                    to="/login"
                    className="flex h-13 w-full items-center justify-between rounded-xl bg-gray-900 px-5 text-sm font-semibold text-white transition hover:bg-gray-700"
                  >
                    <span>Login to your account</span>
                    <FiArrowRight size={17} />
                  </Link>

                  <Link
                    to="/register"
                    className="flex h-13 w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-900 transition hover:border-orange-200 hover:bg-orange-50/40"
                  >
                    <span>Create a new account</span>
                    <FiArrowRight size={17} />
                  </Link>

                  <Link
                    to="/"
                    className="flex h-13 w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                  >
                    <span>Continue shopping as guest</span>
                    <FiShoppingBag size={17} />
                  </Link>
                </div>

                {/* Benefits */}
                <div className="mt-8 border-t border-gray-100 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                    Why create an account?
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl bg-pink-50 p-3">
                      <FiHeart size={16} className="text-pink-500" />

                      <p className="mt-2 text-xs font-semibold text-gray-900">
                        Save favourites
                      </p>
                    </div>

                    <div className="rounded-xl bg-orange-50 p-3">
                      <FiShoppingBag size={16} className="text-orange-500" />

                      <p className="mt-2 text-xs font-semibold text-gray-900">
                        Keep your cart
                      </p>
                    </div>

                    <div className="rounded-xl bg-green-50 p-3">
                      <FiShield size={16} className="text-green-500" />

                      <p className="mt-2 text-xs font-semibold text-gray-900">
                        Secure account
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-7 text-center text-xs text-gray-400">
                  You can continue browsing without creating an account.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  /* =========================================================
     AUTHENTICATED USER
  ========================================================= */

  const initials = user.name
    ?.split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const wishlistCount = wishlistItems.length;

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[1920px] px-4 py-10 pb-4 sm:px-6 lg:px-8 lg:py-14">
        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
            My Account
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Welcome back, {user.name?.split(" ")[0]}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your profile and Shopora activity.
          </p>
        </div>

        {/* =================================================
            PROFILE HERO
        ================================================= */}

        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="relative h-32 overflow-hidden bg-gray-900 sm:h-40">
            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />

            <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800/90" />
          </div>

          <div className="px-5 pb-6 sm:px-8 sm:pb-8">
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-orange-50 text-2xl font-bold text-orange-600 shadow-sm sm:h-28 sm:w-28">
                  {initials || <FiUser size={30} />}
                </div>

                <div className="pb-1">
                  <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    {user.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">{user.email}</p>

                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Account Active
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-red-100 hover:bg-red-50 hover:text-red-600"
              >
                <FiLogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </section>

        {/* =================================================
            QUICK STATS
        ================================================= */}

        <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {/* Orders */}
          <Link
            to="/orders"
            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
              <FiPackage size={18} />
            </div>

            <p className="mt-4 text-xs text-gray-400">Orders</p>

            <p className="mt-1 text-lg font-bold text-gray-900">View orders</p>

            <p className="mt-0.5 flex items-center gap-1 text-[10px] text-blue-500">
              Order history
              <FiArrowRight className="transition group-hover:translate-x-1" />
            </p>
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-500">
              <FiHeart size={18} />
            </div>

            <p className="mt-4 text-xs text-gray-400">Wishlist</p>

            <p className="mt-1 text-lg font-bold text-gray-900">
              {wishlistCount}
            </p>

            <p className="mt-0.5 text-[10px] text-gray-400">
              {wishlistCount === 1 ? "saved product" : "saved products"}
            </p>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <FiShoppingBag size={18} />
            </div>

            <p className="mt-4 text-xs text-gray-400">Cart</p>

            <p className="mt-1 text-lg font-bold text-gray-900">
              {cartItemCount}
            </p>

            <p className="mt-0.5 text-[10px] text-gray-400">
              {cartItemCount === 1 ? "item in cart" : "items in cart"}
            </p>
          </Link>

          {/* Account */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-500">
              <FiShield size={18} />
            </div>

            <p className="mt-4 text-xs text-gray-400">Account</p>

            <p className="mt-1 text-lg font-bold text-gray-900">Active</p>

            <p className="mt-0.5 text-[10px] text-gray-400">
              Securely authenticated
            </p>
          </div>
        </section>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          {/* PERSONAL INFORMATION */}
          <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
                  Profile
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  Personal information
                </h2>
              </div>

              <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500 sm:flex">
                <FiUser size={18} />
              </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-blue-50/50 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-500">
                  <FiUser size={14} />
                </div>

                <p className="mt-3 text-xs text-gray-400">Full name</p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {user.name}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-purple-50/50 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-500">
                  <FiShield size={14} />
                </div>

                <p className="mt-3 text-xs text-gray-400">Email address</p>

                <p className="mt-1 break-all text-sm font-semibold text-gray-900">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-green-100 bg-green-50/60 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <FiShield size={16} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Account security
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Your Shopora account is currently authenticated and
                    protected by JWT-based login.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ACCOUNT SHORTCUTS */}
          <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
              Manage your account
            </p>

            <h2 className="mt-1 text-xl font-bold text-gray-900">
              Your Shopora
            </h2>

            <div className="mt-6 space-y-3">
              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="group flex items-center justify-between rounded-2xl border border-gray-200 p-4 transition hover:border-pink-200 hover:bg-pink-50/40"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-500">
                    <FiHeart size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Wishlist
                    </p>

                    <p className="mt-0.5 text-xs text-gray-400">
                      {wishlistCount === 0
                        ? "No saved products"
                        : `${wishlistCount} ${
                            wishlistCount === 1
                              ? "saved product"
                              : "saved products"
                          }`}
                    </p>
                  </div>
                </div>

                <FiArrowRight
                  size={17}
                  className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-pink-500"
                />
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="group flex items-center justify-between rounded-2xl border border-gray-200 p-4 transition hover:border-orange-200 hover:bg-orange-50/40"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                    <FiShoppingBag size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Shopping cart
                    </p>

                    <p className="mt-0.5 text-xs text-gray-400">
                      {cartItemCount === 0
                        ? "Your cart is empty"
                        : `${cartItemCount} ${
                            cartItemCount === 1 ? "item" : "items"
                          } in your cart`}
                    </p>
                  </div>
                </div>

                <FiArrowRight
                  size={17}
                  className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-orange-500"
                />
              </Link>

              {/* Orders */}
              <Link
                to="/orders"
                className="group flex items-center justify-between rounded-2xl border border-gray-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/40"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                    <FiPackage size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Orders
                    </p>

                    <p className="mt-0.5 text-xs text-gray-400">
                      View and track your orders
                    </p>
                  </div>
                </div>

                <FiArrowRight
                  size={17}
                  className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-blue-500"
                />
              </Link>

              {/* Addresses */}
              <div className="flex items-center justify-between rounded-2xl border border-gray-200 p-4 opacity-70">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-500">
                    <FiMapPin size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Addresses
                    </p>

                    <p className="mt-0.5 text-xs text-gray-400">
                      Saved delivery addresses
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-500">
                  Soon
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* =================================================
            ACCOUNT STATUS
        ================================================= */}

        <section className="mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-5 p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-500">
                <FiShield size={19} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-600">
                  Account status
                </p>

                <h2 className="mt-1 text-lg font-bold text-gray-900">
                  {user.name}'s Shopora account is active
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  You're signed in as {user.email}. Your wishlist, cart and
                  orders are ready to use.
                </p>
              </div>
            </div>

            <Link
              to="/products"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
            >
              Continue Shopping
              <FiArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AccountPage;
