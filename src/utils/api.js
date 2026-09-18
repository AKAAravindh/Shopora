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
