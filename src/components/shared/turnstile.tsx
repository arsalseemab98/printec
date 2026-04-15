"use client";

import { useEffect, useRef, useCallback } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

interface TurnstileProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

export function Turnstile({ onVerify, onExpire }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const scriptLoaded = useRef(false);

  const renderWidget = useCallback(() => {
    if (!SITE_KEY) return;
    if (!containerRef.current || widgetIdRef.current !== null) return;
    if (!window.turnstile) return;

    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        theme: "dark",
        callback: onVerify,
        "expired-callback": onExpire,
        "error-callback": () => {
          // Do NOT call reset() here — it re-triggers render which re-triggers error,
          // producing an infinite error loop (observed in Clarity). Clear the widget
          // and stop; anti-spam still covers us server-side.
          widgetIdRef.current = null;
        },
      });
    } catch (err) {
      console.warn("[Turnstile] render failed, failing open:", err);
      widgetIdRef.current = null;
    }
  }, [onVerify, onExpire]);

  useEffect(() => {
    // If no site key configured, render nothing — server-side anti-spam still protects.
    if (!SITE_KEY) return;

    // If Turnstile script is already loaded, render immediately
    if (window.turnstile) {
      renderWidget();
      return;
    }

    // Load script only once
    if (!scriptLoaded.current && !document.querySelector('script[src*="turnstile"]')) {
      scriptLoaded.current = true;
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.onload = () => renderWidget();
      document.head.appendChild(script);
    }

    // Poll briefly in case another instance loaded the script; give up after ~5s
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (window.turnstile) {
        clearInterval(interval);
        renderWidget();
      } else if (attempts > 25) {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [renderWidget]);

  // Cleanup widget on unmount
  useEffect(() => {
    return () => {
      if (widgetIdRef.current !== null && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
        widgetIdRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} style={{ marginBottom: "4px" }} />;
}

// Extend window for Turnstile types
declare global {
  interface Window {
    turnstile: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}
