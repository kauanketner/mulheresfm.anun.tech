import { db } from "@/lib/data";
import AdminCrud from "@/components/admin/AdminCrud";

export default function AdminEventosPage() {
  const items = db.events.getAll();

  return (
    <AdminCrud
      title="Eventos Anteriores"
      items={items}
      columns={[
        { key: "title", label: "Título" },
        { key: "date", label: "Data" },
        { key: "city", label: "Cidade" },
        { key: "location", label: "Local" },
        { key: "year", label: "Ano" },
        { key: "images", label: "Fotos" },
      ]}
      fields={[
        { key: "title", label: "Título", type: "text", required: true },
        { key: "date", label: "Data", type: "date", required: true },
        { key: "year", label: "Ano", type: "text", required: true },
        { key: "location", label: "Local", type: "text", required: true },
        { key: "city", label: "Cidade", type: "text", required: true },
        { key: "description", label: "Descrição", type: "textarea" },
        { key: "images", label: "Fotos do Evento", type: "images" },
      ]}
      apiEndpoint="/api/events"
      emptyMessage="Nenhum evento cadastrado."
    />
  );
}
