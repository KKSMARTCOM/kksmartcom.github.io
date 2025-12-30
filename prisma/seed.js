// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tagsData = {
    "projectTypes": [
      { "slug": "all", "label": "All projects", "href": "/blog", "category": "projectType" },
      { "slug": "web-app", "label": "Web app", "href": "/blog?tags=web-app", "category": "projectType" },
      { "slug": "website", "label": "Website", "href": "/blog?tags=website", "category": "projectType" },
      { "slug": "branding", "label": "Branding", "href": "/blog?tags=branding", "category": "projectType" },
      { "slug": "mobile-app", "label": "Mobile app", "href": "/blog?tags=mobile-app", "category": "projectType" },
      { "slug": "3d-motion-design", "label": "3D motion design", "href": "/blog?tags=3d-motion-design", "category": "projectType" }
    ],
    "industries": [
      { "slug": "all", "label": "All industries", "href": "/blog", "category": "industry" },
      { "slug": "crypto-nft", "label": "Crypto & NFT", "href": "/blog?cat=crypto-nft", "category": "industry" },
      { "slug": "fintech", "label": "FinTech", "href": "/blog?cat=fintech", "category": "industry" },
      { "slug": "healthcare", "label": "Healthcare", "href": "/blog?cat=healthcare", "category": "industry" },
      { "slug": "saas", "label": "SaaS", "href": "/blog?cat=saas", "category": "industry" },
      { "slug": "education", "label": "Education", "href": "/blog?cat=education", "category": "industry" },
      { "slug": "ar-vr-meta", "label": "AR/VR & Meta", "href": "/blog?cat=ar-vr-meta", "category": "industry" },
      { "slug": "travel-booking", "label": "Travel & Booking", "href": "/blog?cat=travel-booking", "category": "industry" },
      { "slug": "other", "label": "Other", "href": "/blog?cat=other", "category": "industry" }
    ]
  };

  console.log("Nettoyage des anciens tags...");
  await prisma.tag.deleteMany({});

  console.log("Importation des nouveaux tags...");
  
  const allTags = [...tagsData.projectTypes, ...tagsData.industries];

  for (const tag of allTags) {
    await prisma.tag.create({
      data: tag
    });
  }

  console.log("✅ Importation terminée !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });