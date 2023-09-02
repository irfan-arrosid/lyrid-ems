"use client";

import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Sign-up failed");
      }

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Sign-up error:", error);
    }
  };

  return (
    <div className="container">
      <div className="card w-25 p-5 position-absolute top-50 start-50 translate-middle">
        <h1 className="mb-3">Sign up page</h1>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label for="floatingInput">Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="floatingInput">Email</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label for="floatingPassword">Password</label>
        </div>
        <button
          className="btn btn-primary mt-4"
          type="submit"
          onClick={handleSignUp}
        >
          Sign up
        </button>
        <div className="mt-3">
          Already have an account? <Link href="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
