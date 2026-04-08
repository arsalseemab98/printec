/**
 * Server-side anti-spam utilities for form submissions.
 * - Cloudflare Turnstile verification
 * - Email format validation
 * - Honeypot field detection
 * - Timing-based bot detection
 */

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY || "";
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Minimum seconds a human would need to fill a form
const MIN_FORM_TIME_MS = 3000;

export interface AntiSpamResult {
  ok: boolean;
  error?: string;
}

/**
 * Verify a Cloudflare Turnstile token server-side.
 */
export async function verifyTurnstile(token: string | undefined): Promise<AntiSpamResult> {
  // Skip Turnstile if secret key is not configured
  if (!TURNSTILE_SECRET || TURNSTILE_SECRET === "your-secret-key-here") {
    return { ok: true };
  }

  if (!token) {
    return { ok: false, error: "Please complete the security check." };
  }

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET,
        response: token,
      }),
    });

    const data = await res.json();
    if (!data.success) {
      console.warn("[AntiSpam] Turnstile verification failed:", data["error-codes"]);
      return { ok: false, error: "Security check failed. Please try again." };
    }

    return { ok: true };
  } catch (err) {
    console.error("[AntiSpam] Turnstile verification error:", err);
    // Fail open — don't block real customers if Turnstile is down
    return { ok: true };
  }
}

/**
 * Validate email format server-side.
 */
export function validateEmail(email: string): AntiSpamResult {
  if (!email || !EMAIL_REGEX.test(email)) {
    return { ok: false, error: "Please provide a valid email address." };
  }
  // Must have at least one dot in the domain
  const domain = email.split("@")[1];
  if (!domain || !domain.includes(".")) {
    return { ok: false, error: "Please provide a valid email address." };
  }
  return { ok: true };
}

/**
 * Check if the honeypot field was filled (bots fill hidden fields).
 */
export function checkHoneypot(value: string | undefined): AntiSpamResult {
  if (value) {
    console.warn("[AntiSpam] Honeypot triggered");
    // Return success to the bot so it thinks submission went through
    return { ok: false, error: "__honeypot__" };
  }
  return { ok: true };
}

/**
 * Check form submission timing — reject if submitted too fast.
 * @param formLoadedAt - timestamp (ms) when the form was rendered
 */
export function checkTiming(formLoadedAt: number | undefined): AntiSpamResult {
  if (!formLoadedAt) {
    return { ok: true }; // Don't block if timestamp missing
  }
  const elapsed = Date.now() - formLoadedAt;
  if (elapsed < MIN_FORM_TIME_MS) {
    console.warn(`[AntiSpam] Form submitted too fast: ${elapsed}ms`);
    return { ok: false, error: "Please take a moment to fill out the form." };
  }
  return { ok: true };
}

/**
 * Detect gibberish / random strings that bots generate.
 * Real names have spaces, normal vowel ratios, and reasonable length.
 * Real messages have spaces and readable patterns.
 */
export function checkGibberish(name?: string, message?: string): AntiSpamResult {
  if (name) {
    // Name with no spaces and longer than 10 chars is suspicious (e.g. "pNCzSrofeWYqYHZcu")
    if (name.length > 10 && !name.includes(" ")) {
      console.warn(`[AntiSpam] Gibberish name detected: "${name}"`);
      return { ok: false, error: "__honeypot__" }; // Silent reject
    }

    // Check vowel ratio — random strings have ~15-20% vowels, English has ~35-45%
    if (name.length >= 6) {
      const vowels = name.match(/[aeiouAEIOU]/g)?.length || 0;
      const letters = name.match(/[a-zA-Z]/g)?.length || 1;
      const vowelRatio = vowels / letters;
      if (vowelRatio < 0.15) {
        console.warn(`[AntiSpam] Low vowel ratio in name: "${name}" (${(vowelRatio * 100).toFixed(0)}%)`);
        return { ok: false, error: "__honeypot__" };
      }
    }

    // Excessive mixed case in a single word (e.g. "pNCzSro") — real names are "John" not "jOhN"
    const nameWords = name.split(/\s+/);
    for (const word of nameWords) {
      if (word.length >= 5) {
        const upper = word.match(/[A-Z]/g)?.length || 0;
        const lower = word.match(/[a-z]/g)?.length || 0;
        // Random strings have mixed case throughout; real words have at most 1 uppercase (first letter)
        if (upper >= 2 && lower >= 2 && upper / (upper + lower) > 0.3) {
          console.warn(`[AntiSpam] Mixed case pattern in name: "${word}"`);
          return { ok: false, error: "__honeypot__" };
        }
      }
    }
  }

  if (message) {
    // Message with no spaces and longer than 12 chars is gibberish (e.g. "ySidLwybqINlmARubiRFCH")
    if (message.length > 12 && !message.includes(" ")) {
      console.warn(`[AntiSpam] Gibberish message detected: "${message}"`);
      return { ok: false, error: "__honeypot__" };
    }

    // Very short message with random characters (under 4 words, high consonant ratio)
    const words = message.trim().split(/\s+/);
    if (words.length <= 2 && message.length > 8) {
      const vowels = message.match(/[aeiouAEIOU]/g)?.length || 0;
      const letters = message.match(/[a-zA-Z]/g)?.length || 1;
      if (vowels / letters < 0.15) {
        console.warn(`[AntiSpam] Gibberish short message: "${message}"`);
        return { ok: false, error: "__honeypot__" };
      }
    }
  }

  return { ok: true };
}

/**
 * Run all anti-spam checks at once. Returns first failure or ok.
 */
export async function runAntiSpamChecks(params: {
  turnstileToken?: string;
  email: string;
  honeypot?: string;
  formLoadedAt?: number;
  name?: string;
  message?: string;
}): Promise<AntiSpamResult> {
  // 1. Honeypot — silent rejection
  const hp = checkHoneypot(params.honeypot);
  if (!hp.ok) return hp;

  // 2. Timing
  const timing = checkTiming(params.formLoadedAt);
  if (!timing.ok) return timing;

  // 3. Email validation
  const emailCheck = validateEmail(params.email);
  if (!emailCheck.ok) return emailCheck;

  // 4. Gibberish detection — catches smart bots with random strings
  const gibberish = checkGibberish(params.name, params.message);
  if (!gibberish.ok) return gibberish;

  // 5. Turnstile
  const turnstile = await verifyTurnstile(params.turnstileToken);
  if (!turnstile.ok) return turnstile;

  return { ok: true };
}
