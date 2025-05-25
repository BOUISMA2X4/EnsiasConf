import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { env } from "~/env.mjs";
import { authOptions } from "~/server/auth";
import { generateManagementToken } from "~/server/management-token";
import { supabase } from "~/lib/supabase"; // ← Ton client Supabase

// Validation Zod pour le nom d’appel
const roomCodeSchema = z.object({
  callName: z.string().min(1),
});

type RoomCodeBody = z.infer<typeof roomCodeSchema>;

type RoomCode = {
  code: string;
};

export async function POST(req: Request) {
  try {
    // Authentifier l'utilisateur
    const session = await getServerSession(authOptions);
    const json: RoomCodeBody = await req.json();
    const body = roomCodeSchema.parse(json);

    let role = "guest";
    let userId: string | undefined = undefined;

    if (session?.user?.id) {
      userId = session.user.id;

      const { data: participant, error: participantError } = await supabase
        .from("participant")
        .select("role")
        .eq("id", userId)
        .single();

      if (participantError) {
        console.error("Erreur Supabase participant:", participantError.message);
      }

      if (participant?.role) {
        role = participant.role;
      }
    }

    // Chercher l’appel actif dans la base de données
    const { data: call, error: callError } = await supabase
      .from("call")
      .select("id, status")
      .eq("name", body.callName)
      .eq("status", "created")
      .single();

    if (callError || !call || call.status === "ended") {
      return new Response("Call not found or ended", { status: 404 });
    }

    const roomId = call.id;

    // Générer un token d'accès API vers ton fournisseur (ex: 100ms)
    const token = await generateManagementToken();

    const response = await fetch(
      `${env.TOKEN_ENDPOINT}/room-codes/room/${roomId}/role/${role}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const msg = await response.text();
      console.error(`API error: ${msg}`);
      return new Response("Failed to get room code", { status: response.status });
    }

    const data = (await response.json()) as RoomCode;

    return new Response(JSON.stringify({ code: data.code }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Internal Server Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
