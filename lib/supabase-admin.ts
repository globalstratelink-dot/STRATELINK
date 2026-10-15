import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let client: SupabaseClient | null = null

export function isSupabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}

export function supabaseProjectUrl() {
  return (process.env.SUPABASE_URL || "").trim().replace(/\/+$/, "")
}

/** Next.js patches fetch; storage calls then fail with "fetch failed" unless cache is disabled. */
export function supabaseFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const nextInit: RequestInit & { duplex?: "half" } = {
    ...init,
    cache: "no-store",
  }
  if (nextInit.body != null) nextInit.duplex = "half"
  return fetch(input, nextInit)
}

export function getSupabaseAdmin() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured")
  }

  if (!client) {
    client = createClient(supabaseProjectUrl(), process.env.SUPABASE_SERVICE_ROLE_KEY!.trim(), {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: supabaseFetch },
    })
  }

  return client
}
