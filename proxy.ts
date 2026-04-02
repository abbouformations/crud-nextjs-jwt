import { NextResponse } from "next/server";

export default function proxy(req: any) {
  const user = req.cookies.get("user");
  let token = null;

  if (user) {
    try {
      token = JSON.parse(user.value).jwt;
    } catch (e) {
      console.error("Invalid cookie");
    }
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/articles/:path*"],
};
