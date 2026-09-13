import { useEffect, useState } from "react";
import {
  getWishlistItemsFromStorage,
  setWishlistItemsToStorage,
} from "../utils/wishlistStorage";
import { WishlistContext } from "./WishlistContext";

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() =>
    getWishlistItemsFromStorage(),
  );

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setWishlistItemsToStorage(wishlistItems);
  }, [wishlistItems]);

  // Toggle wishlist
  const toggleWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.filter((item) => item.id !== product.id);
      }

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2500);

      return [...prevItems, { ...product }];
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist }}>
      {children}

      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-gray-900 px-5 py-3.5 text-white shadow-xl">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-500 text-sm font-bold">
            ✓
          </div>

          <div>
            <p className="text-sm font-semibold">Added to wishlist</p>
            <p className="text-xs text-gray-400">Product added successfully</p>
          </div>
        </div>
      )}
    </WishlistContext.Provider>
  );
};
