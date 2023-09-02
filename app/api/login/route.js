import connection from "@models/db";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import cookie from "cookie";

const secretKey = "skeid124ka934jf4k8d2dj24jdu94";

export async function POST(req) {
  if (req && req.method === "POST") {
    try {
      const { email, password } = await req.json();

      const query = "SELECT * FROM users WHERE email = $1";
      const { rows } = await connection.query(query, [email]);

      if (rows.length === 0) {
        return NextResponse.json({ message: "User not found" });
      }

      const user = rows[0];

      if (typeof password !== "string") {
        return NextResponse.json({ message: "Invalid password" });
      }

      if (password !== user.password) {
        return NextResponse.json({ message: "Incorrect password" });
      }

      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "1h",
      });

      const authTokenCookie = cookie.serialize("authToken", token, {
        httpOnly: true,
        maxAge: 3600,
        sameSite: "strict",
        path: "/",
      });

      return NextResponse.json(
        { token },
        { headers: { "Set-Cookie": authTokenCookie } }
      );
    } catch (error) {
      console.error("Login error:", error);
      NextResponse.json({ message: "Internal server error" });
    }
  } else {
    return NextResponse.json({ message: "Method not allowed" });
  }
}
