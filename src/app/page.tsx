import { Metadata } from "next";
import { HomePageClient } from "@/components/home-page-client";

export const metadata: Metadata = {
  title: "Printec Virginia LLC – From Vision to Vinyl | Signs, Wraps & Graphics",
  description:
    "Virginia's premier custom signage and graphics company. Channel letters, window wraps, dance floor wraps, wall wraps, neon signs & more. Call (647) 299-1460.",
  keywords: [
    "custom signs Virginia",
    "channel letters signage",
    "window wraps",
    "dance floor wraps",
    "wall wraps",
    "vinyl wraps",
    "LED channel letters",
    "custom neon signs",
    "business signage",
    "sign company near me",
    "storefront window graphics",
  ],
  openGraph: {
    title: "Printec Virginia LLC – From Vision to Vinyl | Signs, Wraps & Graphics",
    description:
      "Virginia's premier custom signage and graphics company. Channel letters, window wraps, dance floor wraps, wall wraps, neon signs & more.",
    type: "website",
    locale: "en_US",
    siteName: "Printec Virginia LLC",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Printec Virginia LLC" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Printec Virginia LLC – From Vision to Vinyl",
    description: "Custom signs, wraps & graphics in Virginia. Call (647) 299-1460.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://printecwrap.com",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
