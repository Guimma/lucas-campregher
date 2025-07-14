import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "../globals.css";
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
        url: "/lucas-avatar.jpg",
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
    images: ["/lucas-avatar.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/mbm.png',
    shortcut: '/mbm.png',
    apple: '/mbm.png',
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
        {children}
      </NextIntlClientProvider>
    </div>
  );
} 