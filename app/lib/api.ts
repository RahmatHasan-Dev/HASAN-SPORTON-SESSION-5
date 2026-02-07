
function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  
  const port = process.env.PORT || 3000;
  return `http://localhost:${port}`;
}

export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {

  if (endpoint.startsWith("/")) {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${endpoint}`;
    
    const res = await fetch(url, {
      ...options,
      cache: options?.cache || "no-store",
    });

    if (!res.ok) {
      let errorMessage = `Failed to fetch data from ${endpoint}`;
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
      }

      throw new Error(errorMessage);
    }

    return res.json();
  }
  

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  const url = `${baseUrl}${endpoint}`;
  
  const res = await fetch(url, {
    ...options,
    cache: options?.cache || "no-store",
  });

  if (!res.ok) {
    let errorMessage = `Failed to fetch data from ${endpoint}`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {

    }

    throw new Error(errorMessage);
  }

  return res.json();
}

export function getImageUrl(path: string | undefined | null): string | null {
  if (!path) return null; 
  if (path.startsWith("http")) return path; 
  if (path.startsWith("/")) return path; 
  return `${process.env.NEXT_PUBLIC_API_ROOT}${path}`;
}

export function getAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") {
    return {};
  }
  const token = localStorage.getItem("token");
  if (!token) {
    return {};
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

