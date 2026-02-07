import { getAuthHeaders } from "../lib/api";
import { Transaction } from "../types";

export const transactionCheckout = async (
  form: FormData
): Promise<Transaction> => {
  const headers: Record<string, string> = {};
  const authHeaders = getAuthHeaders();
  Object.assign(headers, authHeaders);

  const res = await fetch("/api/transactions/checkout", {
    method: "POST",
    headers,
    body: form,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Failed to checkout" }));
    throw new Error(error.message || "Failed to checkout");
  }

  return await res.json();
};

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const res = await fetch("/api/transactions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    });
    if (!res.ok) {
      console.warn("Failed to fetch transactions:", res.statusText);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.warn("Failed to fetch transactions:", error);
    return [];
  }
};

export const getTransactionById = async (id: string): Promise<Transaction | null> => {
  if (!id || id === "undefined" || id === "null" || id.trim() === "") {
    return null;
  }
  
  try {
    const res = await fetch(`/api/transactions/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.warn("Transaction not found:", id);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.warn("Transaction not found:", id);
    return null;
  }
};

export const updateTransaction = async (
  id: string,
  data: FormData
): Promise<Transaction> => {
  const headers: Record<string, string> = {};
  const authHeaders = getAuthHeaders();
  Object.assign(headers, authHeaders);

  const res = await fetch(`/api/transactions/${id}`, {
    method: "PUT",
    headers,
    body: data,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Failed to update transaction" }));
    throw new Error(error.message || "Failed to update transaction");
  }

  return await res.json();
};
