import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ekonom-IA API",
  description: "Backend API for Ekonom-IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
