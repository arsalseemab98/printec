"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FileImage,
  ImageIcon,
  Users,
  FileText,
  ClipboardList,
  FileSignature,
  BarChart3,
  BookOpen,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  MessageSquare,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Statistics", href: "/admin/statistics", icon: BarChart3 },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Pages", href: "/admin/pages", icon: FileImage },
  { label: "Images", href: "/admin/images", icon: ImageIcon },
  { label: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { label: "Quotes", href: "/admin/quotes", icon: ClipboardList },
  { label: "Contracts", href: "/admin/contracts", icon: FileSignature },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Catalogs", href: "/admin/catalogs", icon: BookOpen },
];

const BOTTOM_TAB_ITEMS = [
  { label: "Home", href: "/admin", icon: LayoutDashboard },
  { label: "Inquiries", href: "/admin/inquiries", icon: Users },
  { label: "Contracts", href: "/admin/contracts", icon: FileSignature },
  { label: "Stats", href: "/admin/statistics", icon: BarChart3 },
];

function LogoutButton({ textColor }: { textColor: string }) {
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
        color: textColor,
        fontSize: "14px",
        cursor: "pointer",
        width: "100%",
        transition: "color 0.2s",
      }}
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
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("admin-theme");
    if (saved === "light") setLight(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("admin-theme", light ? "light" : "dark");
  }, [light]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Login page renders without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const bg = light ? "#f5f5f5" : "#0C0C0C";
  const sidebarBg = light ? "#fff" : "#111";
  const sidebarBorder = light ? "#e0e0e0" : "#222";
  const textColor = light ? "#555" : "rgba(255,255,255,0.5)";
  const activeColor = "#F7941D";
  const activeTextBg = light ? "rgba(247,148,29,0.08)" : "rgba(247,148,29,0.05)";
  const topBarBg = light ? "#fff" : "#111";

  function isActive(href: string) {
    return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: bg }} className={light ? "admin-light" : ""}>
      {/* ── Desktop Sidebar (hidden on mobile) ── */}
      <aside className="admin-sidebar">
        <Link href="/admin" style={{ display: "flex", justifyContent: "center", padding: "1.5rem 1rem 1rem" }}>
          <Image
            src={light ? "/printec-logo.png" : "/printec-logo-light.png"}
            alt="Printec"
            width={140}
            height={88}
            style={{ objectFit: "contain", height: "auto", width: "140px" }}
            priority
          />
        </Link>

        <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "4px", color: "#F7941D", fontWeight: 500, textAlign: "center", marginBottom: "1.5rem" }}>
          Admin
        </p>

        <nav style={{ flex: 1 }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1.25rem",
                color: isActive(item.href) ? activeColor : textColor,
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: isActive(item.href) ? 600 : 400,
                borderLeft: isActive(item.href) ? `3px solid ${activeColor}` : "3px solid transparent",
                background: isActive(item.href) ? activeTextBg : "transparent",
                transition: "all 0.2s",
              }}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ borderTop: `1px solid ${sidebarBorder}`, padding: "0.5rem 0" }}>
          <button
            onClick={() => setLight(!light)}
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1.25rem", background: "none", border: "none", color: textColor, fontSize: "14px", cursor: "pointer", width: "100%" }}
          >
            {light ? <Moon size={18} /> : <Sun size={18} />}
            {light ? "Dark Mode" : "Light Mode"}
          </button>
          <LogoutButton textColor={textColor} />
        </div>
      </aside>

      {/* ── Mobile Top Bar (hidden on desktop) ── */}
      <header className="admin-topbar">
        <button
          onClick={() => setMenuOpen(true)}
          style={{ background: "none", border: "none", color: textColor, cursor: "pointer", padding: "8px" }}
        >
          <Menu size={24} />
        </button>

        <Link href="/admin" style={{ display: "flex", alignItems: "center" }}>
          <Image
            src={light ? "/printec-logo.png" : "/printec-logo-light.png"}
            alt="Printec"
            width={100}
            height={63}
            style={{ objectFit: "contain", height: "32px", width: "auto" }}
          />
        </Link>

        <button
          onClick={() => setLight(!light)}
          style={{ background: "none", border: "none", color: textColor, cursor: "pointer", padding: "8px" }}
        >
          {light ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </header>

      {/* ── Mobile Hamburger Overlay ── */}
      {menuOpen && (
        <>
          <div
            className="admin-menu-backdrop"
            onClick={() => setMenuOpen(false)}
          />
          <div className="admin-menu-drawer" style={{ background: sidebarBg }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", borderBottom: `1px solid ${sidebarBorder}` }}>
              <Image
                src={light ? "/printec-logo.png" : "/printec-logo-light.png"}
                alt="Printec"
                width={100}
                height={63}
                style={{ objectFit: "contain", height: "32px", width: "auto" }}
              />
              <button
                onClick={() => setMenuOpen(false)}
                style={{ background: "none", border: "none", color: textColor, cursor: "pointer", padding: "4px" }}
              >
                <X size={22} />
              </button>
            </div>

            <nav style={{ flex: 1, padding: "0.5rem 0" }}>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.875rem 1.25rem",
                    color: isActive(item.href) ? activeColor : textColor,
                    textDecoration: "none",
                    fontSize: "15px",
                    fontWeight: isActive(item.href) ? 600 : 400,
                    borderLeft: isActive(item.href) ? `3px solid ${activeColor}` : "3px solid transparent",
                    background: isActive(item.href) ? activeTextBg : "transparent",
                  }}
                >
                  <item.icon size={20} />
                  {item.label}
                </Link>
              ))}
            </nav>

            <div style={{ borderTop: `1px solid ${sidebarBorder}`, padding: "0.5rem 0" }}>
              <LogoutButton textColor={textColor} />
            </div>
          </div>
        </>
      )}

      {/* ── Main Content ── */}
      <main className="admin-main">
        {children}
      </main>

      {/* ── Mobile Bottom Tab Bar (hidden on desktop) ── */}
      <nav className="admin-bottombar" style={{ background: topBarBg, borderTop: `1px solid ${sidebarBorder}` }}>
        {BOTTOM_TAB_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
              padding: "8px 0",
              color: isActive(item.href) ? activeColor : textColor,
              textDecoration: "none",
              fontSize: "10px",
              fontWeight: isActive(item.href) ? 700 : 500,
              letterSpacing: "0.5px",
              flex: 1,
              transition: "color 0.15s",
            }}
          >
            <item.icon size={20} />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* ── Responsive Styles ── */}
      <style>{`
        /* Desktop: show sidebar, hide mobile elements */
        .admin-sidebar {
          width: 240px;
          min-width: 240px;
          background: ${sidebarBg};
          border-right: 1px solid ${sidebarBorder};
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 50;
        }
        .admin-topbar { display: none; }
        .admin-bottombar { display: none; }
        .admin-menu-backdrop { display: none; }
        .admin-menu-drawer { display: none; }
        .admin-main {
          flex: 1;
          margin-left: 240px;
          padding: 2rem 2.5rem;
          min-height: 100vh;
        }

        /* Mobile: hide sidebar, show top/bottom bars */
        @media (max-width: 768px) {
          .admin-sidebar { display: none !important; }

          .admin-topbar {
            display: flex !important;
            align-items: center;
            justify-content: space-between;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 56px;
            padding: 0 12px;
            background: ${topBarBg};
            border-bottom: 1px solid ${sidebarBorder};
            z-index: 100;
          }

          .admin-bottombar {
            display: flex !important;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 60px;
            z-index: 100;
            padding-bottom: env(safe-area-inset-bottom, 0px);
          }

          .admin-menu-backdrop {
            display: block !important;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.6);
            z-index: 200;
          }

          .admin-menu-drawer {
            display: flex !important;
            flex-direction: column;
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: 280px;
            z-index: 201;
            animation: slideIn 0.2s ease-out;
          }

          .admin-main {
            margin-left: 0 !important;
            padding: 72px 16px 76px !important;
          }
        }

        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
