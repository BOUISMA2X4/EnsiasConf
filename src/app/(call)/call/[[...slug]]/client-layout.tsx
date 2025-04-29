'use client';

import { HMSRoomProvider } from "@100mslive/react-sdk";

export default function ClientCallLayout({ children }: { children: React.ReactNode }) {
  return (
    <HMSRoomProvider>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 w-screen flex items-center">
          {children}
        </main>
      </div>
    </HMSRoomProvider>
  );
}
