import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/layout/site-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Printec Corp – From Vision to Vinyl | Signs, Wraps & Graphics",
    template: "%s | Printec Corp",
  },
  description:
    "Printec Corp is Virginia's premier custom signage, vehicle wrap, and graphics company. Channel letters, window wraps, dance floor wraps, wall wraps & more.",
  keywords: [
    "channel letters signage",
    "vehicle wraps Virginia",
    "window wraps",
    "dance floor wraps",
    "wall wraps",
    "LED channel letters",
    "custom signage",
    "storefront window graphics",
    "custom signs Virginia",
    "sign company near me",
  ],
  metadataBase: new URL("https://printecwrap.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Printec Corp",
    title: "Printec Corp – From Vision to Vinyl",
    description: "Virginia's premier custom signage, vehicle wrap, and graphics company.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Printec Corp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Printec Corp – From Vision to Vinyl",
    description: "Custom signs, wraps & graphics in Virginia.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "vzki5lbs56");`}
        </Script>
      </head>
      <body className="antialiased" style={{ background: "#0C0C0C" }}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
