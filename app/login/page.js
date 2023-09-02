import Link from "next/link";

export default function Page() {
  return (
    <div className="container">
      <div className="card w-25 p-5 position-absolute top-50 start-50 translate-middle">
        <h1 className="mb-3">Login page</h1>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <Link className="btn btn-primary mt-4" href="/dashboard">
          Login
        </Link>
        <div className="mt-3">
          Dont have an account? <Link href="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
