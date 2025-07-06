import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import CustomCursor from "../../components/CustomCursor";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

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
  title: "Lucas Campregher - Fullstack Software Engineer | Data Privacy & AI Specialist",
  description: "Experienced Fullstack Software Engineer with 6+ years building scalable solutions for millions of users. Specializing in backend development, data privacy (LGPD/GDPR), and AI integration.",
  keywords: "Lucas Campregher, Software Engineer, Fullstack Developer, Backend Development, Data Privacy, LGPD, GDPR, AI, Node.js, Python, Java, AWS, React, TypeScript",
  authors: [{ name: "Lucas Campregher" }],
  creator: "Lucas Campregher",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Lucas Campregher - Fullstack Software Engineer",
    description: "Experienced Fullstack Software Engineer specializing in backend development, data privacy, and AI integration.",
    siteName: "Lucas Campregher Portfolio",
    images: [
      {
        url: "/lucas-avatar.png",
        width: 400,
        height: 400,
        alt: "Lucas Campregher - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas Campregher - Fullstack Software Engineer",
    description: "Experienced Software Engineer specializing in backend development and data privacy.",
    images: ["/lucas-avatar.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <div className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <CustomCursor />
        {children}
      </NextIntlClientProvider>
    </div>
  );
} 