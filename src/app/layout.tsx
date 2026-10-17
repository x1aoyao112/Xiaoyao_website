import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { siteOrigin } from "@/lib/metadata";
import { switzer, zodiak } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  ...(siteOrigin()
    ? {
        metadataBase: new URL(siteOrigin()!),
        alternates: { canonical: siteOrigin() },
      }
    : {}),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    ...(siteOrigin() ? { url: siteOrigin() } : {}),
  },
  robots: { index: process.env.VERCEL_ENV !== "preview", follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={siteConfig.locale}
      className={`${switzer.variable} ${zodiak.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
