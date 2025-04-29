import { type Metadata } from "next";
import Link from "next/link";
import { Icons } from "~/components/ui/icons";
import SocialAuthForm from "~/components/social-auth-form";
import "~/styles/globals.css";
export const metadata: Metadata = {
  title: "EnsiasConference - Sign Up",
  description:
    "Create your EnsiasConference account today.",
};
export default function RegisterPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 px-4">
      <section className="w-full max-w-md rounded-2xl border border-white/30 bg-white/90 backdrop-blur-md p-8 shadow-xl sm:p-10">
        <div className="mb-8 space-y-3 text-center">
          <Link href="/" className="inline-flex flex-col items-center gap-1">
            <Icons.camera height={48} width={48} className="text-brand" />
            <span className="text-lg font-semibold text-gray-800">EnsiasConference</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Create your account
          </h1>
          <p className="text-sm text-gray-600">
            Join <span className="font-medium text-brand">EnsiasConference</span> and explore the future of tech events.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <SocialAuthForm />
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white/90 px-3 text-gray-400">or continue with email</span>
          </div>
        </div>

        {/* Placeholder pour un futur formulaire email */}
        {/* <EmailRegisterForm /> */}

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-brand underline underline-offset-4 hover:text-brand/80 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}