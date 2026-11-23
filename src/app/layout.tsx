import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export const metadata: Metadata = {
  title: { default: "ScreenStage — Confident talent decisions", template: "%s | ScreenStage" },
  description: "Agentic hiring: AI interviews, skills assessments and video interviewing that drive better hires, not just faster ones.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <body className="min-h-screen flex flex-col overflow-x-clip">{children}</body>
    </html>
  );
}
