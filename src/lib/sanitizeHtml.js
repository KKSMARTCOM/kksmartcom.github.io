const ALLOWED_TAGS = new Set(['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'h2', 'h3', 'h4', 'blockquote', 'a']);

/**
 * Minimal allow-list sanitizer for CMS rich text. It removes executable tags,
 * event attributes and unsafe URLs before persisted HTML is rendered publicly.
 */
export function sanitizeHtml(value = '') {
  return String(value)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (match, rawTag, rawAttrs = '') => {
      const tag = rawTag.toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) return '';
      if (match.startsWith('</')) return `</${tag}>`;
      if (tag !== 'a') return `<${tag}>`;
      const href = rawAttrs.match(/\bhref\s*=\s*["']?([^"'\s>]+)/i)?.[1] || '';
      const isSafeHref = /^(https?:\/\/|mailto:|\/|#)/i.test(href);
      return isSafeHref ? `<a href="${href.replace(/"/g, '&quot;')}" rel="noopener noreferrer">` : '<a>';
    });
}
