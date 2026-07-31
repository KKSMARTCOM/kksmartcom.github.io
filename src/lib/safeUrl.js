export function safeLink(value, fallback = '#') {
  if (!value) return fallback;
  const url = String(value).trim();
  return /^(https?:\/\/|mailto:|\/|#)/i.test(url) ? url : fallback;
}
