import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";
import { useAuth } from "./useAuth";

export const useCart = () => {
  const cart = useContext(CartContext);
  const { user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const addToCart = (product) => {
    if (!user) {
      navigate("/login", {
        state: {
          from: location,
        },
      });

      return;
    }

    cart.addToCart(product);
  };

  return {
    ...cart,
    addToCart,
  };
};
