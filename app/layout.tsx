import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Netflix Clone - Movie Platform",
  description: "Premium movie streaming platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-background text-text-primary min-h-screen overflow-x-hidden`}>
        <Navbar />
        <main className="pb-20 md:pb-0">{children}</main>
      </body>
    </html>
  );
}