import connection from "@models/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  if (req.method === "GET") {
    try {
      const users = await connection.query("SELECT * FROM employees");
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
      const { name, email, role, startdate } = await req.body;
      const photo = req.files.photo;

      if (!photo || !photo.type.startsWith("image/jpeg")) {
        return NextResponse.json(
          { message: "Invalid file format. Please upload a jpg/jpeg image." },
          { status: 400 }
        );
      }

      if (photo.size > 300000) {
        return NextResponse.json(
          { message: "File size exceeds the limit (300kb)." },
          { status: 400 }
        );
      }

      await connection.query(
        "INSERT INTO employees (name, email, role, startdate, photo) VALUES ($1, $2, $3, $4, $5)",
        [name, email, role, startdate]
      );

      return NextResponse.json({ message: "Employee created successfully" });
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
