"use server";

import Link from "next/link";
import { hasRole, isLogged, logout } from "../login/actions";

export default async function Navbar() {
  let isAdmin = await hasRole("ROLE_ADMIN");
  let logedIn = await isLogged();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" href="/">
          CRUD Demo with Next.js using "Server Action"
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" href="/articles">
                Articles
              </Link>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" href="/articles/add">
                  Add Article
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" href="/about">
                About
              </Link>
            </li>

            {logedIn && (
              <div className="ms-auto">
                <form action={logout}>
                  <button
                    type="submit"
                    className="nav-link btn btn-link"
                    style={{ textDecoration: "none" }}
                  >
                    Logout
                  </button>
                </form>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
