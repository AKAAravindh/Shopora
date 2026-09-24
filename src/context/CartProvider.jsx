import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getUserCart, saveUserCart } from "../utils/api";

import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const { token } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [loadedToken, setLoadedToken] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadCart = async () => {
      setCartLoaded(false);
      setLoadedToken(null);

      if (!token) {
        setCartItems([]);

        if (!cancelled) {
          setCartLoaded(true);
        }

        return;
      }

      try {
        const cart = await getUserCart(token);

        if (cancelled) {
          return;
        }

        setCartItems(cart.items ?? []);
        setLoadedToken(token);
        setCartLoaded(true);
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error("Failed to load user cart:", error);

        setCartItems([]);
        setLoadedToken(token);
        setCartLoaded(true);
      }
    };

    loadCart();

    return () => {
      cancelled = true;
    };
  }, [token]);

  useEffect(() => {
    if (!token || !cartLoaded || loadedToken !== token) {
      return;
    }

    const saveCurrentCart = async () => {
      try {
        await saveUserCart(token, cartItems);
      } catch (error) {
        console.error("Failed to save user cart:", error);
      }
    };

    saveCurrentCart();
  }, [token, cartItems, cartLoaded, loadedToken]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}

      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-gray-900 px-5 py-3.5 text-white shadow-xl">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-sm font-bold">
            ✓
          </div>

          <div>
            <p className="text-sm font-semibold">Added to Cart</p>
            <p className="text-xs text-gray-400">Product added successfully</p>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};
