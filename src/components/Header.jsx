import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiHeart,
  FiUser,
  FiShoppingBag,
  FiChevronDown,
} from "react-icons/fi";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { getProducts } from "../utils/api";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Failed to load products", error);
      });
  }, []);

  // Total number of products in cart
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const categories = products.reduce((acc, product) => {
    if (product.category && !acc.includes(product.category)) {
      acc.push(product.category);
    }
    return acc;
  }, []);

  const categoryLinks = categories.map((category) => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, "-");
    return {
      name: category,
      path: `/products/${categorySlug}`,
    };
  });

  const additionalLinks = [
    { name: "New Arrivals", path: "/products/new-arrivals" },
    { name: "Best Sellers", path: "/products/best-selling" },
    { name: "Sale", path: "/products/sale" },
  ];

  const navItems = [...categoryLinks, ...additionalLinks];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      {/* ================= DESKTOP HEADER ================= */}
      <div className="mx-4 sm:mx-10 lg:mx-0 max-w-[1920px] px-4 sm:px-6 lg:px-16">
        <div className="flex h-20 items-center justify-between gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="shrink-0 text-2xl font-black tracking-tight text-gray-900"
          >
            SHOP<span className="text-gray-400">ORA</span>
          </Link>

          {/* Search */}
          <div className="hidden max-w-xl flex-1 md:block">
            <form className="relative">
              <FiSearch
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="search"
                placeholder="Search products..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white cursor-text"
              />
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-1 md:flex">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="group relative flex h-10 w-10 items-center justify-center rounded-full text-red-500 transition hover:bg-gray-100"
              aria-label="Wishlist"
            >
              <FiHeart size={21} />

              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-[9px] font-bold text-white">
                {wishlistItems.length}
              </span>
            </Link>

            {/* Account */}
            <Link
              to="/account"
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100"
              aria-label="Account"
            >
              <FiUser size={21} />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100"
              aria-label="Cart"
            >
              <FiShoppingBag size={21} />

              {cartItemCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gray-900 px-1 text-[9px] font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100"
              aria-label="Search"
            >
              <FiSearch size={21} />
            </button>

            <Link
              to="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100"
              aria-label="Cart"
            >
              <FiShoppingBag size={21} />

              {cartItemCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gray-900 px-1 text-[9px] font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100"
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <FiX size={23} /> : <FiMenu size={23} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="pb-4 md:hidden">
            <form className="relative">
              <FiSearch
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                autoFocus
                type="search"
                placeholder="Search products..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none focus:border-gray-400 focus:bg-white"
              />
            </form>
          </div>
        )}
      </div>

      {/* ================= DESKTOP NAV ================= */}
      <nav className="hidden border-t border-gray-100 md:block">
        <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-12 items-center justify-center gap-x-6 flex-wrap w-full">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative flex h-full whitespace-nowrap items-center text-sm font-medium transition p-2 ${
                    isActive
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                  }`
                }
              >
                {item.name}

                {/* Active underline */}
                <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-gray-900 transition-transform" />
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                >
                  {item.name}

                  <FiChevronDown
                    size={15}
                    className="-rotate-90 text-gray-400"
                  />
                </NavLink>
              ))}
            </div>

            {/* Mobile account links */}
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-gray-100 pt-4">
              <Link
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700"
              >
                <FiHeart size={17} />
                Wishlist
              </Link>

              <Link
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700"
              >
                <FiUser size={17} />
                Account
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
