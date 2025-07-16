/**
 * Canonical list of extractor back‑ends in the order they are attempted.
 * We expose this so the UI or logging layers can “state the methods used”.
 */
export const DOWNLOAD_METHODS = [
  'Snaptik',            // watermark‑free HD, primary
  'SSSTik',             // good HD fallback
  'Tikwm',              // HD + slideshow support
  'Direct TikTok HTML', // final HTML scrape fallback
] as const;
