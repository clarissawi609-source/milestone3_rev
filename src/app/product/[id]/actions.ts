// GET old data
// MERGE
// PUT full payload
// REVALIDATE
// REDIRECT

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProduct(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;
  const categoryId = Number(formData.get("categoryId"));
  const image = formData.get("image") as string;

  await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      price,
      description,
      categoryId,
      images: [image],
    }),
  });

  // const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
  //   method: "PUT",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     title,
  //     price,
  //     description,
  //     categoryId,
  //     images: [image],
  //   }),
  // });
  // const result = await res.json();
  // console.log("UPDATED DATA:", result);

  revalidatePath("/admin/product");
  redirect("/admin/product");
}