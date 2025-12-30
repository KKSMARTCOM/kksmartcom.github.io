import prisma from './db';

/**
 * Génère un nouvel ID pour un article en incrémentant l'ID le plus élevé existant
 * @returns {Promise<number>} Le nouvel ID
 */
export async function generateNewArticleId() {
  try {
    // Trouve l'article avec l'ID le plus élevé
    const lastArticle = await prisma.article.findFirst({
      select: { id: true },
      orderBy: { id: 'desc' },
    });

    // Si aucun article n'existe, on commence à 1
    const lastId = lastArticle ? parseInt(lastArticle.id) : 0;
    return lastId + 1;
  } catch (error) {
    console.error('Erreur lors de la génération du nouvel ID:', error);
    // En cas d'erreur, on retourne un timestamp comme fallback
    return Date.now();
  }
}

/**
 * Génère une URL propre (slug) à partir d'une chaîne
 * @param {string} str - La chaîne à transformer en slug
 * @returns {string} Le slug généré
 */
function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Remplace les espaces par des tirets
    .replace(/[^\w\-]+/g, '')      // Supprime les caractères non alphanumériques
    .replace(/\-\-+/g, '-')        // Remplace les tirets multiples par un seul
    .replace(/^-+/, '')             // Supprime les tirets du début
    .replace(/-+$/, '');            // Supprime les tirets de fin
}

/**
 * Génère une URL pour un type de contenu spécifique
 * @param {string} type - Le type de contenu ('article', 'tag', 'categorie', etc.)
 * @param {string|number} identifier - L'identifiant ou le nom du contenu
 * @param {string} [baseUrl] - L'URL de base (optionnelle, par défaut vide pour les chemins relatifs)
 * @returns {string} L'URL générée
 */
export function generateUrl(type, identifier, baseUrl = '') {
  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const id = typeof identifier === 'number' ? identifier : slugify(identifier);
  
  switch (type.toLowerCase()) {
    case 'article':
      return `${base}/blog/${id}`;
    case 'tag':
      return `${base}/blog/tag/${id}`;
    case 'categorie':
      return `${base}/blog/categorie/${id}`;
    case 'auteur':
      return `${base}/auteur/${id}`;
    default:
      return `${base}/${type}/${id}`;
  }
}

/**
 * Récupère l'ID à partir d'une URL de type article/tag
 * @param {string} type - Le type de contenu ('article', 'tag', etc.)
 * @param {string} url - L'URL à analyser
 * @returns {string|null} L'ID extrait ou null si non trouvé
 */
export function getIdFromUrl(type, url) {
  const match = url.match(new RegExp(`/${type}s?/([^/]+)`));
  return match ? match[1] : null;
}
