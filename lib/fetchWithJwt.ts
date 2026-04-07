import { cookies } from "next/headers";

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

export async function getToken(): Promise<string | null> {
  try {
    const userCookie = (await cookies()).get("user");
    if (!userCookie) return null;

    const user = JSON.parse(userCookie.value);
    const token = user.jwt;

    return typeof token === "string" ? token : null;
  } catch (e) {
    console.error("Invalid cookie", e);
    return null;
  }
}
