// import products from "./products";

const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/api/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const getProductByID = async (id) => {
  const response = await fetch(`${API_URL}/api/products/${id}`);

  if (!response) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
};

export const addProducts = async (products) => {
  const response = await fetch(`${API_URL}/api/products/bulk`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(products),
  });

  if (!response.ok) {
    throw new Error("Failed to add products");
  }

  return response.json();
};

export const getCart = async (cartId) => {
  const response = await fetch(`${API_URL}/api/cart/${cartId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  return response.json();
};

export const savedCart = async (cartId, items) => {
  const response = await fetch(`${API_URL}/api/cart/${cartId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items }),
  });

  if (!response.ok) {
    throw new Error("Failed to save cart");
  }

  return response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to register");
  }

  return data;
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to login");
  }

  return data;
};

export const getCurrentUser = async (token) => {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch current user");
  }

  return data;
};
