import Link from "next/link";
import Search from "./search";
import { deleteProduct } from "./action";

type Props = {
  searchParams: {
    page?: string;
    search?: string;
  };
};

const LIMIT = 15;

async function getproduct(page: number, search: string) {
  const offset = (page - 1) * LIMIT;

  try {
    const res = await fetch(
      `https://api.escuelajs.co/api/v1/products?title=${search}&offset=${offset}&limit=${LIMIT}`,
      { cache: "no-store" }
    );

    if (!res.ok) return [];

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ProductPage({ searchParams }: Props) {
  const page = Math.max(1, Number(searchParams.page) || 1);
  const search = searchParams.search || "";

  const product = await getproduct(page, search);

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Product Management</h1>

        <Link
          href="/admin/product/create"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Create Product
        </Link>
      </div>

      <Search />

      <table className="w-full border rounded-lg">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {product.map((product: any) => (
            <tr key={product.id} className="border-b">
              <td className="p-3">{product.title}</td>
              <td className="p-3">${product.price}</td>
              <td className="p-3">{product.category?.name}</td>

              <td className="p-3 text-right space-x-3">
                <Link
                  href={`/admin/product/${product.id}`}
                  className="underline"
                >
                  Edit
                </Link>

                <form action={deleteProduct.bind(null, product.id)}>
                  <button type="submit" className="text-red-500 cursor-pointer">
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-6">
        <Link
          href={`/admin/product?page=${page - 1}&search=${search}`}
          className={page <= 1 ? "opacity-40 pointer-events-none" : ""}
        >
          Previous
        </Link>

        <span>Page {page}</span>

        <Link href={`/admin/product?page=${page + 1}&search=${search}`}>
          Next
        </Link>
      </div>
    </div>
  );
}