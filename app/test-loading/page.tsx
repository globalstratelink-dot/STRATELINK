import { LoadingTest } from "@/components/loading-test"
import { NOINDEX_METADATA } from "@/lib/seo"

export const metadata = NOINDEX_METADATA

export default function TestLoadingPage() {
  return <LoadingTest />
}
