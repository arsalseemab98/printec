"use client";

import { useEffect, useRef } from "react";

const CHECK_INTERVAL = 30_000; // 30 seconds

export function AutoRefresh() {
  const buildId = useRef<string | null>(null);

  useEffect(() => {
    async function checkVersion() {
      try {
        const res = await fetch("/api/version", { cache: "no-store" });
        if (!res.ok) return;
        const { version } = await res.json();

        if (buildId.current === null) {
          // First load — store current version
          buildId.current = version;
        } else if (buildId.current !== version) {
          // New deploy detected — reload
          console.log("[AutoRefresh] New deploy detected, reloading...");
          window.location.reload();
        }
      } catch {
        // Silent fail — don't break the app
      }
    }

    // Check immediately, then on interval
    checkVersion();
    const interval = setInterval(checkVersion, CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return null;
}
