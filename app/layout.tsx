import type { Metadata } from "next";
import {
  Inter,
  Geist_Mono,
  Newsreader,
  Noto_Sans_Devanagari,
  Noto_Serif_Devanagari,
} from "next/font/google";
import { getDictionary, getLang } from "@/lib/i18n/server";
import "./globals.css";

// The Latin faces are named --font-*-latin; globals.css builds the --font-sans,
// --font-serif and --font-mono stacks from them, with Devanagari fallbacks for Hindi.
const sans = Inter({
  variable: "--font-sans-latin",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const serif = Newsreader({
  variable: "--font-serif-latin",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const mono = Geist_Mono({
  variable: "--font-mono-latin",
  subsets: ["latin"],
  weight: ["400"],
});

// Devanagari files only download when a page shows Devanagari text, so they
// are not preloaded for English visitors.
const devaSans = Noto_Sans_Devanagari({
  variable: "--font-sans-deva",
  subsets: ["devanagari"],
  weight: ["400", "500"],
  preload: false,
});

const devaSerif = Noto_Serif_Devanagari({
  variable: "--font-serif-deva",
  subsets: ["devanagari"],
  weight: ["300", "400"],
  preload: false,
});

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getDictionary();
  return { title: meta.title, description: meta.description };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const lang = await getLang();
  return (
    <html
      lang={lang}
      className={[sans, serif, mono, devaSans, devaSerif].map((f) => f.variable).join(" ")}
    >
      <body>{children}</body>
    </html>
  );
}
