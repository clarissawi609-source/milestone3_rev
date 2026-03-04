import { updateProduct } from "./actions";

type Props = {
  params: { id: string };
};

async function getProduct(id: string) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    cache: "no-store",
  });
  return res.json();
}

async function getCategories() {
  const res = await fetch("https://api.escuelajs.co/api/v1/categories", {
    cache: "no-store",
  });
  return res.json();
}

export default async function EditProductPage({ params }: Props) {
  const product = await getProduct(params.id);
  const categories = await getCategories();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <form
        action={updateProduct.bind(null, params.id)}
        className="space-y-4 max-w-md"
      >
        <input
          name="title"
          placeholder="Title"
          defaultValue={product.title}
          className="border p-2 w-full rounded"
          required
        />

        <input
          name="price"
          placeholder="Price"
          type="number"
          defaultValue={product.price}
          className="border p-2 w-full rounded"
          required
        />

        <textarea
          name="description"
          defaultValue={product.description}
          className="border p-2 w-full rounded"
          required
        />

        <select
          name="categoryId"
          defaultValue={product.category?.id}
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
          defaultValue={product.images?.[0]}
          className="border p-2 w-full rounded"
          required
        />

        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}