/**
 * Simple in-memory rate limiter for auth endpoints.
 * In production, replace with Redis-based rate limiting.
 */
const attempts = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 10; // max attempts per window

// Cleanup old entries every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, val] of attempts) {
        if (val.resetAt < now) attempts.delete(key);
    }
}, 5 * 60 * 1000);

export const checkRateLimit = (identifier: string): { allowed: boolean; retryAfterMs?: number } => {
    const now = Date.now();
    const entry = attempts.get(identifier);

    if (!entry || entry.resetAt < now) {
        attempts.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
        return { allowed: true };
    }

    entry.count++;
    if (entry.count > MAX_ATTEMPTS) {
        return { allowed: false, retryAfterMs: entry.resetAt - now };
    }

    return { allowed: true };
};
