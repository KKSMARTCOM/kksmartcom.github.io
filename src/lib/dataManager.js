import siteData from '@/data/siteData.json';

/**
 * Retrieves data for a specific component based on language.
 * 
 * @param {string} componentName - The name of the component to get data for (e.g., 'Hero').
 * @param {string} lang - The language code ('fr' or 'en').
 * @returns {object | null} The data for the component in the specified language, or null if not found.
 */
export const getComponentData = (componentName, lang) => {
  if (siteData[componentName] && siteData[componentName][lang]) {
    return siteData[componentName][lang];
  }
  console.warn(`Data not found for component: ${componentName}, lang: ${lang}`);
  return {}; // Return an empty object to avoid errors on destructuring
};

