import siteData from '@/data/siteData.json';
import articlesData from '@/data/articlesData.json';

/**
 * Récupère les données pour un composant spécifique selon la langue.
 * 
 * @param {string} componentName - Le nom du composant pour lequel récupérer les données (ex: 'Hero').
 * @param {string} lang - Le code langue ('fr' ou 'en').
 * @returns {object | null} Les données du composant dans la langue spécifiée, ou null si non trouvé.
 */
export const getComponentData = (componentName, lang) => {
  if (siteData[componentName] && siteData[componentName][lang]) {
    return siteData[componentName][lang];
  }
  console.warn(`Data not found for component: ${componentName}, lang: ${lang}`);
  return {}; // Return an empty object to avoid errors on destructuring
};

/**
 * Récupère les données d'un article spécifique selon son ID et sa langue.
 * 
 * @param {string} articleId - L'ID de l'article à récupérer (ex: '1').
 * @param {string} lang - Le code langue ('fr' ou 'en').
 * @returns {object | null} Les données de l'article dans la langue spécifiée, ou null si non trouvé.
 */
export const getArticleById = (articleId, lang) => {
  console.log('getArticleById called with:', { articleId, lang });
  console.log('articlesData structure:', articlesData);
  console.log('articlesData.articles:', articlesData.articles);
  console.log('articlesData[articleId]:', articlesData[articleId]);
  
  if (articlesData.articles && articlesData.articles[articleId] && articlesData.articles[articleId][lang]) {
    console.log('Found article via articles.articles path');
    return articlesData.articles[articleId][lang];
  }
  
  // Try direct access (current structure)
  if (articlesData[articleId] && articlesData[articleId][lang]) {
    console.log('Found article via direct path');
    return articlesData[articleId][lang];
  }
  
  console.warn(`Article not found: ${articleId}, lang: ${lang}`);
  return {}; // Return an empty object to avoid errors on destructuring
};

/**
 * Récupère toutes les données des articles pour une langue spécifique.
 * 
 * @param {string} lang - Le code langue ('fr' ou 'en').
 * @returns {object} Toutes les données des articles dans la langue spécifiée, ou objet vide si aucun trouvé.
 */
export const getAllArticles = (lang) => {
  const articles = {};
  
  if (articlesData.articles) {
    Object.keys(articlesData.articles).forEach(articleId => {
      if (articlesData.articles[articleId] && articlesData.articles[articleId][lang]) {
        articles[articleId] = articlesData.articles[articleId][lang];
      }
    });
  }
  
  if (Object.keys(articles).length === 0) {
    console.warn(`No articles found for language: ${lang}`);
  }
  
  return articles;
};

/**
 * Récupère toutes les cartes de tous les articles pour une langue spécifique.
 * 
 * @param {string} lang - Le code langue ('fr' ou 'en').
 * @returns {Array} Tableau de toutes les cartes de tous les articles dans la langue spécifiée.
 */
export const getAllCards = (lang) => {
  const allCards = [];
  
  if (articlesData) {
    Object.keys(articlesData).forEach(articleId => {
      if (articlesData[articleId] && articlesData[articleId][lang]) {
        const article = articlesData[articleId][lang];
        if (article.cards && Array.isArray(article.cards)) {
          allCards.push(...article.cards);
        }
      }
    });
  }
  
  if (allCards.length === 0) {
    console.warn(`No cards found for language: ${lang}`);
  }
  
  return allCards;
};

/**
 * Récupère les cartes d'articles spécifiques par leurs IDs pour une langue spécifique.
 * 
 * @param {string} lang - Le code langue ('fr' ou 'en').
 * @param {string|Array} articleIds - ID d'article unique ou tableau d'IDs d'articles.
 * @returns {Array} Tableau des cartes des articles spécifiés.
 */
export const getCardsByIds = (lang, articleIds) => {
  const cards = [];
  const ids = Array.isArray(articleIds) ? articleIds : [articleIds];
  
  if (articlesData) {
    ids.forEach(articleId => {
      if (articlesData[articleId] && articlesData[articleId][lang]) {
        const article = articlesData[articleId][lang];
        if (article.cards && Array.isArray(article.cards)) {
          cards.push(...article.cards);
        }
      } else {
        console.warn(`Article not found: ${articleId}, lang: ${lang}`);
      }
    });
  }
  
  if (cards.length === 0) {
    console.warn(`No cards found for articles: ${ids.join(', ')}, lang: ${lang}`);
  }
  
  return cards;
};

