import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "../components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Lucas Campregher - Software Engineer",
  description: "Software Engineer specialized in backend development, data privacy, and technical leadership with 6+ years building scalable solutions for millions of users.",
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml;base64,' + btoa(`
          <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="6" fill="url(#gradient)"/>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#3B82F6"/>
                <stop offset="100%" style="stop-color:#8B5CF6"/>
              </linearGradient>
            </defs>
            <text x="16" y="20" text-anchor="middle" fill="white" font-family="JetBrains Mono, monospace" font-size="12" font-weight="bold">&lt;/&gt;</text>
          </svg>
        `),
        sizes: '32x32',
        type: 'image/svg+xml',
      }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
