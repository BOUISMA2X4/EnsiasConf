import SiteFooter from "~/components/layout/footer";
import FullNav from "~/components/layout/full-nav";
import UserAccountDropdown from "~/components/layout/user-account-dropdown";
import { getCurrentUser } from "~/lib/session";
import { notFound } from "next/navigation";
import CallIdProvider from "~/context/call-id-context";
import "~/styles/globals.css";

export default async function CallsHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    notFound();
  }

  return (
    <html lang="fr">
      <head>
        {/* Ajouter les éléments du head ici, comme des balises <meta>, <title>, etc. */}
      </head>
      <body>
        <div className="flex min-h-screen flex-col">
          <FullNav>
            <UserAccountDropdown
              user={{
                name: user?.name || "",
                email: user?.email || "",
                image: user?.image || "",
              }}
            />
          </FullNav>
          <main className="my-16 flex w-screen flex-1 items-center md:my-8">
            <CallIdProvider>{children}</CallIdProvider>
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
