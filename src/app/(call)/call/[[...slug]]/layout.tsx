import { getCurrentUser } from "~/lib/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ClientCallLayout from "./client-layout";
import "~/styles/globals.css";
export default async function CallLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  let user = null;
  let unAuthorizedUserName = null;

  try {
    user = await getCurrentUser();
  } catch (error) {
    console.error("Error fetching current user:", error);
  }

  unAuthorizedUserName = cookies().get("username");

  if (!user && !unAuthorizedUserName) {
    redirect(`/preview/${params.slug}`);
  }

  return (
    <html lang="fr">
      <body>
        <ClientCallLayout>
          {children}
        </ClientCallLayout>
      </body>
    </html>
  );
}
