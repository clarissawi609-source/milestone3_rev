import Search from "./search";
// import { deleteUser } from "./actions";
import Link from "next/link";

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
};

const LIMIT = 15;

async function getUsers(page: number) {
  const offset = (page - 1) * LIMIT;

  const res = await fetch(
    `https://api.escuelajs.co/api/v1/users?offset=${offset}&limit=${LIMIT}`,
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("Failed fetch");

  return res.json();
}

export default async function UsersPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const users = await getUsers(page);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">User Management</h1>

      <Search />

      <table className="w-full border rounded-lg">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user: any) => (
            <tr key={user.id} className="border-b">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>

              {/* <td className="p-3 text-right space-x-3">
                <Link href={`/admin/users/${user.id}`} className="underline">
                  Edit
                </Link>

                <form
                  action={deleteUser.bind(null, user.id)}
                  className="inline"
                >
                  <button className="text-red-500 underline">Delete</button>
                </form>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-6">
        <Link
          href={`/admin/users?page=${page - 1}`}
          className={page <= 1 ? "opacity-40 pointer-events-none" : ""}
        >
          Previous
        </Link>

        <span>Page {page}</span>

        <Link href={`/admin/users?page=${page + 1}`}>Next</Link>
      </div>
    </div>
  );
}