"use client"

import { SessionProvider } from "next-auth/react"
import { createClient } from "@supabase/supabase-js"
import { createContext, useContext } from "react"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const SupabaseContext = createContext(supabase)

export const useSupabase = () => useContext(SupabaseContext)

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SupabaseContext.Provider value={supabase}>
        {children}
      </SupabaseContext.Provider>
    </SessionProvider>
  )
}