import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "MUUA - Sistema de Gestión de Obras",
  description:
    "Sistema de gestión de obras dañadas del Museo Universitario Universidad de Antioquia",
  keywords: ["museo", "universidad de antioquia", "MUUA", "gestión de obras", "restauración"],
};

export const viewport: Viewport = {
  themeColor: "#00703c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="bg-background antialiased">{children}</body>
    </html>
  );
}
