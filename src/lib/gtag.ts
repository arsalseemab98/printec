// Google Analytics 4 event tracking helper
// Measurement ID: G-6K8LW0P8B9

type GtagEventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(eventName: string, params?: GtagEventParams) {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }
  } catch {
    // Silently fail — analytics should never break the app
  }
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}
