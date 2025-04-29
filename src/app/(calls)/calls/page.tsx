import { type Metadata } from "next";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Icons } from "~/components/ui/icons";
import { formatDate } from "~/lib/date";
import { getCurrentUser } from "~/lib/session";
import JoinCallDialog from "~/components/call/join-call-dialog";
import InviteParticipantsDialog from "~/components/call/invite-participants-dialog";
import { type CardProps } from "~/components/layout/card-shell";
import CreateCallCard from "~/components/call/create-call-card";
import { Button } from "~/components/ui/button";

export const metadata: Metadata = {
  title: "EnsiasConference - Conference Hub",
  description:
    "Access your Conference Calls Hub to manage and join your video calls seamlessly.",
};

const cardsData: CardProps[] = [
  {
    title: "Create a call",
    description:
      "Create a call and invite others to join in conversation, discussion, or collaboration.",
    icon: <Icons.video width={24} height={24} />,
    buttonText: "Create",
    loadingIcon: <Icons.spinner width={14} height={14} />,
    buttonIcon: <Icons.add className="ml-2" width={16} height={16} />,
  },
  {
    title: "Join a call",
    description:
      "Join a call by participating in a conversation, discussion, or collaboration.",
    icon: <Icons.add width={24} height={24} />,
    buttonText: "Join",
    loadingIcon: <Icons.spinner width={14} height={14} />,
    buttonIcon: <Icons.add className="ml-2" width={16} height={16} />,
  },
  {
    title: "Invite Participants",
    description:
      "Invite your friends or participants to join your call and engage in a conversation.",
    icon: <Icons.invite width={24} height={24} />,
    buttonText: "Invite",
    loadingIcon: <Icons.spinner width={14} height={14} />,
    buttonIcon: <Icons.add className="ml-2" width={16} height={16} />,
  },
];

export default async function CallsPage() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* HERO */}
      <section className="container max-w-7xl mx-auto flex flex-col items-center justify-center py-20 text-center space-y-8 animate-fadeIn">
        <Badge variant="secondary" className="px-4 py-1 text-base">
          {formatDate(new Date())}
        </Badge>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent">
          Welcome back, {user?.name as string}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          Manage your conference calls easily and collaborate seamlessly.
        </p>
      </section>

      {/* ACTION CARDS */}
      <section className="container max-w-7xl mx-auto py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
          {/* Create Call */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <CreateCallCard {...cardsData[0]} />
          </div>

          {/* Join Call */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <JoinCallDialog {...cardsData[1]} />
          </div>

          {/* Invite Participants */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <InviteParticipantsDialog {...cardsData[2]} />
          </div>
        </div>

        {/* VIEW HISTORY BUTTON */}
        <div className="flex justify-center mt-16">
          <Link
            href={{
              pathname: "/calls/history",
              query: { page: 1, per_page: 10 },
            }}
          >
            <Button
              size="lg"
              className="px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl transition-all bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 text-white flex items-center gap-2"
            >
              View Call History
              <Icons.arrow
                width={18}
                height={18}
                className="rotate-90"
              />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
