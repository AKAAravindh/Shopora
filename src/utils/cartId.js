const CART_ID_KEY = "shoporaCartId";

export const getCartId = () => {
  let cartId = localStorage.getItem(CART_ID_KEY);

  if (!cartId || cartId === "undefined" || cartId === "null") {
    cartId = crypto.randomUUID();
    localStorage.setItem(CART_ID_KEY, cartId);
  }

  return cartId;
};
