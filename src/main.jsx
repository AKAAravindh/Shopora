import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { CartProvider } from "./context/CartProvider.jsx";
import { OtherProvider } from "./context/OtherProvider.jsx";
import { WishlistProvider } from "./context/WishlistProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <OtherProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </OtherProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>,
);
