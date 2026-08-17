import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: { default: "Troncos e Balanças Paragominas", template: "%s | PGM Paragominas" },
  description: "Troncos de contenção, balanças pecuárias, gradis, porteiras e eletrônica para manejo de gado, direto da fábrica em Paragominas-PA.",
}

export const viewport: Viewport = { themeColor: "#1018b8" }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${inter.variable} min-h-screen font-sans antialiased`}>{children}</body></html>
}
