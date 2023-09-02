import Link from "next/link";

export default function Page() {
    return (
        <div>
            <h1>Dashboard page</h1>
            <Link href='/dashboard/user'>User</Link>
            <br />
            <Link href='/dashboard/employee'>Employee</Link>
            <br />
            <br />
            <br />
            <Link href='/'>Go back home</Link>
        </div>
    )
}