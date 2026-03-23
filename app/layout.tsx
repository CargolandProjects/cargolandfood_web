import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./Providers";
import AuthModalContainer from "@/components/auth/AuthModalContainer";

const satoshi = localFont({
  src: [
    {
      path: "../assets/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-satoshi",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cargolandfood.com";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  // maximumScale: 5, // Allow zoom for accessibility
  // userScalable: true, // Don't disable user zoom (bad for accessibility)
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CargolandFood - Food Delivery, Grocery & Restaurant Orders Online",
    template: "%s | CargolandFood",
  },
  description:
    "Order food online from top restaurants, groceries, and vendors across Nigeria. Fast delivery to Lagos, Abuja, Ibadan, Port Harcourt & more. Download the food delivery app today!",
  keywords: [
    "food delivery Nigeria",
    "order food online",
    "restaurant delivery",
    "grocery delivery Lagos",
    "food delivery app",
    "online food ordering",
    "pizza delivery Ibadan",
    "late night food delivery",
    "shawarma delivery",
    "restaurants near me",
    "CargolandFood",
  ],
  authors: [{ name: "CargolandFood" }],
  creator: "CargolandFood",
  publisher: "CargolandFood",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    siteName: "CargolandFood",
    title: "CargolandFood - Food Delivery & Restaurant Orders Online",
    description:
      "Order food from top restaurants and vendors across Nigeria. Fast delivery to your doorstep. Download the app today!",
    images: [
      {
        url: "/logo-full.webp",
        width: 1200,
        height: 630,
        alt: "CargolandFood Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CargolandFood - Food Delivery & Restaurant Orders Online",
    description:
      "Order food from top restaurants across Nigeria. Fast delivery to your doorstep.",
    images: ["/logo-full.webp"],
    creator: "@cargolandfoods",
    site: "@cargolandfoods",
  },
  verification: {
    // TODO: Add verification tokens when available from Google Search Console
    // google: "your-google-verification-code",
  },
  other: {
    "contact:email": "info@cargolandfood.com",
    "contact:phone": "+234-817-908-1262",
  },
  alternates: {
    canonical: siteUrl,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className={`${satoshi.variable} antialiased`}>
        <Providers>
          {children}
          <AuthModalContainer />
        </Providers>
      </body>
    </html>
  );
}
