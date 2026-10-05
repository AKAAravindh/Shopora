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
const AccountPage = lazy(() => import("./pages/AccountPage"));
const MainLayout = lazy(() => import("./layout/MainLayout"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const OrderDetailsPage = lazy(() => import("./pages/OrderDetailsPage"));

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
            <Route
              path="/p/:categorySlug/:productSlug/:productId"
              element={<ProductDetails />}
            />
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
            </Route>
            <Route path="/account" element={<AccountPage />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
export default App;
