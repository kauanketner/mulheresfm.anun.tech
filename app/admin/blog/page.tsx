import { db } from "@/lib/data";
import AdminCrud from "@/components/admin/AdminCrud";

export const dynamic = "force-dynamic";

export default function AdminBlogPage() {
  const items = db.blog.getAll();

  return (
    <AdminCrud
      title="Blog"
      items={items}
      columns={[
        { key: "title", label: "Título" },
        { key: "category", label: "Categoria" },
        { key: "author", label: "Autor" },
        { key: "date", label: "Data" },
        { key: "published", label: "Publicado" },
      ]}
      fields={[
        { key: "title", label: "Título", type: "text", required: true },
        { key: "slug", label: "Slug (URL)", type: "text" },
        { key: "excerpt", label: "Resumo", type: "textarea" },
        { key: "content", label: "Conteúdo HTML", type: "textarea" },
        {
          key: "category",
          label: "Categoria",
          type: "select",
          options: ["Mercado", "Carreira", "Eventos", "Insights"],
          required: true,
        },
        { key: "author", label: "Autor(a)", type: "text", required: true },
        { key: "date", label: "Data de Publicação", type: "date", required: true },
        { key: "image", label: "URL da Imagem", type: "url" },
        { key: "published", label: "Publicado", type: "checkbox" },
      ]}
      apiEndpoint="/api/blog"
      emptyMessage="Nenhum post cadastrado."
    />
  );
}
