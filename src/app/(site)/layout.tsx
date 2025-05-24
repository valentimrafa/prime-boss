import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Providers } from "@/providers";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = cookieStore.get("token");

  if (!session) {
    redirect("/login");
  }
  return (
    <html lang="pt-br ">
      <body className={`${roboto.variable}`}>
        <Providers>
          <Header />
          <main className="bg-gray-200">{children}</main>
          <div id="portal-root" />
        </Providers>
      </body>
    </html>
  );
}
