import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/layout/site-shell";
import { AutoRefresh } from "@/components/shared/auto-refresh";

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
    default: "Printec Virginia LLC – From Vision to Vinyl | Signs, Wraps & Graphics",
    template: "%s | Printec Virginia LLC",
  },
  description:
    "Printec Virginia LLC is Virginia's premier custom signage, vehicle wrap, and graphics company. Channel letters, window wraps, dance floor wraps, wall wraps & more.",
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
    siteName: "Printec Virginia LLC",
    title: "Printec Virginia LLC – From Vision to Vinyl",
    description: "Virginia's premier custom signage, vehicle wrap, and graphics company.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Printec Virginia LLC" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Printec Virginia LLC – From Vision to Vinyl",
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
        {/* Preconnect to Supabase CDN for faster image loading */}
        <link rel="preconnect" href="https://eofjaizkkxqxbynnvemi.supabase.co" />
        <link rel="dns-prefetch" href="https://eofjaizkkxqxbynnvemi.supabase.co" />
        {/* Google Analytics (gtag.js) — Measurement ID: G-6K8LW0P8B9 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6K8LW0P8B9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`if(!window.location.pathname.startsWith("/admin")&&!window.location.pathname.startsWith("/sign")){
            window.dataLayer=window.dataLayer||[];
            function gtag(){dataLayer.push(arguments);}
            gtag('js',new Date());
            gtag('config','G-6K8LW0P8B9',{page_path:window.location.pathname});
          }`}
        </Script>
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            if(l.location.pathname.startsWith("/admin")||l.location.pathname.startsWith("/sign"))return;
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "vzki5lbs56");`}
        </Script>
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`if(!window.location.pathname.startsWith("/admin")&&!window.location.pathname.startsWith("/sign")){
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','2079938182582983');fbq('track','PageView');
          }`}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2079938182582983&ev=PageView&noscript=1"
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://printecwrap.com/#business",
              name: "Printec Virginia LLC",
              description: "Virginia's premier custom signage, wraps, and graphics company. Channel letters, window wraps, dance floor wraps, wall wraps, neon signs & more.",
              url: "https://printecwrap.com",
              telephone: "+1-715-503-5444",
              email: "info@printecwrap.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "15485 Marsh Overlook Dr",
                addressLocality: "Woodbridge",
                addressRegion: "VA",
                postalCode: "22191",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 38.6582,
                longitude: -77.2497,
              },
              image: "https://printecwrap.com/og-image.png",
              logo: "https://printecwrap.com/printec-logo.png",
              sameAs: [
                "https://www.instagram.com/printecvirginia/",
                "https://www.facebook.com/printecvirginia",
                "https://www.tiktok.com/@printec.va",
              ],
              openingHoursSpecification: [
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "16:00" },
              ],
              priceRange: "$$",
              // Reviews — sourced from live Google Business Profile (Printec Wrap).
              // Keep ratingValue + reviewCount in sync with the GBP listing; never invent values.
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                reviewCount: "13",
                bestRating: "5",
                worstRating: "1",
              },
              review: [
                {
                  "@type": "Review",
                  author: { "@type": "Person", name: "Jaspreet Kaur" },
                  reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
                  reviewBody:
                    "Printec Wrap is so professional that my restaurant looks so amazing. Highly recommend them for any kind of display or wrap.",
                  datePublished: "2026-04-25",
                },
                {
                  "@type": "Review",
                  author: { "@type": "Organization", name: "Sangria's Mexican Grill" },
                  reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
                  reviewBody:
                    "We have been using Printec for years and absolutely love it! They are extremely quick to make changes to menus, have great customer service and a personal dedicated rep that you can deal directly with instead of having to call a 1-800.",
                  datePublished: "2026-04-25",
                },
                {
                  "@type": "Review",
                  author: { "@type": "Person", name: "Mansoortastic" },
                  reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
                  reviewBody:
                    "Great service and excellent customer handling. Their team delivered even more than I expected — highly recommended!",
                  datePublished: "2026-04-23",
                },
              ],
              areaServed: [
                { "@type": "State", name: "Virginia" },
                { "@type": "State", name: "Maryland" },
                { "@type": "Place", name: "Washington, D.C." },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Signage & Graphics Services",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Channel Letters & LED Signage" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Neon Signs" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Signage" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Window Wraps & Graphics" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wall Wraps & Murals" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dance Floor Wraps" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Food Truck Wraps" } },
                ],
              },
            }),
          }}
        />
      </head>
      <body className="antialiased" style={{ background: "#0C0C0C" }}>
        <AutoRefresh />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
