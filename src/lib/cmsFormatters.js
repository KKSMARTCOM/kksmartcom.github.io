export function formatServiceCategory(category, lang = 'fr', includeAllServices = false) {
  const services = (category.services || [])
    .filter((s) => includeAllServices || s.isPublished)
    .map((s) => formatServiceItem(s, lang));

  return {
    id: category.id,
    slug: category.slug,
    order: category.order,
    title: lang === 'en' && category.titleEn ? category.titleEn : category.titleFr,
    titleFr: category.titleFr,
    titleEn: category.titleEn,
    services,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
}

export function formatServiceItem(service, lang = 'fr') {
  return {
    id: service.id,
    slug: service.slug,
    categoryId: service.categoryId,
    order: service.order,
    title: lang === 'en' && service.titleEn ? service.titleEn : service.titleFr,
    titleFr: service.titleFr,
    titleEn: service.titleEn,
    description: lang === 'en' && service.descriptionEn ? service.descriptionEn : service.descriptionFr,
    descriptionFr: service.descriptionFr,
    descriptionEn: service.descriptionEn,
    href: service.href,
    imageUrl: service.imageUrl,
    imageAlt: lang === 'en' && service.imageAltEn ? service.imageAltEn : service.imageAltFr,
    imageAltFr: service.imageAltFr,
    imageAltEn: service.imageAltEn,
    isPublished: service.isPublished,
    showInNav: service.showInNav,
    showOnHomepage: service.showOnHomepage,
    category: service.category
      ? {
          id: service.category.id,
          slug: service.category.slug,
          title: lang === 'en' && service.category.titleEn ? service.category.titleEn : service.category.titleFr,
        }
      : undefined,
    createdAt: service.createdAt,
    updatedAt: service.updatedAt,
  };
}

export function formatJobOffer(job, lang = 'fr') {
  return {
    id: job.id,
    slug: job.slug,
    status: job.status,
    title: lang === 'en' && job.titleEn ? job.titleEn : job.titleFr,
    titleFr: job.titleFr,
    titleEn: job.titleEn,
    description: lang === 'en' && job.descriptionEn ? job.descriptionEn : job.descriptionFr,
    descriptionFr: job.descriptionFr,
    descriptionEn: job.descriptionEn,
    location: job.location,
    contractType: job.contractType,
    department: job.department,
    applicationEmail: job.applicationEmail,
    publishedAt: job.publishedAt,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
  };
}

export function formatBlogDepartment(dept, lang = 'fr', all = false) {
  return {
    id: dept.id,
    slug: dept.slug,
    order: dept.order,
    name: lang === 'en' && dept.nameEn ? dept.nameEn : dept.nameFr,
    nameFr: dept.nameFr,
    nameEn: dept.nameEn,
    subcategories: (dept.subcategories || []).map((s) => formatBlogSubcategory(s, lang)),
    posts: all ? (dept.posts || []) : undefined,
  };
}

export function formatBlogSubcategory(sub, lang = 'fr') {
  return {
    id: sub.id,
    slug: sub.slug,
    order: sub.order,
    departmentId: sub.departmentId,
    name: lang === 'en' && sub.nameEn ? sub.nameEn : sub.nameFr,
    nameFr: sub.nameFr,
    nameEn: sub.nameEn,
  };
}

export function formatBlogPost(post, lang = 'fr') {
  return {
    id: post.id,
    slug: post.slug,
    status: post.status,
    title: lang === 'en' && post.titleEn ? post.titleEn : post.titleFr,
    titleFr: post.titleFr,
    titleEn: post.titleEn,
    summaryFr: post.summaryFr,
    summaryEn: post.summaryEn,
    introductionFr: post.introductionFr,
    introductionEn: post.introductionEn,
    bodyFr: post.bodyFr,
    bodyEn: post.bodyEn,
    conclusionFr: post.conclusionFr,
    conclusionEn: post.conclusionEn,
    sectionsFr: post.sectionsFr,
    sectionsEn: post.sectionsEn,
    coverImage: post.coverImage,
    departmentId: post.departmentId,
    subcategoryId: post.subcategoryId,
    department: post.department ? formatBlogDepartment(post.department, lang) : null,
    subcategory: post.subcategory ? formatBlogSubcategory(post.subcategory, lang) : null,
    author: post.author ? { id: post.author.id, name: post.author.name, email: post.author.email } : null,
    publishedAt: post.publishedAt,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}
