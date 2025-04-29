import { type Metadata } from "next";
import Link from "next/link";
import { Icons } from "~/components/ui/icons";
import SocialAuthForm from "~/components/social-auth-form";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "EnsiasConference - Connect",
  description: "Sign in to EnsiasConference with style and ease.",
};

export default function LoginForm() {
  return (
    <main className="relative flex h-screen w-screen items-center justify-center bg-gradient-to-br from-[#dbeafe] via-[#c7d2fe] to-[#e0e7ff] overflow-hidden">
      {/* Background blur animation */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-300/30 to-transparent animate-pulse-slow"></div>

      {/* Card Section */}
      <section className="relative z-10 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 md:p-14 w-full max-w-md flex flex-col gap-8">
        {/* Logo + Title */}
        <div className="text-center space-y-2">
          <Link href="/" aria-label="Homepage">
            <Icons.camera height={56} width={56} className="mx-auto mb-2 text-indigo-600" />
          </Link>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm">
            Sign in to your EnsiasConference account
          </p>
        </div>

        {/* Social Login */}
        <div className="flex flex-col gap-4">
          <SocialAuthForm />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-xs uppercase">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-indigo-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </section>
    </main>
  );
}
