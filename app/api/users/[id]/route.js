import connection from "@models/db";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  if (req.method === "DELETE") {
    try {
      await connection.query("DELETE FROM users WHERE id = $1", [params.id]);

      return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
      return NextResponse.json(
        { message: error.message },
        {
          status: 500,
        }
      );
    }
  }
}

export async function PUT(req, { params }) {
  if (req.method === "PUT") {
    try {
      const { name, email, password } = await req.json();
      await connection.query(
        "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4",
        [name, email, password, params.id]
      );

      return NextResponse.json({ message: "User updated successfully" });
    } catch (error) {
      return NextResponse.json(
        { message: error.message },
        {
          status: 500,
        }
      );
    }
  }
}
