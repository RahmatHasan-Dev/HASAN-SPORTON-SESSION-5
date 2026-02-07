import { getAuthHeaders } from "../lib/api";
import { Category } from "../types";

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch("/api/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.warn("Failed to fetch categories:", res.statusText);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.warn("Failed to fetch categories:", error);
    return [];
  }
};

export const createCategory = async (data: FormData): Promise<Category> => {
  const headers: Record<string, string> = {};
  const authHeaders = getAuthHeaders();
  Object.assign(headers, authHeaders);

  const res = await fetch("/api/categories", {
    method: "POST",
    headers,
    body: data,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Failed to create category" }));
    throw new Error(error.message || "Failed to create category");
  }

  return await res.json();
};

export const updateCategory = async (
  id: string,
  data: FormData
): Promise<Category> => {
  const headers: Record<string, string> = {};
  const authHeaders = getAuthHeaders();
  Object.assign(headers, authHeaders);

  const res = await fetch(`/api/categories/${id}`, {
    method: "PUT",
    headers,
    body: data,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Failed to update category" }));
    throw new Error(error.message || "Failed to update category");
  }

  return await res.json();
};

export const deleteCategory = async (id: string): Promise<void> => {
  const res = await fetch(`/api/categories/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Failed to delete category" }));
    throw new Error(error.message || "Failed to delete category");
  }
};
