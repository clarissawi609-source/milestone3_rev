"use server";

import { revalidatePath } from "next/cache";

export async function deleteProduct(id: string) {
  await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    method: "DELETE",
  });

  revalidatePath("/admin/product");
}