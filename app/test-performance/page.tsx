import { PerformanceTest } from "@/components/performance-test"
import { NOINDEX_METADATA } from "@/lib/seo"

export const metadata = NOINDEX_METADATA

export default function TestPerformancePage() {
  return <PerformanceTest />
}
