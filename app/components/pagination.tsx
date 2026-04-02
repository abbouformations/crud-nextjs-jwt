"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Pagination({ data }) {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 0);
  const size = Number(searchParams.get("size") || 5);

  const totalPages = Math.ceil(data.totalArticles / size);

  return (
    <div className="d-flex flex-column align-items-center mt-3">
      {/* Choix du size */}
      <div className="mb-2">
        <span className="me-2">Size :</span>

        {[5, 10, 20].map((s) => (
          <Link
            key={s}
            href={`/articles?page=0&size=${s}`}
            className={`btn btn-sm m-1 ${
              s === size ? "btn-primary" : "btn-outline-primary"
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div>
        {/* Précédent */}
        <Link
          href={`/articles?page=${page - 1}&size=${size}`}
          className={`btn btn-outline-secondary m-1 ${
            page === 0 ? "disabled" : ""
          }`}
        >
          Précédent
        </Link>

        {/* Pages */}
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i}
            href={`/articles?page=${i}&size=${size}`}
            className={`btn m-1 ${
              i === page ? "btn-primary" : "btn-outline-primary"
            }`}
          >
            {i + 1}
          </Link>
        ))}

        {/* Suivant */}
        <Link
          href={`/articles?page=${page + 1}&size=${size}`}
          className={`btn btn-outline-secondary m-1 ${
            page === totalPages - 1 ? "disabled" : ""
          }`}
        >
          Suivant
        </Link>
      </div>
    </div>
  );
}
