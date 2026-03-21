/* ─── BRAND CONSTANTS (matching Printec logo spectrum) ─── */
export const ORANGE = "#F7941D";
export const RED = "#E53935";
export const YELLOW = "#FFD600";
export const MAGENTA = "#9B2D8E";
export const TEAL = "#00897B";
export const EMERALD = "#00695C";
export const LIME = "#8BC34A";
export const BLACK = "#0C0C0C";
export const DARK1 = "#161616";
export const DARK2 = "#222222";
export const WHITE = "#FFFFFF";

export const SPECTRUM = `linear-gradient(90deg, ${YELLOW}, ${ORANGE}, ${RED}, ${MAGENTA}, ${TEAL}, ${LIME})`;
export const BRAND_COLORS = [YELLOW, ORANGE, RED, MAGENTA, TEAL, EMERALD, LIME];

/* ─── SUPABASE STORAGE ─── */
const SUPABASE_STORAGE = "https://eofjaizkkxqxbynnvemi.supabase.co/storage/v1/object/public/images";
export const IMG = {
  workshop: `${SUPABASE_STORAGE}/workshop.webp`,
  worker: `${SUPABASE_STORAGE}/worker.webp`,
  danceFloorHero: `${SUPABASE_STORAGE}/dance-floor-hero.webp`,
  floorBefore: `${SUPABASE_STORAGE}/floor-before.webp`,
  floorAfter: `${SUPABASE_STORAGE}/floor-after.webp`,
  wallWrapHero: `${SUPABASE_STORAGE}/wall-wrap-hero.webp`,
  wallBefore: `${SUPABASE_STORAGE}/wall-before.webp`,
  wallAfter: `${SUPABASE_STORAGE}/wall-after.webp`,
  windowWrapHero: `${SUPABASE_STORAGE}/window-wrap-hero.webp`,
  windowBefore: `${SUPABASE_STORAGE}/window-before.webp`,
  windowAfter: `${SUPABASE_STORAGE}/window-after.webp`,
  neonBefore: `${SUPABASE_STORAGE}/neon-before.webp`,
  neonAfter: `${SUPABASE_STORAGE}/neon-after.webp`,
  signageHero: `${SUPABASE_STORAGE}/signage-hero.webp`,
  signageBefore: `${SUPABASE_STORAGE}/signage-before.webp`,
  signageAfter: `${SUPABASE_STORAGE}/signage-after.webp`,
};

/* ─── SVG NOISE TEXTURE DATA URL (static base64, works server-side) ─── */
export const NOISE_SVG =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC43NSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjxmZUNvbG9yTWF0cml4IHR5cGU9InNhdHVyYXRlIiB2YWx1ZXM9IjAiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIwLjE4Ii8+PC9zdmc+";

/* ─── SERVICES DATA ─── */
export const SERVICES = [
  { num: "01", title: "OUTDOOR LED CHANNEL", desc: "High-impact illuminated channel letters that demand attention day and night." },
  { num: "02", title: "SIGNMAKERS", desc: "Custom signage crafted with precision — from storefronts to monument signs." },
  { num: "03", title: "FOOD TRUCK WRAP", desc: "Full vehicle wraps that turn your food truck into a rolling billboard." },
  { num: "04", title: "FOOD TRAILER WRAP", desc: "Bold, durable trailer wraps built to withstand the road and the elements." },
  { num: "05", title: "WINDOW WRAP", desc: "Transform glass into prime advertising real estate with vivid window graphics." },
  { num: "06", title: "WATERPROOF MENUS", desc: "Tough, weather-resistant menus that look fresh no matter what." },
  { num: "07", title: "CUSTOM UNIFORMS", desc: "Branded apparel that unifies your crew and amplifies your identity." },
  { num: "08", title: "SPORTING WEARS", desc: "Performance gear with bold custom prints for teams and athletes." },
  { num: "09", title: "DIGITAL SIGNAGE", desc: "Dynamic digital displays that keep your messaging current and engaging." },
  { num: "10", title: "CONTENT MARKETING", desc: "Strategic content that builds your brand story and drives real engagement." },
  { num: "11", title: "GRAPHIC DESIGN", desc: "Raw, impactful design work — logos, layouts, campaigns, and beyond." },
];

