import { useState } from "react";
import {
  FiArrowRight,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiHeart,
  FiLock,
  FiMail,
  FiShield,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordIsValid = formData.password.length >= 6;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!passwordIsValid) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      await register(formData);

      await login({
        email: formData.email,
        password: formData.password,
      });

      navigate("/");
    } catch (error) {
      setError(error.message || "Unable to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
        {/* ================= REGISTER FORM ================= */}
        <section className="order-2 flex items-center justify-center px-4 py-2 sm:px-8 lg:order-1">
          <div className="w-full max-w-md">
            {/* Mobile brand */}
            <div className="mb-10 lg:hidden">
              <Link
                to="/"
                className="text-2xl font-black tracking-tight text-gray-900"
              >
                SHOP<span className="text-gray-400">ORA</span>
              </Link>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                  <FiUser size={21} className="text-gray-700" />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Get started
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                  Create your account
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Join Shopora and keep your shopping experience in one place.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Full name
                  </label>

                  <div className="relative">
                    <FiUser
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      autoComplete="name"
                      required
                      className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <FiMail
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <FiLock
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      autoComplete="new-password"
                      required
                      className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <FiEyeOff size={17} />
                      ) : (
                        <FiEye size={17} />
                      )}
                    </button>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <div
                      className={`h-1.5 flex-1 rounded-full ${
                        formData.password.length === 0
                          ? "bg-gray-100"
                          : passwordIsValid
                            ? "bg-gray-900"
                            : "bg-gray-300"
                      }`}
                    />

                    <span className="text-[10px] text-gray-400">
                      {formData.password.length === 0
                        ? "6+ characters"
                        : passwordIsValid
                          ? "Ready"
                          : "Too short"}
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Creating account..." : "Create account"}
                  {!loading && <FiArrowRight size={17} />}
                </button>
              </form>

              <div className="mt-7 rounded-2xl bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                    <FiShield size={16} className="text-gray-600" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-900">
                      Secure account
                    </p>

                    <div className="mt-2 space-y-1.5">
                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <FiCheck size={12} />
                        Password protected
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <FiCheck size={12} />
                        Secure authentication
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-7 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-gray-900 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ================= BRAND PANEL ================= */}
        <section className="order-1 relative hidden overflow-hidden bg-gray-900 lg:order-2 lg:flex">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1800&q=85"
              alt="Shopora collection"
              className="h-full w-full object-cover opacity-40"
            />

            <div className="absolute inset-0 bg-gray-900/55" />
          </div>

          <div className="relative z-10 flex min-h-full flex-col justify-between p-12 xl:p-16">
            <Link
              to="/"
              className="w-fit text-3xl font-black tracking-tight text-white"
            >
              SHOP<span className="text-gray-400">ORA</span>
            </Link>

            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                Start shopping
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight text-white xl:text-5xl">
                Discover your
                <br />
                next favourite.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/70">
                Create your Shopora account to keep your wishlist, cart and
                shopping activity together.
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-xs text-white/65">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                    <FiHeart size={14} />
                  </div>
                  Save products to your wishlist
                </div>

                <div className="flex items-center gap-3 text-xs text-white/65">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                    <FiShoppingBag size={14} />
                  </div>
                  Keep your shopping cart synced
                </div>
              </div>
            </div>

            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Shopora
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default RegisterPage;
