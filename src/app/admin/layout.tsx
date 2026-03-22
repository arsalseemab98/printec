"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  FileImage,
  Users,
  FileText,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Pages", href: "/admin/pages", icon: FileImage },
  { label: "Inquiries", href: "/admin/inquiries", icon: Users },
  { label: "Blog", href: "/admin/blog", icon: FileText },
];

function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.75rem 1.25rem",
        background: "none",
        border: "none",
        color: "rgba(255,255,255,0.5)",
        fontSize: "14px",
        cursor: "pointer",
        width: "100%",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
      }
    >
      <LogOut size={18} />
      Logout
    </button>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Login page renders without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0C0C0C" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          minWidth: 240,
          background: "#111",
          borderRight: "1px solid #222",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 50,
        }}
      >
        {/* Logo */}
        <Link
          href="/admin"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "1.5rem 1rem 1rem",
          }}
        >
          <Image
            src="/printec-logo-light.png"
            alt="Printec"
            width={140}
            height={88}
            style={{ objectFit: "contain", height: "auto", width: "140px" }}
            priority
          />
        </Link>

        <p
          style={{
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "4px",
            color: "#F7941D",
            fontWeight: 500,
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          Admin
        </p>

        {/* Navigation */}
        <nav style={{ flex: 1 }}>
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1.25rem",
                  color: isActive ? "#F7941D" : "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 400,
                  borderLeft: isActive
                    ? "3px solid #F7941D"
                    : "3px solid transparent",
                  background: isActive ? "rgba(247,148,29,0.05)" : "transparent",
                  transition: "all 0.2s",
                }}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ borderTop: "1px solid #222", padding: "0.5rem 0" }}>
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          marginLeft: 240,
          padding: "2rem 2.5rem",
          minHeight: "100vh",
        }}
      >
        {children}
      </main>
    </div>
  );
}
