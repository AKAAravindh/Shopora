import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import PageLoader from "./components/PageLoader";
import ScrollToTop from "./components/ScrollToTop";
// import SmoothScroll from "./components/SmoothScroll";

const HomePage = lazy(() => import("./pages/HomePage"));
const AllProducts = lazy(() => import("./pages/AllProducts"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const Cart = lazy(() => import("./pages/CartPage"));
const Wishlist = lazy(() => import("./pages/WishlistPage"));

function App() {
  return (
    <>
      {/* <SmoothScroll /> */}
      <ScrollToTop />
      <Header />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:categorySlug" element={<AllProducts />} />
          <Route
            path="/products/:categorySlug/:productSlug/:id"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Routes>
      </Suspense>
    </>
  );
}
export default App;
