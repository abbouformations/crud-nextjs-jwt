"use server";

import { revalidatePath } from "next/cache";
import { ActionResponse, error, success } from "@/lib/ActionResponse";
import { API, fetchWithjwt } from "@/lib/fetchWithJwt";

export async function createArticle(prevState: any, formData: FormData) {
  try {
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const quantity = Number(formData.get("quantity"));

    if (!description || isNaN(price) || isNaN(quantity)) {
      return error("Veuillez remplir correctement les champs");
    }

    const res = await fetchWithjwt(`${API}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description, price, quantity }),
    });
    const msg = await res.json();
    if (!res.ok) {
      return error(msg.message || "Erreur lors de la création");
    }
    revalidatePath("/articles");
    return success(msg.message);
  } catch (e) {
    return error("Erreur serveur");
  }
}

export async function updateArticle(
  id: number,
  prevState: any,
  formData: FormData,
): Promise<ActionResponse> {
  const article = {
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    quantity: Number(formData.get("quantity")),
  };
  try {
    const res = await fetchWithjwt(`${API}/articles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });
    const msg = await res.json();
    if (!res.ok) {
      return error(msg.message || "Erreur lors de la modification");
    }
    revalidatePath("/articles");
    return success(msg.message);
  } catch (e) {
    return error("Erreur serveur");
  }
}
