import type { Metadata, Viewport } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "ShiftForge · Maintenance Intelligence",
  description: "The operating system for mining and heavy industry maintenance intelligence.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ShiftForge",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#14100E",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <MobileNav />
        <Sidebar />
        <main className="lg:ml-64 pt-14 lg:pt-0 p-4 sm:p-6 lg:p-8 print:p-0 print:pt-0 print:ml-0">
          {children}
        </main>
      </body>
    </html>
  );
}
