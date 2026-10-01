const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export function greenApiFetch(path: string, options?: RequestInit) {
  return fetch(`${BASE_URL}${path}`, options);
}
