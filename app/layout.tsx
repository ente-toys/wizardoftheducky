import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import BackgroundMusic from "../components/BackgroundMusic";
import RotateOverlay from "../components/RotateOverlay";

const geistSans = localFont({
  src: "./fonts/geist-latin-variable.woff2",
  variable: "--font-geist-sans",
});

const irishGrover = localFont({
  src: "./fonts/irish-grover-latin-400.woff2",
  variable: "--font-irish-grover",
  weight: "400",
});

export const metadata: Metadata = {
  title: "The Ducky Oracle",
  description: "A wizardly audit of your digital habits. Reveal your ducky archetype, share and download your fate with your friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${irishGrover.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <BackgroundMusic />
        <RotateOverlay />
        {children}
        <a
          href="https://ente.com"
          target="_blank"
          rel="noopener"
          className="fixed bottom-2 right-2 z-40 tracking-wide no-underline opacity-50 hover:opacity-90 transition-opacity px-2 py-1"
          style={{ fontFamily: "var(--font-irish-grover)", color: "#FFEBD4", textShadow: "0 0 4px #462901", fontSize: "clamp(10px, 1vw, 18px)" }}
        >
          by ente
        </a>
      </body>
    </html>
  );
}
