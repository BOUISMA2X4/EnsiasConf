import Link from "next/link";
import SiteFooter from "~/components/layout/footer";
import FullNav from "~/components/layout/full-nav";
import { Button } from "~/components/ui/button";
import "~/styles/globals.css";

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 antialiased selection:bg-red-600 selection:text-white">
        {/* NAVIGATION */}
        <header className="fixed inset-x-0 top-0 z-50 bg-white/70 dark:bg-gray-950/80 backdrop-blur-md shadow-sm">
          <div className="container max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            <FullNav>
              <div className="flex items-center gap-4 sm:gap-6">
                {/* Sign Up */}
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden sm:inline-flex items-center px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-all rounded-lg"
                  >
                    Sign Up
                  </Button>
                </Link>

                {/* Live Conference */}
                <Link href="/register">
                  <Button
                    size="sm"
                    className="flex items-center gap-3 px-6 py-3 text-sm font-bold bg-gradient-to-r from-red-600 via-rose-500 to-pink-500 hover:brightness-110 text-white rounded-full shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <img
                      src="https://ensias.um5.ac.ma/sites/ensias.um5.ac.ma/files/logo5_0.jpg"
                      alt="ENSIAS Logo"
                      className="w-6 h-6 rounded-full shadow-sm"
                    />
                    Live Conference
                  </Button>
                </Link>
              </div>
            </FullNav>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 w-full pt-28 px-4 sm:px-6 md:px-8 animate-fadeIn">
          {children}
        </main>

        {/* FOOTER */}
        <SiteFooter />
      </body>
    </html>
  );
}
