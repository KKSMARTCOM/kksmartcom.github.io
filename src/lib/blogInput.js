import { sanitizeHtml } from '@/lib/sanitizeHtml';

export function sanitizeSections(value) {
  if (!Array.isArray(value)) return [];
  return value.map((section, index) => ({
    id: String(section.id || index + 1),
    title: String(section.title || '').slice(0, 180),
    content: sanitizeHtml(section.content || ''),
  })).filter((section) => section.title || section.content);
}

export function postData(body, existing = {}) {
  return {
    titleFr: body.titleFr ?? existing.titleFr,
    titleEn: body.titleEn !== undefined ? body.titleEn || null : existing.titleEn,
    
    summaryFr: body.summaryFr !== undefined ? body.summaryFr || null : existing.summaryFr,
    summaryEn: body.summaryEn !== undefined ? body.summaryEn || null : existing.summaryEn,
    
    introductionFr: body.introductionFr !== undefined ? sanitizeHtml(body.introductionFr) : existing.introductionFr,
    introductionEn: body.introductionEn !== undefined ? sanitizeHtml(body.introductionEn) : existing.introductionEn,
    
    bodyFr: body.bodyFr !== undefined ? sanitizeHtml(body.bodyFr) : existing.bodyFr,
    bodyEn: body.bodyEn !== undefined ? sanitizeHtml(body.bodyEn) : existing.bodyEn,
    
    conclusionFr: body.conclusionFr !== undefined ? sanitizeHtml(body.conclusionFr) : existing.conclusionFr,
    conclusionEn: body.conclusionEn !== undefined ? sanitizeHtml(body.conclusionEn) : existing.conclusionEn,
    
    sectionsFr: body.sectionsFr !== undefined ? sanitizeSections(body.sectionsFr) : existing.sectionsFr,
    sectionsEn: body.sectionsEn !== undefined ? sanitizeSections(body.sectionsEn) : existing.sectionsEn,
    
    coverImage: body.coverImage !== undefined ? body.coverImage || null : existing.coverImage,
    departmentId: body.departmentId === undefined ? existing.departmentId : (body.departmentId ? Number(body.departmentId) : null),
    
    subcategoryId: body.subcategoryId === undefined ? existing.subcategoryId : (body.subcategoryId ? Number(body.subcategoryId) : null),
    status: body.status ?? existing.status ?? 'draft',
  };
}
