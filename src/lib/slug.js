export function slugify(text) {
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function uniqueSlug(base, existsCheck) {
  let slug = slugify(base);
  if (!slug) slug = 'item';
  let candidate = slug;
  let i = 1;
  while (await existsCheck(candidate)) {
    candidate = `${slug}-${i}`;
    i += 1;
  }
  return candidate;
}
