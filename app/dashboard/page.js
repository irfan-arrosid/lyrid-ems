import Link from "next/link";

export default function Page() {
  return (
    <div className="container">
      <h1 className="text-light">Dashboard page</h1>
      <div className="d-flex gap-3 mb-4">
        <Link href="/dashboard/user">User</Link>
        <Link href="/dashboard/employee">Employee</Link>
        <Link href="/">Log out</Link>
      </div>
    </div>
  );
}
