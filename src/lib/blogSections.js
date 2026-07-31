export const BLOG_SECTION_DEFS = [
  { key: 'summary', labelFr: 'Résumé', labelEn: 'Summary', fieldFr: 'summaryFr', fieldEn: 'summaryEn' },
  { key: 'introduction', labelFr: 'Introduction', labelEn: 'Introduction', fieldFr: 'introductionFr', fieldEn: 'introductionEn' },
  { key: 'body', labelFr: 'Corps', labelEn: 'Body', fieldFr: 'bodyFr', fieldEn: 'bodyEn' },
  { key: 'conclusion', labelFr: 'Conclusion', labelEn: 'Conclusion', fieldFr: 'conclusionFr', fieldEn: 'conclusionEn' },
];

export function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
}

export function getFilledSections(post, lang = 'fr') {
  return BLOG_SECTION_DEFS.map((def) => {
    const content = lang === 'en' ? post[def.fieldEn] : post[def.fieldFr];
    const fallback = post[def.fieldFr];
    const html = (lang === 'en' && content) ? content : (fallback || content);
    return {
      key: def.key,
      label: lang === 'en' ? def.labelEn : def.labelFr,
      content: html || '',
    };
  }).filter((s) => stripHtml(s.content).length > 0);
}
