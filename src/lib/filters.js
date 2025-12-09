// Données des projets
export const projects = [
  {
    id: 1,
    url: "/projets/site-ecommerce",
    title: "Site E-commerce",
    images: {
      x1: "/assets/projets/projet1.jpeg",
      x2: "/assets/projets/projet1.jpeg",
      x3: "/assets/projets/projet1.jpeg"
    },
    tags: [
      { name: "Santé", url: "/tag/santé" },
      { name: "E-commerce", url: "/tag/ecommerce" }
    ],
    description: "Une plateforme e-commerce complète avec paiement en ligne."
  },
  {
    id: 2,
    url: "/projets/application-mobile",
    title: "Application Mobile",
    images: {
      x1: "/assets/projets/projet2.png",
      x2: "/assets/projets/projet2.png",
      x3: "/assets/projets/projet2.png"
    },
    tags: [
      { name: "Santé", url: "/tag/mobile" },
      { name: "iOS", url: "/tag/ios" },
      { name: "Android", url: "/tag/android" }
    ],
    description: "Application mobile multiplateforme pour la gestion de tâches."
  },
  {
    id: 3,
    url: "/projets/design-interface",
    title: "Design d'Interface",
    images: {
      x1: "/assets/projets/projet3.jpeg",
      x2: "/assets/projets/projet3.jpeg",
      x3: "/assets/projets/projet3.jpeg"
    },
    tags: [
      { name: "UI/UX", url: "/tag/ui-ux" },
      { name: "Design", url: "/tag/design" }
    ],
    description: "Conception d'interface utilisateur moderne et intuitive."
  },
  {
    id: 4,
    url: "/projets/saas-entreprise",
    title: "Solution SaaS",
    images: {
      x1: "/assets/projets/projet4.jpeg",
      x2: "/assets/projets/projet4.jpeg",
      x3: "/assets/projets/projet4.jpeg"
    },
    tags: [
      { name: "SaaS", url: "/tag/saas" },
      { name: "Cloud", url: "/tag/cloud" }
    ],
    description: "Solution logicielle en tant que service pour les entreprises."
  }
];

/**
 * Filtre les projets en fonction des tags sélectionnés
 * @param {Array} tagNames - Tableau des noms de tags à filtrer
 * @returns {Array} - Tableau des projets filtrés
 */
export function filterProjects(tagNames = []) {
  if (!tagNames || tagNames.length === 0) {
    return projects;
  }

  return projects.filter(project => 
    tagNames.some(tagName => 
      project.tags.some(tag => 
        tag.name.toLowerCase() === tagName.toLowerCase()
      )
    )
  );
}

/**
 * Récupère tous les tags uniques depuis les projets
 * @returns {Array} - Tableau des tags uniques
 */
export function getAllTags() {
  const tags = new Set();
  
  projects.forEach(project => {
    project.tags?.forEach(tag => {
      tags.add(JSON.stringify({ name: tag.name, url: tag.url }));
    });
  });

  return Array.from(tags).map(tag => JSON.parse(tag));
}
