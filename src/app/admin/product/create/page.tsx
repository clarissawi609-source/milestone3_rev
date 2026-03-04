import { createProduct } from "./action";

async function getCategories() {
  const res = await fetch("https://api.escuelajs.co/api/v1/categories", {
    cache: "no-store",
  });
  return res.json();
}

export default async function CreateProductPage() {
  const categories = await getCategories();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create Product</h1>

      <form action={createProduct} className="space-y-4 max-w-md">
        <input
          name="title"
          placeholder="Title"
          className="border p-2 w-full rounded"
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="border p-2 w-full rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 w-full rounded"
          required
        />

        <select
          name="categoryId"
          className="border p-2 w-full rounded"
          required
        >
          {categories.map((cat: any) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          name="image"
          placeholder="Image URL"
          className="border p-2 w-full rounded"
          required
        />

        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}