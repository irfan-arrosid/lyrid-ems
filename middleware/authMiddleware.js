import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import cookie from "cookie";

const secretKey = "skeid124ka934jf4k8d2dj24jdu94";

export async function authMiddleware(req) {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.authToken;

    console.log(token);

    if (!token) {
      return NextResponse.redirect("/login");
    }

    const decoded = verify(token, secretKey);

    if (!decoded) {
      return NextResponse.redirect("/login");
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return NextResponse.redirect("/login");
  }
}
