import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "Resikku Essentials — Premium Paper Soap | Sabun Kertas Organik",
    template: "%s | Resikku Essentials",
  },
  description:
    "Sabun kertas organik premium untuk kebersihan keluarga. Praktis, higienis, dan ramah lingkungan. Larut dalam 5 detik, aman untuk kulit sensitif. 6 varian eksklusif dengan minyak esensial murni.",
  keywords: [
    "sabun kertas",
    "paper soap",
    "organic soap",
    "resikku",
    "hygiene",
    "kebersihan",
    "sabun travel",
    "sabun organik",
    "sabun antibakteri",
    "eco friendly soap",
  ],
  authors: [{ name: "Resikku Essentials" }],
  creator: "Resikku Essentials",
  publisher: "Resikku Essentials",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Resikku Essentials — Premium Paper Soap",
    description:
      "Sabun kertas organik premium untuk kebersihan keluarga. 6 varian eksklusif. Praktis, higienis, dan ramah lingkungan.",
    url: "https://resikku.id",
    siteName: "Resikku Essentials",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/images/hero-og.png",
        width: 1344,
        height: 768,
        alt: "Resikku Essentials — Premium Paper Soap Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resikku Essentials — Premium Paper Soap",
    description:
      "Sabun kertas organik premium untuk kebersihan keluarga. Praktis, higienis, dan ramah lingkungan.",
    images: ["/images/hero-og.png"],
  },
  metadataBase: new URL("https://resikku.id"),
  alternates: {
    canonical: "/",
    languages: {
      "id-ID": "/",
      "en-US": "/en",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#2d5a3f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-cream text-foreground min-h-screen flex flex-col">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Toaster />
        <SonnerToaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
