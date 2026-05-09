import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MUUA - Sistema de Gestión de Obras",
  description: "Panel administrativo para la gestión de obras dañadas del Museo Universitario de Artes",
};

export const viewport: Viewport = {
  themeColor: "#0f9d58",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
