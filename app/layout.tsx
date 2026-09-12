import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TravelTrucks",
  description:
    "A platform for truck enthusiasts to share their travel experiences and connect with fellow travelers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable}`}>
        <Header />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
