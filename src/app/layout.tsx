import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Onest } from "next/font/google";
import { ContactProvider } from "@/components/contact/contact-modal";
import { MotionProvider } from "@/components/motion-provider";
import { profile } from "@/content/profile";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rics69.github.io/go-portfolio";
// Only the origin: Next already prefixes file-based image URLs with basePath,
// so a base with a path would double it (/go-portfolio/go-portfolio/...).
const siteOrigin = new URL(siteUrl).origin;
const title = `${profile.name} — ${profile.role}`;
const description =
  "Go backend-разработчик из Казани: API в 2 раза быстрее после переписывания с Python, очереди без потерь, gRPC, PostgreSQL, Docker.";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  alternates: { canonical: `${siteUrl}/` },
  title,
  description,
  authors: [{ name: profile.name, url: "https://github.com/Rics69" }],
  keywords: ["Go", "Golang", "backend", "разработчик", "PostgreSQL", "gRPC", "RabbitMQ", "Казань"],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: `${siteUrl}/`,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${onest.variable} ${jetbrains.variable} antialiased`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-[80] rounded-full bg-ink px-5 py-3 font-semibold text-paper focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Перейти к содержанию
        </a>
        <MotionProvider>
          <ContactProvider>{children}</ContactProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
