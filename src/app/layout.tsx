import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export const metadata: Metadata = {
  title: { default: "ScreenStage: the AI engine for hiring decisions", template: "%s | ScreenStage" },
  description: "AI-native hiring platform that analyzes every applicant, predicts performance and ranks candidates on cited evidence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${outfit.variable} antialiased`}>
      <body className="min-h-screen flex flex-col overflow-x-clip">{children}</body>
    </html>
  );
}
