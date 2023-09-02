import Link from "next/link";

export const metadata = {
  title: "Lyrid EMS",
  description: "Employee Management System by Next.js",
};

export default function Home() {
  return (
    <section className="container">
      <h1>Home</h1>
      <Link className="btn btn-outline-secondary" href="/login">
        Login
      </Link>
      <br />
      <Link className="btn btn-primary" href="/signup">
        Sign up
      </Link>
    </section>
  );
}
