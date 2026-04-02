import { getToken } from "@/app/login/actions";

export async function fetchWithjwt(url: string, options: any = {}) {
  let token = await getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  return fetch(url, {
    ...options,
    headers,
  });
}

export const API = "http://localhost:8080";
