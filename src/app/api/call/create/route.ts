import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { env } from "~/env.mjs";
import { authOptions } from "~/server/auth";
import { cookies } from "next/headers";
import { generateManagementToken } from "~/server/management-token";
import { createClient } from "@supabase/supabase-js";

const callCreateSchema = z.object({
  callName: z.string().uuid(),
});
type Room = {
    id: string;
  };
  

interface CallCreateBody {
  callName: string;
}

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;
    if (!user || !user.id || !user.name || !user.email) {
      throw new Error("You must be logged in to create a call");
    }

    const json: CallCreateBody = await req.json();
    const body = callCreateSchema.parse(json);

    const roomId = await createRoom(body.callName);

    // Vérifier si l'appel existe déjà
    const { data: existingCall, error: callCheckError } = await supabase
      .from("call")
      .select("id")
      .eq("id", roomId)
      .single();

    if (existingCall) {
      throw new Error("A call with this ID already exists");
    }

    const inviteLink = `${env.NEXT_PUBLIC_APP_URL}/call/${body.callName}`;

    const { error: createCallError } = await supabase.from("call").insert({
      id: roomId,
      name: body.callName,
      userId: user.id,
      title: `${user.name}'s Call`,
      startTime: new Date().toISOString(),
      status: "created",
      endTime: null,
      inviteLink,
    });

    if (createCallError) throw createCallError;

    const { error: participantError } = await supabase.from("participant").insert({
      userId: user.id,
      name: user.name,
      email: user.email,
      callName: body.callName,
      role: "host",
      status: "joined",
      callId: roomId,
      startTime: new Date().toISOString(),
    });

    if (participantError) throw participantError;

    cookies().set("room-id", roomId);
    cookies().set("room-name", body.callName);

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 500 });
  }
}

async function createRoom(name: string) {
  const managementToken = await generateManagementToken();

  const response = await fetch(`${env.TOKEN_ENDPOINT}/rooms`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${managementToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      template_id: env.TEMPLATE_ID,
      region: "us",
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const { id }: Room = await response.json();
  return id;
}
