"use client";

import { selectIsConnectedToRoom, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import Cookies from "js-cookie";
import React from "react";
import CallFooter from "~/components/call/call-footer";
import Conference from "~/components/call/conference";
import { useParams, useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { type RoomCodeResponse } from "~/types/types";
import { extractId } from "~/lib/extract-id";
import { useToast } from "~/components/ui/use-toast";

export default function CallPage() {
  const params = useParams();
  const router = useRouter();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const { toast } = useToast();
  const actions = useHMSActions();

  const roomName = Cookies.get("room-name");
  const roomId = Cookies.get("room-id");
  const unAuthUsername = Cookies.get("username");

  const [isJoining, setIsJoining] = React.useState(true);

  const joinCall = React.useCallback(async () => {
    if (!roomId) {
      console.error("Room id is not defined");
      return;
    }

    try {
      const roomCodeResponse = await fetch(`/api/call/code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          callName: roomName ? roomName : params.slug,
        }),
      });

      if (roomCodeResponse?.ok) {
        const codeResponse: RoomCodeResponse = await roomCodeResponse.json();
        const roomCode = codeResponse.code;
        const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });
        const session = await getSession();

        if (session && session.user.name) {
          const userName = session.user.name;
          await hmsActions.join({ userName, authToken });
        } else if (!session && unAuthUsername) {
          await hmsActions.join({ userName: unAuthUsername, authToken });
        } else {
          toast({
            title: "Something went wrong.",
            description: "This call cannot be joined. Please try again.",
            variant: "destructive",
          });
          router.replace("/calls");
        }
      } else {
        throw new Error("Room code response not OK");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong.",
        description: "This call cannot be joined. Please try again.",
        variant: "destructive",
      });
      router.replace("/calls");
    } finally {
      setIsJoining(false);
    }
  }, [hmsActions, toast, params.slug, router, roomName, roomId, unAuthUsername]);

  const leaveCall = React.useCallback(async () => {
    const response = await fetch(`/api/call/leave`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        callName: roomName ? roomName : extractId(params.slug as string),
        roomId: roomId,
      }),
    });

    if (!response.ok) {
      toast({
        title: "Something went wrong.",
        description: "Your call cannot be left. Please try again.",
        variant: "destructive",
      });
    }

    await actions.leave();
  }, [roomName, params.slug, roomId, actions, toast]);

  React.useEffect(() => {
    void joinCall();
  }, [joinCall]);

  React.useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        void leaveCall();
      }
    };
  }, [isConnected, leaveCall]);

  return (
    <section className="flex flex-col w-full h-screen overflow-hidden bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      {/* Header Modern */}
      <header className="p-4 sm:p-6 bg-black/30 backdrop-blur-md shadow-lg flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">Live Call Room</h1>
        <span className="text-sm text-gray-300">Powered by 100ms</span>
      </header>

      <div className="flex-1 flex items-center justify-center relative p-6">
        {/* Loading */}
        {isJoining && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 rounded-xl">
            <div className="animate-spin h-12 w-12 rounded-full border-t-4 border-b-4 border-purple-500"></div>
          </div>
        )}

        {/* Zone principale de conférence */}
        <div className="w-full h-full max-w-7xl rounded-2xl bg-black/30 border border-purple-700 shadow-2xl overflow-hidden">
          <Conference />
        </div>
      </div>

      {/* Footer Modern */}
      <footer className="bg-black/20 backdrop-blur-md border-t border-purple-700 px-4 py-3 shadow-md">
        <CallFooter />
      </footer>
    </section>
  );
}
