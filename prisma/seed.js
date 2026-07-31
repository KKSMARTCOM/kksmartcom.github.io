const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seed en cours...');

  // Admin par défaut
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@kksmartcom.com';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin && adminPassword) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Admin KK SMART COM',
        password: await bcrypt.hash(adminPassword, 10),
      },
    });
    console.log(`✅ Utilisateur admin créé (${adminEmail})`);
  } else if (!existingAdmin) {
    console.warn('⚠️ Admin non créé : définissez SEED_ADMIN_PASSWORD avant de lancer le seed.');
  }

  // Tags portfolio (conservés)
  const tagCount = await prisma.tag.count();
  if (tagCount === 0) {
    const tags = [
      { slug: 'all', label: 'All projects', href: '/blog', category: 'projectType' },
      { slug: 'web-app', label: 'Web app', href: '/blog?tags=web-app', category: 'projectType' },
      { slug: 'website', label: 'Website', href: '/blog?tags=website', category: 'projectType' },
      { slug: 'branding', label: 'Branding', href: '/blog?tags=branding', category: 'projectType' },
      { slug: 'mobile-app', label: 'Mobile app', href: '/blog?tags=mobile-app', category: 'projectType' },
      { slug: 'fintech', label: 'FinTech', href: '/blog?cat=fintech', category: 'industry' },
      { slug: 'healthcare', label: 'Healthcare', href: '/blog?cat=healthcare', category: 'industry' },
    ];
    for (const tag of tags) {
      await prisma.tag.create({ data: tag });
    }
    console.log('✅ Tags importés');
  }

  // Catégories de services
  const catCount = await prisma.serviceCategory.count();
  if (catCount === 0) {
    const digital = await prisma.serviceCategory.create({
      data: { slug: 'digital', order: 0, titleFr: 'Digital', titleEn: 'Digital' },
    });
    const design = await prisma.serviceCategory.create({
      data: { slug: 'design', order: 1, titleFr: 'Design', titleEn: 'Design' },
    });
    const studio = await prisma.serviceCategory.create({
      data: { slug: 'studio', order: 2, titleFr: 'Studio', titleEn: 'Studio' },
    });

    const navServices = [
      { slug: 'reseaux-sociaux', categoryId: digital.id, order: 0, titleFr: 'Réseaux sociaux', titleEn: 'Social media', showInNav: true },
      { slug: 'design-web', categoryId: digital.id, order: 1, titleFr: 'Design Web', titleEn: 'Web Design', showInNav: true },
      { slug: 'sites-web', categoryId: digital.id, order: 2, titleFr: 'Sites Web', titleEn: 'Websites', showInNav: true },
      { slug: 'applications-web', categoryId: digital.id, order: 3, titleFr: 'Applications web', titleEn: 'Web applications', showInNav: true },
      { slug: 'applications-mobile', categoryId: digital.id, order: 4, titleFr: 'Applications Mobile', titleEn: 'Mobile applications', showInNav: true },
      { slug: 'identite-marque', categoryId: design.id, order: 0, titleFr: 'Identité de marque', titleEn: 'Brand identity', showInNav: true },
      { slug: 'graphisme', categoryId: design.id, order: 1, titleFr: 'Graphisme', titleEn: 'Graphics', showInNav: true },
      { slug: 'impression-numerique', categoryId: design.id, order: 2, titleFr: 'Impression numérique', titleEn: 'Digital printing', showInNav: true },
      { slug: 'photographie', categoryId: studio.id, order: 0, titleFr: 'Photographie', titleEn: 'Photography', showInNav: true },
      { slug: 'videographie', categoryId: studio.id, order: 1, titleFr: 'Vidéographie', titleEn: 'Videography', showInNav: true },
    ];

    for (const s of navServices) {
      await prisma.service.create({ data: { ...s, href: '#', isPublished: true } });
    }

    const homepageServices = [
      {
        slug: 'kk-smart-digital',
        categoryId: digital.id,
        order: 0,
        titleFr: 'KK SMART DIGITAL - WEBSITE PORTFOLIO',
        titleEn: 'KK SMART DIGITAL - WEBSITE PORTFOLIO',
        descriptionFr: 'KK SMART DIGITAL propose de communiquer là où sont vos cibles, en utilisant des stratégies sociales marketing, inbound marketing, création de contenus, référencement naturel, publicités en ligne, publicités mobiles…',
        descriptionEn: 'KK SMART DIGITAL offers to communicate where your targets are, using social marketing strategies, inbound marketing, content creation, natural referencing, online advertising, mobile advertising…',
        href: 'https://www.behance.net/gallery/182237251/KK-SMART-DIGITAL-WEBSITE-PORTFOLIO-2023',
        imageUrl: '/assets/projets/digital.png',
        imageAltFr: 'KK SMART DIGITAL - WEBSITE PORTFOLIO',
        showInNav: false,
        showOnHomepage: true,
      },
      {
        slug: 'kk-smart-design',
        categoryId: design.id,
        order: 1,
        titleFr: 'KK SMART DESIGN - PORTFOLIO',
        titleEn: 'KK SMART DESIGN - PORTFOLIO',
        descriptionFr: 'KK SMART DESIGN met tout en œuvre pour développer votre marque au travers de votre identité visuelle.',
        descriptionEn: 'KK SMART DESIGN does everything to develop your brand through your visual identity.',
        href: 'https://www.behance.net/gallery/182231733/KK-SMART-DESIGN-PORTFOLIO-2023',
        imageUrl: '/assets/projets/design.png',
        imageAltFr: 'KK SMART DESIGN - PORTFOLIO',
        showInNav: false,
        showOnHomepage: true,
      },
      {
        slug: 'kk-smart-studio-photobook',
        categoryId: studio.id,
        order: 2,
        titleFr: 'KK SMART STUDIO - PHOTOBOOK',
        titleEn: 'KK SMART STUDIO - PHOTOBOOK',
        descriptionFr: 'KK SMART STUDIO vous offre le meilleur accompagnement pour réaliser, produire et diffuser vos vidéos publicitaires.',
        descriptionEn: 'KK SMART STUDIO offers the best support to produce and distribute your advertising videos.',
        href: 'https://www.behance.net/gallery/174863971/KK-SMART-STUDIO-PHOTOBOOK-2023',
        imageUrl: '/assets/projets/studiobook.png',
        imageAltFr: 'KK SMART STUDIO - PHOTOBOOK',
        showInNav: false,
        showOnHomepage: true,
      },
      {
        slug: 'kk-smart-studio-produits',
        categoryId: studio.id,
        order: 3,
        titleFr: 'KK SMART STUDIO - PHOTOS PRODUITS',
        titleEn: 'KK SMART STUDIO - PRODUCT PHOTOS',
        descriptionFr: 'KK SMART STUDIO réalise les photos packshots de vos produits, mis en scène en studio ou en extérieur.',
        descriptionEn: 'KK SMART STUDIO produces packshot photos of your products, staged in studio or outdoors.',
        href: 'https://www.behance.net/gallery/174850339/KK-SMART-STUDIO-PHOTOS-PRODUITS-2023',
        imageUrl: '/assets/projets/studioproduits.png',
        imageAltFr: 'KK SMART STUDIO - PHOTOS PRODUITS',
        showInNav: false,
        showOnHomepage: true,
      },
    ];

    for (const s of homepageServices) {
      await prisma.service.create({ data: { ...s, isPublished: true } });
    }

    console.log('✅ Catégories et services importés');
  }

  // Offres d'emploi exemple
  const jobCount = await prisma.jobOffer.count();
  if (jobCount === 0) {
    await prisma.jobOffer.create({
      data: {
        slug: 'designer-graphique',
        status: 'published',
        titleFr: 'Designer graphique',
        titleEn: 'Graphic designer',
        descriptionFr: '<p>Nous recherchons un(e) designer graphique créatif(ve) pour rejoindre notre équipe à Cotonou.</p><ul><li>Maîtrise de la suite Adobe</li><li>Expérience en identité visuelle</li><li>Esprit d\'équipe</li></ul>',
        descriptionEn: '<p>We are looking for a creative graphic designer to join our team in Cotonou.</p>',
        location: 'Cotonou, Bénin',
        contractType: 'CDI',
        department: 'Design',
        applicationEmail: 'hello@kksmartcom.com',
        publishedAt: new Date(),
      },
    });
    await prisma.jobOffer.create({
      data: {
        slug: 'developpeur-web',
        status: 'published',
        titleFr: 'Développeur web',
        titleEn: 'Web developer',
        descriptionFr: '<p>Rejoignez notre pôle développement pour concevoir des applications web modernes.</p>',
        location: 'Cotonou, Bénin',
        contractType: 'CDD',
        department: 'Digital',
        applicationEmail: 'hello@kksmartcom.com',
        publishedAt: new Date(),
      },
    });
    console.log('✅ Offres d\'emploi importées');
  }

  // Taxonomie minimale du blog éditorial
  const departmentCount = await prisma.blogDepartment.count();
  if (departmentCount === 0) {
    const digitalDepartment = await prisma.blogDepartment.create({
      data: { slug: 'digital', nameFr: 'Digital', nameEn: 'Digital', order: 0 },
    });
    const designDepartment = await prisma.blogDepartment.create({
      data: { slug: 'design', nameFr: 'Design', nameEn: 'Design', order: 1 },
    });
    await prisma.blogSubcategory.createMany({
      data: [
        { slug: 'strategie-digitale', nameFr: 'Stratégie digitale', nameEn: 'Digital strategy', departmentId: digitalDepartment.id, order: 0 },
        { slug: 'developpement-web', nameFr: 'Développement web', nameEn: 'Web development', departmentId: digitalDepartment.id, order: 1 },
        { slug: 'identite-visuelle', nameFr: 'Identité visuelle', nameEn: 'Visual identity', departmentId: designDepartment.id, order: 0 },
      ],
    });
    console.log('✅ Taxonomie du blog importée');
  }

  console.log('🎉 Seed terminé !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
