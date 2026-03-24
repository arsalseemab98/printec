"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { PromoBar } from "@/components/layout/promo-bar";
import { Footer } from "@/components/layout/footer";
import { FloatingActionButton } from "@/components/shared/floating-action-button";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <PromoBar />
      <main>{children}</main>
      <Footer />
      <FloatingActionButton />
    </>
  );
}
