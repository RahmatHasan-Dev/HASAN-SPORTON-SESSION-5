import { getAuthHeaders } from "../lib/api";
import { Bank } from "../types";

export const getAllBanks = async (): Promise<Bank[]> => {
  try {
    const res = await fetch("/api/banks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.warn("Failed to fetch banks:", res.statusText);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.warn("Failed to fetch banks:", error);
    return [];
  }
};

export const createBank = async (data: Partial<Bank>): Promise<Bank> => {
  const res = await fetch("/api/banks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Failed to create bank" }));
    throw new Error(error.message || "Failed to create bank");
  }

  return await res.json();
};

export const updateBank = async (
  id: string,
  data: Partial<Bank>
): Promise<Bank> => {
  const res = await fetch(`/api/banks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Failed to update bank" }));
    throw new Error(error.message || "Failed to update bank");
  }

  return await res.json();
};

export const deleteBank = async (id: string): Promise<void> => {
  const res = await fetch(`/api/banks/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Failed to delete bank" }));
    throw new Error(error.message || "Failed to delete bank");
  }
};
