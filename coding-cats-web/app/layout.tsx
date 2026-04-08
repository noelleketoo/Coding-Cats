import type { Metadata } from "next";
import { Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Coding Cats",
  description: "Solve coding problems, collect cats!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mono.variable} ${pressStart.variable} antialiased bg-purple-50 min-h-screen`} style={{ fontFamily: "var(--font-press-start)" }}>
        {children}
      </body>
    </html>
  );
}
