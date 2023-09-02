import connection from "@models/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  if (req.method === "GET") {
    try {
      const users = await connection.query("SELECT * FROM users");
      return NextResponse.json(users.rows);
    } catch (error) {
      return NextResponse.json(
        { message: error.message },
        {
          status: 500,
        }
      );
    }
  } else {
    return NextResponse.json({ message: "Method not allowed" });
  }
}

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { name, email, password } = await req.json();

      await connection.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
        [name, email, password]
      );

      return NextResponse.json({ name, email, password });
    } catch (error) {
      return NextResponse.json(
        { message: error.message },
        {
          status: 500,
        }
      );
    }
  } else {
    return NextResponse.json({ message: "Method not allowed" });
  }
}
