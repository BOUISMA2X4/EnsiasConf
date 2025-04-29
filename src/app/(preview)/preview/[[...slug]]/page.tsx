/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { previewJoinSchema } from "~/schemas/join";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { Icons } from "~/components/ui/icons";
import Link from "next/link";

type FormData = z.infer<typeof previewJoinSchema>;

export default function CallPreviewPage() {
  const router = useRouter();
  const { toast } = useToast();
  const params = useParams();
  const [isJoining, setIsJoining] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(previewJoinSchema),
  });

  async function joinCall(data: FormData) {
    setIsJoining(true);
    try {
      const joinResponse = await fetch(`/api/call/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          callName: params.slug,
          username: data.name,
        }),
      });

      if (!joinResponse.ok) {
        throw new Error("Join response not OK");
      }

      Cookies.set("username", data.name);
      router.replace(`/call/${params.slug as string}`);
    } catch (error) {
      console.error("Error during fetch:", error);
      toast({
        title: "Something went wrong.",
        description: "This call cannot be joined. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsJoining(false);
    }
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-8">
      <div className="w-full max-w-md flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <Link href="/">
            <Icons.camera height={52} width={62} className="mb-5 hover:opacity-90 transition" />
          </Link>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Join the Call</h1>
          <p className="text-muted-foreground text-sm">
            Enter your name to continue to the video call.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(joinCall)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Input
              {...register("name")}
              placeholder="Your name"
              type="text"
              className="text-sm"
              disabled={isJoining}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isJoining}
            className="w-full flex items-center justify-center gap-2"
          >
            {isJoining ? (
              <Icons.spinner className="animate-spin" width={20} height={20} />
            ) : (
              <Icons.join width={20} height={20} className="mr-1" />
            )}
            {isJoining ? "Joining..." : "Join Now"}
          </Button>
        </form>
      </div>
    </section>
  );
}
