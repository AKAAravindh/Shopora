import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

const HomePage = lazy(() => import("./pages/HomePage"));
const AllProducts = lazy(() => import("./pages/AllProducts"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const Cart = lazy(() => import("./pages/CartPage"));
const Wishlist = lazy(() => import("./pages/WishlistPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const MainLayout = lazy(() => import("./layout/MainLayout"));

function App() {
  return (
    <>
      <ScrollToTop />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:categorySlug" element={<AllProducts />} />
            <Route
              path="/products/:categorySlug/:productSlug/:id"
              element={<ProductDetails />}
            />
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="wishlist" element={<Wishlist />} />
            </Route>
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
export default App;
