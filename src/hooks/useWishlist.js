import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { WishlistContext } from "../context/WishlistContext";
import { useAuth } from "./useAuth";

export const useWishlist = () => {
  const wishlist = useContext(WishlistContext);
  const { user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const toggleWishlist = (product) => {
    if (!user) {
      navigate("/login", {
        state: {
          from: location,
        },
      });

      return;
    }

    wishlist.toggleWishlist(product);
  };

  return {
    ...wishlist,
    toggleWishlist,
  };
};
