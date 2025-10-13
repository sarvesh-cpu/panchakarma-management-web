import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "PBL Panchakarma - Digital Ayurveda Care",
  description:
    "Schedule, Track & Recover with Personalized Panchakarma Therapy. Modern digital platform for ancient Ayurvedic healing.",
  keywords: "Panchakarma, Ayurveda, Digital Healthcare, Therapy Management, Holistic Healing",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
