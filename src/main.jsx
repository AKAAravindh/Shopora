import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./context/CartProvider.jsx";
import { OtherProvider } from "./context/OtherProvider.jsx";
import { WishlistProvider } from "./context/WishlistProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <OtherProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </OtherProvider>
    </CartProvider>
  </BrowserRouter>,
);
