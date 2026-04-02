import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center mt-5">
      <h1 className="display-4 fw-bold">
        Welcome to CRUD Application using "Server actions"
      </h1>

      <p className="lead mt-3">
        Application développée avec Next.js 16, Bootstrap, Actions Server et JWT
        (TP n°3)
      </p>

      <div className="mt-4">
        <Link href="/articles" className="btn btn-primary me-3">
          View articles
        </Link>

        <Link href="/articles/add" className="btn btn-success">
          Add Article
        </Link>
      </div>
    </div>
  );
}
