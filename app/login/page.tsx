"use client";
import { useActionState } from "react";
import { loginAction } from "./actions";
import { useServerMessage } from "../hooks/useServerMessage";
const initialState = {
  error: null,
  success: null,
};
export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, initialState);
  useServerMessage(state);
  return (
    <>
      <form action={formAction} className="card p-4">
        <h3>Login</h3>

        <input
          name="username"
          className="form-control mb-2"
          placeholder="Username"
        />

        <input name="password" type="password" className="form-control mb-2" />

        <button className="btn btn-primary">Login</button>
      </form>
    </>
  );
}
