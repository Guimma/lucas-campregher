import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lucascampregher.com'),
  title: "Lucas Campregher - Developer Portfolio",
  description: "Fullstack Software Engineer specializing in Data Privacy & AI",
  icons: {
    icon: '/mbm.png',
    shortcut: '/mbm.png',
    apple: '/mbm.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
} 