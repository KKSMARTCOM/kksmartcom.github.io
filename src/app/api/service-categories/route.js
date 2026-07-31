import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/apiMiddleware';
import { uniqueSlug } from '@/lib/slug';
import { formatServiceCategory } from '@/lib/cmsFormatters';

async function getCategoriesHandler() {
  try {
    const categories = await prisma.serviceCategory.findMany({
      orderBy: { order: 'asc' },
      include: {
        services: { orderBy: { order: 'asc' }, include: { category: true } },
      },
    });

    return NextResponse.json({
      categories: categories.map((c) => formatServiceCategory(c, 'fr', true)),
    });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}

export const GET = requireAuth(getCategoriesHandler);

async function createCategoryHandler(request) {
  try {
    const body = await request.json();
    const { titleFr, titleEn, order = 0, slug: customSlug } = body;

    if (!titleFr) {
      return NextResponse.json({ message: 'Titre FR requis.' }, { status: 400 });
    }

    const slug = customSlug
      ? customSlug
      : await uniqueSlug(titleFr, (s) =>
          prisma.serviceCategory.findUnique({ where: { slug: s } }).then(Boolean)
        );

    const category = await prisma.serviceCategory.create({
      data: { slug, titleFr, titleEn: titleEn || null, order },
      include: { services: true },
    });

    return NextResponse.json({ category: formatServiceCategory(category, 'fr', true) }, { status: 201 });
  } catch (error) {
    console.error('POST /api/service-categories:', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}

export const POST = requireAuth(createCategoryHandler);