/* ─── NAV LINKS (multi-page) ─── */
export const NAV_LINKS = ["HOME", "ABOUT", "SERVICES", "PORTFOLIO", "BLOG", "CONTACT"] as const;

/* ─── SERVICES NAV (dropdown items) ─── */
export const SERVICES_NAV = [
  { name: "Custom Signs", href: "/custom-signs" },
  { name: "Vinyl Wraps", href: "/vinyl-wraps" },
  { name: "Business Signage", href: "/business-signage" },
  { name: "Dance Floor Wraps", href: "/dance-floor-wraps" },
  { name: "Wall Wraps", href: "/wall-wraps" },
  { name: "Window Wraps", href: "/window-wraps" },
  { name: "Channel Letters & Signage", href: "/channel-letters-signage" },
  { name: "Custom Neon Signs", href: "/custom-neon-signs" },
];

/* ─── PORTFOLIO DATA ─── */
export const PORTFOLIO_CATEGORIES = ["ALL", "VEHICLE WRAPS", "SIGNAGE", "PRINTING", "APPAREL", "DIGITAL"];

export const PORTFOLIO = [
  { title: "TACO KING TRUCK", category: "VEHICLE WRAPS", filter: "VEHICLE WRAPS", angle: 12 },
  { title: "BBQ NATION TRAILER", category: "VEHICLE WRAPS", filter: "VEHICLE WRAPS", angle: -8 },
  { title: "NEON DISTRICT SIGN", category: "LED CHANNEL", filter: "SIGNAGE", angle: 5 },
  { title: "DOWNTOWN STOREFRONT", category: "MONUMENT SIGN", filter: "SIGNAGE", angle: -15 },
  { title: "APEX GYM UNIFORMS", category: "CUSTOM UNIFORMS", filter: "APPAREL", angle: 20 },
  { title: "LOCAL LEAGUE JERSEYS", category: "SPORTING WEAR", filter: "APPAREL", angle: -5 },
  { title: "LAKESIDE COFFEE WRAP", category: "WINDOW WRAP", filter: "PRINTING", angle: 10 },
  { title: "WATERPROOF MENU SET", category: "MENU DESIGN", filter: "PRINTING", angle: -12 },
  { title: "SOCIAL MEDIA CAMPAIGN", category: "CONTENT MARKETING", filter: "DIGITAL", angle: 7 },
  { title: "DIGITAL MENU BOARD", category: "DIGITAL SIGNAGE", filter: "DIGITAL", angle: -9 },
  { title: "FLEET WRAP — 5 VANS", category: "VEHICLE WRAPS", filter: "VEHICLE WRAPS", angle: 15 },
  { title: "BREWERY WINDOW ART", category: "WINDOW WRAP", filter: "PRINTING", angle: -6 },
];

/* ─── STATS DATA ─── */
export const STATS = [
  { value: "2017", label: "ESTABLISHED" },
  { value: "46%", label: "DESIGN DRIVEN" },
  { value: "70%", label: "SERVICE FOCUSED" },
  { value: "59%", label: "REPAIR SPECIALISTS" },
];

/* ─── ANIMATION VARIANTS ─── */
export const snapUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
export const snapLeft = {
  hidden: { opacity: 0, x: -120 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
export const snapRight = {
  hidden: { opacity: 0, x: 120 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
export const snapScale = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
export const slideRotateLeft = {
  hidden: { opacity: 0, x: -100, rotate: -5 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
export const slideRotateRight = {
  hidden: { opacity: 0, x: 100, rotate: 5 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
export const flipUp = {
  hidden: { opacity: 0, y: 60, rotateX: 15 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
