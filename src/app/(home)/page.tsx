"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

type Tool = {
  name: string;
  icon: React.ReactNode;
};

type Features = {
  description: string;
} & Tool;

const tools: Tool[] = [
  {
    name: "Live Streaming",
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10 fill-current text-pink-500">
        <path d="M12 5a7 7 0 1 1-7 7 7 7 0 0 1 7-7zm0-2a9 9 0 1 0 9 9A9 9 0 0 0 12 3zm1 13h-2v-2h2zm0-4h-2V7h2z" />
      </svg>
    ),
  },
  {
    name: "Real-Time Chat",
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10 fill-current text-blue-500">
        <path d="M2 21l1.5-4.5C2.5 15.5 2 14 2 12c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10c-1.6 0-3.1-.4-4.5-1.1L2 21z" />
      </svg>
    ),
  },
  {
    name: "User Authentication",
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10 fill-current text-green-500">
        <path d="M12 2a7 7 0 0 1 7 7c0 3.2-2 5.9-5 6.8v1.2h2v2h-6v-2h2v-1.2c-3-.9-5-3.6-5-6.8a7 7 0 0 1 7-7z" />
      </svg>
    ),
  },
  {
    name: "Custom Themes",
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10 fill-current text-purple-500">
        <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zM7 14h2v2H7zm4-4h2v6h-2zm4-4h2v10h-2z" />
      </svg>
    ),
  },
  {
    name: "Accessibility",
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10 fill-current text-yellow-500">
        <path d="M12 2a2 2 0 1 0 2 2 2 2 0 0 0-2-2zm1 4h-2l-6 4 2 2 4-2v10h2V10l4 2 2-2z" />
      </svg>
    ),
  },
  {
    name: "Cloud Scalability",
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10 fill-current text-cyan-500">
        <path d="M6 19h12a4 4 0 0 0 0-8h-.35A6 6 0 0 0 6.1 9a4.5 4.5 0 0 0-.1 9z" />
      </svg>
    ),
  },
  {
    name: "Secure Payments",
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10 fill-current text-rose-500">
        <path d="M2 7v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7zm2 0h16v2H4zm0 4h5v2H4z" />
      </svg>
    ),
  },
];

const features: Features[] = [
  {
    name: "Speaker Invitations",
    description: "Invite easily guest speakers with secured links.",
    icon: (
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-pink-300 to-pink-500 shadow-md">
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 stroke-[1.5] stroke-white fill-none"
        >
          <path d="M16 12H8m0 0l4 4m-4-4l4-4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
  },
  {
    name: "Live Presentation Sharing",
    description: "Hosts can share slides or demos instantly.",
    icon: (
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-blue-300 to-blue-500 shadow-md">
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 stroke-[1.5] stroke-white fill-none"
        >
          <rect x="3" y="4" width="18" height="12" rx="2" ry="2" />
          <path d="M8 20h8m-4-4v4" />
        </svg>
      </div>
    ),
  },
  {
    name: "Session Recap History",
    description: "Replay, notes, highlights - all in one place.",
    icon: (
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-purple-300 to-purple-500 shadow-md">
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 stroke-[1.5] stroke-white fill-none"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l3 3" />
        </svg>
      </div>
    ),
  },
];

export default function IndexPage() {
  return (
    <>
      {/* HERO */}
      <section className="container mx-auto max-w-7xl px-6 py-32 text-center space-y-12">
        <div className="space-y-6 animate-fadeIn">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-gradient-to-r from-red-600 via-rose-500 to-pink-400 bg-clip-text text-transparent">
            ENSIAS Conference
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Open-source platform for your professional & community conferences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button
                size="lg"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-lg hover:shadow-2xl transition-all"
              >
                Join the Conference
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl shadow-2xl transition-transform hover:scale-105">
          <Image
            src="/allo-image.png"
            width={1200}
            height={800}
            alt="Hero Image"
            className="w-full object-cover"
          />
        </div>
      </section>

      {/* TOOLS */}
      <section className="container mx-auto max-w-7xl px-6 py-24">
        <div className="text-center space-y-8">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built around key elements of a successful conference:
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-4 bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-4xl">{tool.icon}</div>
                <h3 className="text-lg font-semibold">{tool.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto max-w-7xl px-6 py-24">
        <div className="text-center space-y-10">
          <Badge variant="secondary" className="px-4 py-1 text-sm">
            Fonctionnalités
          </Badge>
          <h2 className="text-4xl font-bold leading-tight">
            Une communication optimale
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful tools for effortless communication, collaboration and hosting.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                {feature.icon}
                <h3 className="text-lg font-semibold mt-4">{feature.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto max-w-7xl px-6 py-24">
        <div className="bg-gradient-to-br from-red-600 to-rose-500 p-12 rounded-3xl text-center text-white shadow-2xl space-y-8">
          <h2 className="text-4xl font-bold">Prêt à rejoindre l'événement ?</h2>
          <p className="text-lg max-w-xl mx-auto">
            Réservez votre place maintenant pour une expérience exceptionnelle avec ENSIAS.
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:text-rose-600 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition"
            >
              S'inscrire
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
