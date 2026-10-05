import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiHeart,
  FiUser,
  FiShoppingBag,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";

import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { useAuth } from "../hooks/useAuth";
import { getProducts, getCategories } from "../utils/api";

function Header() {
  const navigate = useNavigate();

  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const primaryCategories = ["Shoes", "Clothing", "Bags", "Watches"];

  // --------------------------------------------------------------------------
  // Fetch products
  // --------------------------------------------------------------------------

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    loadProducts();
  }, []);

  // --------------------------------------------------------------------------
  // Fetch categories
  // --------------------------------------------------------------------------

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };

    loadCategories();
  }, []);

  // --------------------------------------------------------------------------
  // Lock background scroll when mobile menu is open
  // --------------------------------------------------------------------------

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileMenuOpen]);

  // --------------------------------------------------------------------------
  // Counts
  // --------------------------------------------------------------------------

  const cartCount = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0,
  );

  const wishlistCount = wishlistItems.length;

  // --------------------------------------------------------------------------
  // Search
  // --------------------------------------------------------------------------

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    return products
      .filter((product) => {
        const searchableText = [
          product.name,
          product.brand,
          product.category,
          product.subcategory,
          ...(product.tags || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      })
      .slice(0, 5);
  }, [products, searchQuery]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    navigate(`/products?search=${encodeURIComponent(query)}`);

    setSearchQuery("");
    setSearchOpen(false);
    setMobileMenuOpen(false);
  };

  const handleSearchResultClick = () => {
    setSearchQuery("");
    setSearchOpen(false);
    setMobileMenuOpen(false);
  };

  // --------------------------------------------------------------------------
  // Category links
  // --------------------------------------------------------------------------

  const categoryLinks = categories
    .filter((category) => primaryCategories.includes(category))
    .map((category) => {
      const categorySlug = category
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      return {
        name: category,
        path: `/products/${categorySlug}`,
      };
    });

  const allCategoryLinks = categories.map((category) => {
    const categorySlug = category
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    return {
      name: category,
      path: `/products/${categorySlug}`,
    };
  });

  const additionalLinks = [
    {
      name: "New Arrivals",
      path: "/products/new-arrivals",
    },
    {
      name: "Best Sellers",
      path: "/products/best-selling",
    },
    {
      name: "Sale",
      path: "/products/sale",
    },
  ];

  const navItems = [...categoryLinks, ...additionalLinks];

  // --------------------------------------------------------------------------
  // Product URL
  // --------------------------------------------------------------------------

  const getProductPath = (product) => {
    const categorySlug = product.category
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const productSlug = product.name
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    return `/p/${categorySlug}/${productSlug}/${product.productId}`;
  };

  // --------------------------------------------------------------------------
  // Close mobile menu
  // --------------------------------------------------------------------------

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileCategoriesOpen(false);
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-950 text-white shadow-lg">
      {/* ================================================================== */}
      {/* Desktop */}
      {/* ================================================================== */}

      <div className="hidden md:block">
        {/* ---------------------------------------------------------------- */}
        {/* Main Header */}
        {/* ---------------------------------------------------------------- */}

        <div className="border-b border-gray-800">
          <div className="mx-auto flex h-18 max-w-7xl items-center gap-6 px-6">
            {/* Logo */}

            <Link
              to="/"
              className="flex items-center text-2xl font-black transition group"
            >
              <span className="text-white group-hover:text-orange-500 transition-all duration-300">
                SHOP
              </span>
              <span className="text-orange-500 hover:text-white transition-all duration-300">
                ORA
              </span>
            </Link>

            {/* Search */}

            <div className="relative min-w-0 flex-1">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <FiSearch
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="search"
                    value={searchQuery}
                    onFocus={() => setSearchOpen(true)}
                    onChange={(event) => {
                      setSearchQuery(event.target.value);
                      setSearchOpen(true);
                    }}
                    placeholder="Search products..."
                    className="w-full rounded-xl border border-gray-800 bg-gray-900 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </form>

              {/* Search results */}

              {searchOpen && searchQuery.trim() && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                  {searchResults.length > 0 ? (
                    <div className="p-2">
                      {searchResults.map((product) => (
                        <Link
                          key={product.productId || product.id}
                          to={getProductPath(product)}
                          onClick={handleSearchResultClick}
                          className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-gray-50"
                        >
                          <img
                            src={product.images?.[0]}
                            alt={product.name}
                            className="h-14 w-14 rounded-xl bg-gray-100 object-cover"
                          />

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-gray-900">
                              {product.name}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {product.brand} · {product.category}
                            </p>

                            <p className="mt-1 text-sm font-bold text-gray-900">
                              ₹{Number(product.price).toLocaleString("en-IN")}
                            </p>
                          </div>

                          <FiChevronRight
                            size={16}
                            className="shrink-0 text-gray-400"
                          />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="px-5 py-8 text-center">
                      <p className="text-sm font-semibold text-gray-900">
                        No products found
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Try another search term.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}

            <div className="flex shrink-0 items-center gap-2">
              {user ? (
                <>
                  <Link
                    to="/wishlist"
                    className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-300 transition hover:bg-gray-900 hover:text-white"
                    aria-label="Wishlist"
                  >
                    <FiHeart size={19} />

                    {wishlistCount > 0 && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/account"
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-300 transition hover:bg-gray-900 hover:text-white"
                    aria-label="Account"
                  >
                    <FiUser size={19} />
                  </Link>

                  <Link
                    to="/cart"
                    className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-300 transition hover:bg-gray-900 hover:text-white"
                    aria-label="Cart"
                  >
                    <FiShoppingBag size={19} />

                    {cartCount > 0 && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-300 transition hover:bg-gray-900 hover:text-white"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Desktop Navigation */}
        {/* ---------------------------------------------------------------- */}

        <div className="border-b border-gray-800">
          <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6">
            {/* Categories */}

            <div className="relative justify-self-start">
              <button
                type="button"
                onClick={() => setCategoriesOpen((prev) => !prev)}
                className="flex h-12 cursor-pointer items-center gap-1.5 px-3 text-sm font-medium text-gray-300 transition hover:text-white"
              >
                Categories
                <FiChevronDown
                  size={15}
                  className={`transition-transform ${
                    categoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {categoriesOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setCategoriesOpen(false)}
                  />

                  <div className="absolute left-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl">
                    <Link
                      to="/products"
                      onClick={() => setCategoriesOpen(false)}
                      className="block rounded-xl bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-orange-50 hover:text-orange-600"
                    >
                      All Products
                    </Link>

                    <div className="my-2 border-t border-gray-100" />

                    {allCategoryLinks.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        onClick={() => setCategoriesOpen(false)}
                        className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                      >
                        {category.name}

                        <FiChevronRight size={15} className="text-gray-400" />
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Centered navigation */}

            <nav className="flex items-center justify-center">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/products"}
                  className={({ isActive }) =>
                    `relative flex h-12 items-center whitespace-nowrap px-3 text-sm font-medium transition ${
                      isActive
                        ? "text-orange-400"
                        : "text-gray-400 hover:text-gray-100"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}

                      <span
                        className={`absolute bottom-0 left-2 right-2 h-0.5 origin-center bg-orange-500 transition-transform ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right balance area */}

            <div />
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* Mobile */}
      {/* ================================================================== */}

      <div className="md:hidden">
        {/* ---------------------------------------------------------------- */}
        {/* Mobile top bar */}
        {/* ---------------------------------------------------------------- */}

        <div className="flex h-[72px] items-center justify-between border-b border-gray-800 px-4">
          {/* Menu */}

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen((prev) => !prev);
              setSearchOpen(false);
            }}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-gray-300 transition hover:bg-gray-900 hover:text-white"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          {/* Logo */}

          <Link
            to="/"
            onClick={closeMobileMenu}
            className="text-xl font-black tracking-tight text-white"
          >
            Shopora
          </Link>

          {/* Cart */}

          <Link
            to="/cart"
            onClick={closeMobileMenu}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-300 transition hover:bg-gray-900 hover:text-white"
            aria-label="Cart"
          >
            <FiShoppingBag size={20} />

            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Mobile Search */}
        {/* ---------------------------------------------------------------- */}

        <div className="border-b border-gray-800 px-4 py-3">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <FiSearch
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="search"
                value={searchQuery}
                onFocus={() => setSearchOpen(true)}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setSearchOpen(true);
                }}
                placeholder="Search products..."
                className="w-full rounded-xl border border-gray-800 bg-gray-900 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </form>

          {/* Mobile search results */}

          {searchOpen && searchQuery.trim() && (
            <div className="relative z-[60] mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
              {searchResults.length > 0 ? (
                <div className="p-2">
                  {searchResults.map((product) => (
                    <Link
                      key={product.productId || product.id}
                      to={getProductPath(product)}
                      onClick={handleSearchResultClick}
                      className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-gray-50"
                    >
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="h-12 w-12 rounded-xl bg-gray-100 object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {product.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {product.brand} · {product.category}
                        </p>

                        <p className="mt-1 text-sm font-bold text-gray-900">
                          ₹{Number(product.price).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <FiChevronRight
                        size={16}
                        className="shrink-0 text-gray-400"
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="px-5 py-7 text-center">
                  <p className="text-sm font-semibold text-gray-900">
                    No products found
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Try another search term.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Mobile Menu */}
        {/* ---------------------------------------------------------------- */}

        {mobileMenuOpen && (
          <div className="fixed inset-x-0 bottom-0 top-[72px] z-50 overflow-y-auto border-t border-gray-800 bg-gray-950 md:hidden">
            <div className="mx-auto w-full max-w-7xl px-4 py-5">
              {/* Account */}

              <div className="mb-5 grid grid-cols-2 gap-3">
                {user ? (
                  <>
                    <Link
                      to="/account"
                      onClick={closeMobileMenu}
                      className="flex items-center justify-center gap-2 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm font-semibold text-gray-200 transition hover:border-orange-500 hover:text-orange-400"
                    >
                      <FiUser size={17} />
                      Account
                    </Link>

                    <Link
                      to="/wishlist"
                      onClick={closeMobileMenu}
                      className="relative flex items-center justify-center gap-2 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm font-semibold text-gray-200 transition hover:border-orange-500 hover:text-orange-400"
                    >
                      <FiHeart size={17} />
                      Wishlist
                      {wishlistCount > 0 && (
                        <span className="rounded-full bg-orange-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="flex items-center justify-center rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm font-semibold text-gray-200 transition hover:border-orange-500 hover:text-orange-400"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={closeMobileMenu}
                      className="flex items-center justify-center rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>

              {/* All Products */}

              <Link
                to="/products"
                onClick={closeMobileMenu}
                className="mb-2 flex items-center justify-between rounded-xl bg-gray-900 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-500"
              >
                All Products
                <FiChevronRight size={17} />
              </Link>

              {/* Categories */}

              <div className="overflow-hidden rounded-xl border border-gray-800">
                <button
                  type="button"
                  onClick={() => setMobileCategoriesOpen((prev) => !prev)}
                  className="flex w-full cursor-pointer items-center justify-between px-4 py-3.5 text-sm font-semibold text-gray-200 transition hover:bg-gray-900"
                >
                  <span>Categories</span>

                  <FiChevronDown
                    size={17}
                    className={`transition-transform ${
                      mobileCategoriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileCategoriesOpen && (
                  <div className="border-t border-gray-800 bg-gray-900/50 p-2">
                    {allCategoryLinks.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        onClick={closeMobileMenu}
                        className="flex items-center justify-between rounded-lg px-3 py-3 text-sm text-gray-400 transition hover:bg-gray-900 hover:text-orange-400"
                      >
                        {category.name}

                        <FiChevronRight size={15} />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation */}

              <nav className="mt-3 overflow-hidden rounded-xl border border-gray-800">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.path === "/products"}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `flex items-center justify-between border-b border-gray-800 px-4 py-3.5 text-sm font-medium transition last:border-b-0 ${
                        isActive
                          ? "bg-orange-500/10 text-orange-400"
                          : "text-gray-300 hover:bg-gray-900 hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span>{item.name}</span>

                        <FiChevronRight
                          size={16}
                          className={
                            isActive ? "text-orange-400" : "text-gray-600"
                          }
                        />
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>

              {/* Secondary Links */}

              <div className="mt-5 grid grid-cols-2 gap-3 pb-6">
                <Link
                  to="/orders"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center rounded-xl border border-gray-800 px-4 py-3 text-sm font-medium text-gray-400 transition hover:border-gray-700 hover:bg-gray-900 hover:text-white"
                >
                  Orders
                </Link>

                <Link
                  to="/cart"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-800 px-4 py-3 text-sm font-medium text-gray-400 transition hover:border-gray-700 hover:bg-gray-900 hover:text-white"
                >
                  Cart
                  {cartCount > 0 && (
                    <span className="rounded-full bg-orange-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
