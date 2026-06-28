import { CatalogueAdminPanel } from "@/components/admin/catalogue-admin"
import { NOINDEX_METADATA } from "@/lib/seo"

export const metadata = {
  title: "Administration",
  ...NOINDEX_METADATA,
}

export default function AdminAbdelhamidPage() {
  return <CatalogueAdminPanel />
}
