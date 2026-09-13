const WISHLIST_STORAGE_KEY = "wishlistItems";

export const getWishlistItemsFromStorage = () => {
  const wishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
  return wishlist ? JSON.parse(wishlist) : [];
};

export const setWishlistItemsToStorage = (wishlistItems) => {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
};
