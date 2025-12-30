import { getAllCards} from './dataManager';



/**
 * Filtre les cartes d'articles en fonction des tags sélectionnés, de la langue et du nombre de résultats
 * @param {Array} tagNames - Tableau des noms de tags à filtrer
 * @param {string} lang - La langue des cartes ('fr' ou 'en')
 * @param {number} limit - Nombre maximum de cartes à retourner (optionnel, par défaut toutes)
 * @returns {Array} - Tableau des cartes filtrées
 */
export function filterProjects(tagNames = [], lang = 'fr', limit = null) {
  // Récupérer toutes les cartes selon la langue
  const allCards = getAllCards(lang);
  
  if (!tagNames || tagNames.length === 0) {
    // Si pas de tags, retourner toutes les cartes (avec limite si spécifiée)
    return limit ? allCards.slice(0, limit) : allCards;
  }

  // Filtrer les cartes qui ont au moins un des tags spécifiés
  const filteredCards = allCards.filter(card => 
    tagNames.some(tagName => 
      card.tags && card.tags.some(tag => 
        tag.slug.toLowerCase() === tagName.toLowerCase()
      )
    )
  );

  // Appliquer la limite si spécifiée
  return limit ? filteredCards.slice(0, limit) : filteredCards;
}


