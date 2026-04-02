import EditArticleForm from "../EditArticleForm";
import { error } from "@/lib/ActionResponse";
import { API, fetchWithjwt } from "@/lib/fetchWithJwt";

export default async function Page({ params }: any) {
  const { id } = await params;

  const res = await fetchWithjwt(`${API}/articles/${id}`);
  if (!res.ok) {
    return error("Erreur lors de la récupération de l'article");
  }
  const article = await res.json();

  return <EditArticleForm article={article} />;
}
