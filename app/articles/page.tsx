"use server";

import Link from "next/link";
import Pagination from "../components/pagination";
import { API, fetchWithjwt } from "@/lib/fetchWithJwt";

export default async function ArticlesPage({ searchParams }) {
  const size = Number((await searchParams).size) || 5;
  const page = Number((await searchParams).page) || 0;

  const res = await fetchWithjwt(
    `${API}/articles/search?page=${page}&size=${size}`,
  );

  if (!res.ok) {
    return { error: "Failed to fetch articles" };
  }
  const data = await res.json();

  return (
    <div>
      <h2>Customers</h2>

      <Link href="/articles/add" className="btn btn-success mb-2">
        Add article
      </Link>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.articles.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.description}</td>
              <td>{a.price}</td>
              <td>{a.quantity}</td>
              <td>
                <Link
                  href={`/articles/edit/${a.id}`}
                  className="btn btn-warning btn-sm"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination data={data} />
    </div>
  );
}
