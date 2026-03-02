import { db } from "@/lib/data";
import AdminCrud from "@/components/admin/AdminCrud";

export default function AdminPatrocinadoresPage() {
  const items = db.sponsors.getAll();

  return (
    <AdminCrud
      title="Patrocinadores"
      items={items}
      columns={[
        { key: "name", label: "Nome" },
        { key: "tier", label: "Tier" },
        { key: "url", label: "Site" },
      ]}
      fields={[
        { key: "name", label: "Nome", type: "text", required: true },
        { key: "url", label: "Site", type: "url" },
        { key: "logo", label: "Logo do Patrocinador", type: "image" },
        {
          key: "tier",
          label: "Nível",
          type: "select",
          options: ["gold", "silver", "bronze"],
          required: true,
        },
      ]}
      apiEndpoint="/api/sponsors"
      emptyMessage="Nenhum patrocinador cadastrado."
    />
  );
}
