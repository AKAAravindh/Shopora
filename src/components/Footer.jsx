import {
  FiArrowUpRight,
  FiFacebook,
  FiHeart,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
  FiRotateCcw,
  FiShield,
  FiTruck,
  FiTwitter,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* ================= TRUST BAR ================= */}
      <div className="border-b border-gray-800">
        <div className="mx-auto hidden md:grid w-full max-w-[1920px] md:grid-cols-3">
          {/* Free Shipping */}
          <div className="flex items-center justify-center gap-4 border-b border-gray-800 px-5 py-5 sm:border-b-0 sm:border-r lg:px-8 mx-auto w-full">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-orange-500">
              <FiTruck size={20} />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Free Shipping</p>

              <p className="mt-1 text-xs text-gray-500">On orders above ₹999</p>
            </div>
          </div>

          {/* Easy Returns */}
          <div className="flex items-center justify-center gap-4 border-b border-gray-800 px-5 py-5 sm:border-b-0 sm:border-r lg:px-8 mx-auto w-full">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-orange-500">
              <FiRotateCcw size={20} />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Easy Returns</p>

              <p className="mt-1 text-xs text-gray-500">7-day return policy</p>
            </div>
          </div>

          {/* Secure Checkout */}
          <div className="flex items-center justify-center gap-4 px-5 py-5 lg:px-8 mx-auto w-full">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-orange-500">
              <FiShield size={20} />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Secure Checkout
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Safe & protected payments
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN FOOTER ================= */}
      <div className="mx-auto w-full max-w-[1920px] px-5 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-y-10 sm:gap-10 grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr] lg:gap-12">
          {/* BRAND */}
          <div className="col-span-3 sm:col-span-2 lg:col-span-1 flex sm:flex-col gap-4 w-full justify-between lg:justify-start sm:order-4 lg:order-1">
            <div>
              <Link to="/" className="inline-block">
                <h2 className="text-3xl font-black tracking-tight text-orange-500">
                  SHOP<span className="text-white">ORA</span>
                </h2>
              </Link>

              <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">
                Discover products you'll love, from everyday essentials to
                statement pieces. Shop with confidence and find your next
                favorite.
              </p>
            </div>

            {/* Socials */}
            <div className="mb-auto md:mb-0 md:mt-6 flex items-center gap-2">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 text-gray-400 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
              >
                <FiInstagram size={17} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 text-gray-400 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
              >
                <FiFacebook size={17} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 text-gray-400 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
              >
                <FiTwitter size={17} />
              </a>
            </div>
          </div>

          {/* SHOP */}
          <div className="sm:order-1">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Shop
            </h3>

            <div className="mt-5 space-y-3">
              <Link
                to="/products"
                className="block text-sm text-gray-500 transition hover:text-white"
              >
                All Products
              </Link>

              <Link
                to="/products/new-arrivals"
                className="block text-sm text-gray-500 transition hover:text-white"
              >
                New Arrivals
              </Link>

              <Link
                to="/products/best-selling"
                className="block text-sm text-gray-500 transition hover:text-white"
              >
                Best Sellers
              </Link>

              <Link
                to="/products/sale"
                className="block text-sm text-gray-500 transition hover:text-orange-400"
              >
                Sale
              </Link>
            </div>
          </div>

          {/* ACCOUNT */}
          <div className="sm:order-2">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Account
            </h3>

            <div className="mt-5 space-y-3">
              <Link
                to="/account"
                className="block text-sm text-gray-500 transition hover:text-white"
              >
                My Account
              </Link>

              <Link
                to="/wishlist"
                className="block text-sm text-gray-500 transition hover:text-white"
              >
                Wishlist
              </Link>

              <Link
                to="/cart"
                className="block text-sm text-gray-500 transition hover:text-white"
              >
                Shopping Cart
              </Link>

              <Link
                to="/login"
                className="block text-sm text-gray-500 transition hover:text-white"
              >
                Login
              </Link>
            </div>
          </div>

          {/* INFORMATION */}
          <div className="sm:order-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Information
            </h3>

            <div className="mt-5 space-y-3">
              <Link
                to="/products"
                className="block text-sm text-gray-500 transition hover:text-white"
              >
                Browse Collection
              </Link>

              <Link
                to="/products/shoes"
                className="block text-sm text-gray-500 transition hover:text-white"
              >
                Shoes
              </Link>

              <Link
                to="/products/clothing"
                className="block text-sm text-gray-500 transition hover:text-white"
              >
                Clothing
              </Link>

              <Link
                to="/products/electronics"
                className="block text-sm text-gray-500 transition hover:text-white"
              >
                Electronics
              </Link>
            </div>
          </div>

          {/* CONTACT */}
          <div className="col-span-3 sm:col-span-1 sm:order-5 flex sm:block flex-col gap-4 sm:gap-6 lg:gap-8">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white whitespace-nowrap">
              Get in touch
            </h3>

            <div className="mt-5 grid grid-cols-2 sm:grid-cols-1 gap-4">
              <div className="flex gap-3">
                <FiMail size={17} className="mt-0.5 shrink-0 text-orange-500" />

                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="mt-1 text-sm text-gray-400">
                    support@shopora.com
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <FiPhone
                  size={17}
                  className="mt-0.5 shrink-0 text-orange-500"
                />

                <div>
                  <p className="text-xs text-gray-600">Phone</p>
                  <p className="mt-1 text-sm text-gray-400">+91 00000 00000</p>
                </div>
              </div>

              <div className="flex gap-3">
                <FiMapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-orange-500"
                />

                <div>
                  <p className="text-xs text-gray-600">Location</p>
                  <p className="mt-1 text-sm text-gray-400">India</p>
                </div>
              </div>

              {/* Contact CTA */}
              <a
                href="mailto:support@shopora.com"
                className="group mt-auto inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-orange-400"
              >
                Contact support
                <FiArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-4 px-5 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Shopora. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-600">
            <span className="flex items-center gap-1.5">
              Made with
              <FiHeart size={12} className="text-orange-500" />
              for shoppers
            </span>

            <span className="hidden h-3 w-px bg-gray-800 sm:block" />

            <span>Secure shopping experience</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
