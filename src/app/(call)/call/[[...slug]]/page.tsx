"use client";

import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
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
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const { toast } = useToast();

  const roomName = Cookies.get("room-name");
  const roomId = Cookies.get("room-id");
  const unAuthUsername = Cookies.get("username");

  const [isJoining, setIsJoining] = React.useState(true);
  const [ready, setReady] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // 🎥 Initialisation de la caméra (sans clignotement)
  React.useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setReady(true);
          };
        }
      } catch (error) {
        console.error("Erreur caméra :", error);
      }
    };
    initCamera();
  }, []);

  // 🚀 Connexion à l'appel
  const joinCall = React.useCallback(async () => {
    if (!roomId) {
      console.error("Room id is not defined");
      return;
    }

    try {
      const roomCodeResponse = await fetch(`/api/call/code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          callName: roomName ?? params.slug,
        }),
      });

      if (!roomCodeResponse.ok) throw new Error("Room code fetch failed");

      const { code: roomCode }: RoomCodeResponse = await roomCodeResponse.json();
      const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });
      const session = await getSession();

      const joinOptions = {
        authToken,
        settings: {
          isAudioMuted: false,
          isVideoMuted: false,
        },
      };

      if (session?.user?.name) {
        await hmsActions.join({ ...joinOptions, userName: session.user.name });
      } else if (unAuthUsername) {
        await hmsActions.join({ ...joinOptions, userName: unAuthUsername });
      } else {
        toast({
          title: "Erreur",
          description: "Impossible de rejoindre l'appel.",
          variant: "destructive",
        });
        router.replace("/calls");
      }
    } catch (error) {
      console.error("Join error:", error);
      toast({
        title: "Erreur",
        description: "Impossible de rejoindre l'appel.",
        variant: "destructive",
      });
      router.replace("/calls");
    } finally {
      setIsJoining(false);
    }
  }, [roomId, hmsActions, roomName, params.slug, unAuthUsername, router, toast]);

  // 🚪 Quitter l'appel
  const leaveCall = React.useCallback(async () => {
    try {
      const response = await fetch(`/api/call/leave`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          callName: roomName ?? extractId(params.slug as string),
          roomId,
        }),
      });

      if (!response.ok) {
        toast({
          title: "Erreur",
          description: "Échec lors de la déconnexion.",
          variant: "destructive",
        });
      }

      await hmsActions.leave();
    } catch (error) {
      console.error("Leave error:", error);
    }
  }, [roomId, roomName, params.slug, hmsActions, toast]);

  // 🧩 Lancement automatique de l'appel
  React.useEffect(() => {
    void joinCall();
  }, [joinCall]);

  // 🧼 Nettoyage à la fermeture
  React.useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        void leaveCall();
      }
    };
  }, [isConnected, leaveCall]);

  return (
    <section className="relative w-full h-screen overflow-hidden text-white">
      {/* 🎥 Caméra en arrière-plan */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className={`fixed top-0 left-0 w-screen h-screen object-cover z-0 transition-opacity duration-500 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* 📦 Contenu de l'appel */}
      <div className="absolute inset-0 flex flex-col z-10">
        {/* 🔝 En-tête */}
        <header className="p-4 sm:p-6 bg-black/30 backdrop-blur-md shadow-md flex justify-between items-center">
          <h1 className="text-xl font-bold">Salle de conférence</h1>
          <span className="text-sm text-gray-300">Propulsé par 100ms</span>
        </header>

        {/* 📞 Zone principale */}
        <main className="flex-1 flex items-center justify-center relative p-4 sm:p-6">
          {/* ⏳ Chargement */}
          {isJoining && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="h-12 w-12 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
            </div>
          )}

          {/* 🧑‍💻 Composant de conférence */}
          <div className="w-full h-full max-w-7xl rounded-2xl bg-black/30 border border-purple-600 shadow-2xl overflow-hidden">
            <Conference />
          </div>
        </main>

        {/* 🔚 Pied de page */}
        <footer className="bg-black/20 backdrop-blur-md border-t border-purple-700 px-4 py-3 shadow-md">
          <CallFooter />
        </footer>
      </div>
    </section>
  );
}
