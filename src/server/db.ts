// app/api/users/route.ts
import { supabase } from "~/lib/supabase"

export async function GET() {
  const { data, error } = await supabase.from("users").select("*")

  if (error) {
    console.error("Erreur Supabase :", error)
    return new Response("Erreur lors de la récupération des utilisateurs", { status: 500 })
  }

  return Response.json(data)
}
