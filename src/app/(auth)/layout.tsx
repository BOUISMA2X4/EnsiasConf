import { ReactNode } from 'react';

export const metadata = {
  title: 'Next.js',
  description: 'Généré par Next.js',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        {/* Tu peux inclure des balises <meta> ou d'autres éléments dans <head> */}
        <meta charSet="UTF-8" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
