"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const title = formData.get("title") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;
  const categoryId = Number(formData.get("categoryId"));
  const image = formData.get("image") as string;

  await fetch("https://api.escuelajs.co/api/v1/products/", {
    method: "POST",
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

  revalidatePath("/admin/product");
  redirect("/admin/product");
}