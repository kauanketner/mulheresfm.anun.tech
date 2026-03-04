import { db } from "@/lib/data";
import AdminCrud from "@/components/admin/AdminCrud";

export const dynamic = "force-dynamic";

export default function AdminMidiaPage() {
  const items = db.media.getAll();

  return (
    <AdminCrud
      title="Na Mídia"
      items={items}
      columns={[
        { key: "outlet", label: "Veículo" },
        { key: "title", label: "Título" },
        { key: "type", label: "Tipo" },
        { key: "date", label: "Data" },
      ]}
      fields={[
        { key: "outlet", label: "Veículo (ex: Gazeta do Povo)", type: "text", required: true },
        { key: "title", label: "Título da Matéria", type: "text", required: true },
        { key: "url", label: "URL da Matéria", type: "url" },
        { key: "date", label: "Data", type: "date", required: true },
        {
          key: "type",
          label: "Tipo",
          type: "select",
          options: ["magazine", "podcast", "tv", "blog"],
          required: true,
        },
        { key: "image", label: "Foto de Capa", type: "image" },
        { key: "outletLogo", label: "Logo do Veículo", type: "image" },
      ]}
      apiEndpoint="/api/media"
      emptyMessage="Nenhuma cobertura de mídia cadastrada."
    />
  );
}
