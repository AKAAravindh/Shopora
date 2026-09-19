import { useEffect, useState } from "react";
import {
  getCartItemsFromStorage,
  setCartItemsToStorage,
} from "../utils/cartStorage";
import { CartContext } from "./CartContext";
import { getCart, savedCart } from "../utils/api";
import { getCartId } from "../utils/cartId";

export const CartProvider = ({ children }) => {
  const [cartId] = useState(() => getCartId());
  const [cartItems, setCartItems] = useState(() => getCartItemsFromStorage());
  const [cartLoaded, setCartLoaded] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    getCart(cartId)
      .then((cart) => {
        if (cart.exists) {
          setCartItems(cart.items ?? []);
        }

        setCartLoaded(true);
      })
      .catch((error) => {
        console.error("Failed to load cart", error);
      });
  }, [cartId]);

  // Save cart whenever cartItems changes
  useEffect(() => {
    setCartItemsToStorage(cartItems);
  }, [cartItems]);

  useEffect(() => {
    if (!cartLoaded) {
      return;
    }

    savedCart(cartId, cartItems).catch((error) => {
      console.error("Failed to save cart:", error);
    });
  }, [cartId, cartItems, cartLoaded]);

  // Add to cart
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

  // Remove item
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // Clear cart
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
