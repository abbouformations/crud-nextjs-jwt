"use client";

import { createArticle } from "../actions";
import { useActionState } from "react";
import { useServerMessage } from "@/app/hooks/useServerMessage";

const initialState = {
  error: null,
  success: null,
};

export default function AddArticleForm() {
  const [state, formAction] = useActionState(createArticle, initialState);
  useServerMessage(state);
  return (
    <form action={formAction} className="card p-3">
      <h3>New Article</h3>

      <input
        name="description"
        className="form-control mb-2"
        placeholder="Description"
      />

      <input name="price" className="form-control mb-2" placeholder="Price" />
      <input
        name="quantity"
        className="form-control mb-2"
        placeholder="Quantity"
      />

      <button className="btn btn-primary">Save</button>
    </form>
  );
}
