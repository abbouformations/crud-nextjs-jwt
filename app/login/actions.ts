"use server";

import { API } from "@/lib/fetchWithJwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  (await cookies()).delete("user");
  redirect("/login");
}

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

export async function getUsername(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("user");

    if (!userCookie) return null;

    const user = JSON.parse(userCookie.value);
    const username = user.username;

    return typeof username === "string" ? username : null;
  } catch (e) {
    console.error("Invalid cookie", e);
    return null;
  }
}

export async function hasRole(rolename: string): Promise<boolean> {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");

  if (!userCookie) return false;

  try {
    const user = JSON.parse(userCookie.value);
    const roles = user.roles;

    if (!Array.isArray(roles) || roles.length === 0) {
      return false;
    }

    return roles.includes(rolename);
  } catch (e) {
    console.error("Invalid cookie", e);
    return false;
  }
}

export async function isLogged(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("user");

    if (!userCookie) return false;

    const user = JSON.parse(userCookie.value);
    const token = user.jwt;

    return typeof token === "string" && token.length > 0;
  } catch (e) {
    console.error("Invalid cookie", e);
    return false;
  }
}

export async function loginAction(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Please enter your login and password" };
  }

  try {
    const res = await fetch(`${API}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });

    if (!res.ok) {
      return { error: "Invalid username or password" };
    }
    const data = await res.json();

    const cookieStore = await cookies();

    const user = {
      username: data.username,
      roles: data.roles,
      jwt: data.jwt,
    };

    cookieStore.set("user", JSON.stringify(user), {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60,
    });
  } catch (err) {
    console.error(err);
    return { error: "Login error" };
  }
  redirect("/");
}
