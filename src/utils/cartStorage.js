const CART_STORAGE_KEY = "cartItems";

export const getCartItemsFromStorage = () => {
  const cart = localStorage.getItem(CART_STORAGE_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const setCartItemsToStorage = (cartItems) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
};

export const clearCartItemsFromStorage = () => {
  localStorage.removeItem(CART_STORAGE_KEY);
};
