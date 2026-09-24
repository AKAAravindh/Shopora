import { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/account", { replace: true });
    }
  }, [authLoading, user, navigate]);

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
    setLoading(true);

    try {
      await login(formData);

      const from = location.state?.from;

      navigate(
        from ? `${from.pathname}${from.search}${from.hash}` : "/account",
        { replace: true },
      );
    } catch (error) {
      setError(error.message || "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        {/* ================= BRAND PANEL ================= */}
        <section className="relative hidden overflow-hidden bg-gray-900 lg:flex">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=85"
              alt="Shopora fashion collection"
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
                Welcome back
              </p>

              <h1 className="mt-4 text-4xl font-bold leading-tight text-white xl:text-5xl">
                Your style,
                <br />
                all in one place.
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/70">
                Sign in to access your wishlist, shopping cart and personalized
                Shopora experience.
              </p>

              <div className="mt-8 flex items-center gap-6 text-xs text-white/60">
                <div className="flex items-center gap-2">
                  <FiShield size={15} />
                  Secure account
                </div>

                <div className="flex items-center gap-2">
                  <FiShoppingBag size={15} />
                  Easy shopping
                </div>
              </div>
            </div>

            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Shopora
            </p>
          </div>
        </section>

        {/* ================= LOGIN ================= */}
        <section className="flex items-center justify-center px-4 py-10 sm:px-8">
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
                  Account
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Sign in to continue shopping with Shopora.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
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
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-medium text-gray-400 transition hover:text-gray-900"
                    >
                      Forgot password?
                    </button>
                  </div>

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
                      placeholder="Enter your password"
                      autoComplete="current-password"
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
                  {loading ? "Signing in..." : "Sign in"}
                  {!loading && <FiArrowRight size={17} />}
                </button>
              </form>

              <div className="my-7 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-100" />
                <span className="text-[10px] uppercase tracking-wider text-gray-400">
                  Shopora
                </span>
                <div className="h-px flex-1 bg-gray-100" />
              </div>

              <p className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  state={location.state}
                  className="font-semibold text-gray-900 hover:underline"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
