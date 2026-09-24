import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getUserWishlist, saveUserWishlist } from "../utils/api";
import { WishlistContext } from "./WishlistContext";

export const WishlistProvider = ({ children }) => {
  const { token } = useAuth();

  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);
  const [loadedToken, setLoadedToken] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadWishlist = async () => {
      setWishlistLoaded(false);
      setLoadedToken(null);

      if (!token) {
        setWishlistItems([]);

        if (!cancelled) {
          setWishlistLoaded(true);
        }

        return;
      }

      try {
        const wishlist = await getUserWishlist(token);

        if (cancelled) {
          return;
        }

        setWishlistItems(wishlist.items ?? []);
        setLoadedToken(token);
        setWishlistLoaded(true);
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error("Failed to load user wishlist:", error);

        setWishlistItems([]);
        setLoadedToken(null);
        setWishlistLoaded(false);
      }
    };

    loadWishlist();

    return () => {
      cancelled = true;
    };
  }, [token]);

  useEffect(() => {
    if (!token || !wishlistLoaded || loadedToken !== token) {
      return;
    }

    const saveCurrentWishlist = async () => {
      try {
        await saveUserWishlist(token, wishlistItems);
      } catch (error) {
        console.error("Failed to save user wishlist:", error);
      }
    };

    saveCurrentWishlist();
  }, [token, wishlistItems, wishlistLoaded, loadedToken]);

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
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
      }}
    >
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
