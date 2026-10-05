import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Onest } from "next/font/google";
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
const title = `${profile.name} — ${profile.role}`;
const description =
  "Go backend-разработчик из Казани: API в 2 раза быстрее после переписывания с Python, очереди без потерь, gRPC, PostgreSQL, Docker.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: profile.name, url: "https://github.com/Rics69" }],
  keywords: ["Go", "Golang", "backend", "разработчик", "PostgreSQL", "gRPC", "RabbitMQ", "Казань"],
  openGraph: {
    type: "website",
    locale: "ru_RU",
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
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
