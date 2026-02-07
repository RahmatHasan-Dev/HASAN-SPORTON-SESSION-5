import { getAuthHeaders } from "../lib/api";
import { Product } from "../types";

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch("/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.warn("Failed to fetch products:", res.statusText);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.warn("Failed to fetch products:", error);
    return [];
  }
};

export const getProductDetail = async (id: string): Promise<Product | null> => {
  if (!id || id === "undefined" || id === "null" || id.trim() === "") {
    return null;
  }
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.warn("Failed to fetch product:", id, res.statusText);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.warn("Failed to fetch product:", id, error);
    return null;
  }
};

export const createProduct = async (data: FormData): Promise<Product> => {
  const headers: Record<string, string> = {};
  const authHeaders = getAuthHeaders();
  Object.assign(headers, authHeaders);

  const res = await fetch("/api/products", {
    method: "POST",
    headers,
    body: data,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Failed to create product" }));
    throw new Error(error.message || "Failed to create product");
  }

  return await res.json();
};

export const updateProduct = async (
  id: string,
  data: FormData
): Promise<Product> => {
  const headers: Record<string, string> = {};
  const authHeaders = getAuthHeaders();
  Object.assign(headers, authHeaders);

  const res = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers,
    body: data,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Failed to update product" }));
    throw new Error(error.message || "Failed to update product");
  }

  return await res.json();
};

export const deleteProduct = async (id: string): Promise<void> => {
  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Failed to delete product" }));
    throw new Error(error.message || "Failed to delete product");
  }
};
