import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../../globals.css";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prime Boss",
  description: "Prime Loot",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.variable}`}>{children}</body>
    </html>
  );
}
