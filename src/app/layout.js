import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IdeaForge - Professional Business Ideas Platform",
  description:
    "Discover 10,000+ curated business ideas with AI-powered market analysis. Professional platform for entrepreneurs, investors, and business consultants. Complete with market insights, investment requirements, and growth opportunities.",
  keywords:
    "business ideas, entrepreneurship, startup opportunities, market analysis, AI-powered insights, business planning, investment opportunities, professional platform",
  authors: [{ name: "IdeaForge Team" }],
  creator: "IdeaForge",
  publisher: "IdeaForge",
  robots: "index, follow",
  openGraph: {
    title: "IdeaForge - Professional Business Ideas Platform",
    description:
      "Discover 10,000+ curated business ideas with AI-powered market analysis",
    type: "website",
    locale: "en_US",
    siteName: "IdeaForge",
  },
  twitter: {
    card: "summary_large_image",
    title: "IdeaForge - Professional Business Ideas Platform",
    description:
      "Discover 10,000+ curated business ideas with AI-powered market analysis",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#10b981", // Emerald-500
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
