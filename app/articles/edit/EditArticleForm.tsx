"use client";

import { useActionState } from "react";
import { useServerMessage } from "@/app/hooks/useServerMessage";
import { updateArticle } from "../actions";

type Article = {
  id: string;
  description: string;
  price: number;
  quantity: number;
};

const initialState = {
  error: null,
  success: null,
};

export default function EditArticleForm({ article }: { article: Article }) {
  const updateArticleWithId = updateArticle.bind(null, article.id);

  const [state, formAction, isPending] = useActionState(
    updateArticleWithId,
    initialState,
  );

  useServerMessage(state);

  return (
    <form action={formAction}>
      <h2>Edit article</h2>

      <div className="mb-3">
        <label>Description</label>
        <input
          name="description"
          defaultValue={article.description}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Price</label>
        <input
          type="number"
          name="price"
          defaultValue={article.price}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          defaultValue={article.quantity}
          className="form-control"
        />
      </div>

      <button className="btn btn-success" disabled={isPending}>
        {isPending ? "Updating..." : "Update"}
      </button>
    </form>
  );
}
