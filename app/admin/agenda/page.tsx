import { db } from "@/lib/data";
import AdminCrud from "@/components/admin/AdminCrud";

export default function AdminAgendaPage() {
  const items = db.agenda.getAll();

  return (
    <AdminCrud
      title="Agenda"
      items={items}
      columns={[
        { key: "title", label: "Título" },
        { key: "date", label: "Data" },
        { key: "time", label: "Hora" },
        { key: "location", label: "Local" },
        { key: "status", label: "Status" },
      ]}
      fields={[
        { key: "title", label: "Título", type: "text", required: true },
        { key: "date", label: "Data", type: "date", required: true },
        { key: "time", label: "Horário", type: "time", required: true },
        { key: "location", label: "Local", type: "text", required: true },
        { key: "address", label: "Endereço completo", type: "text" },
        { key: "description", label: "Descrição", type: "textarea" },
        { key: "registrationUrl", label: "URL de Inscrição", type: "url" },
        {
          key: "status",
          label: "Status",
          type: "select",
          options: ["upcoming", "past"],
          required: true,
        },
      ]}
      apiEndpoint="/api/agenda"
      emptyMessage="Nenhum evento na agenda."
    />
  );
}
