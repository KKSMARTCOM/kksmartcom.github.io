import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/apiMiddleware';
import { uniqueSlug } from '@/lib/slug';
import { formatServiceItem } from '@/lib/cmsFormatters';
import { safeLink } from '@/lib/safeUrl';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'fr';
    const categoryId = searchParams.get('categoryId');

    const where = {};
    if (categoryId) where.categoryId = parseInt(categoryId, 10);

    const services = await prisma.service.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      include: { category: true },
    });

    return NextResponse.json({
      services: services.map((s) => formatServiceItem(s, lang)),
    });
  } catch (error) {
    console.error('GET /api/services/items:', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}

async function createServiceHandler(request) {
  try {
    const body = await request.json();
    const {
      titleFr,
      titleEn,
      descriptionFr,
      descriptionEn,
      categoryId,
      href = '#',
      imageUrl,
      imageAltFr,
      imageAltEn,
      order = 0,
      isPublished = true,
      showInNav = true,
      showOnHomepage = false,
      slug: customSlug,
    } = body;

    if (!titleFr || !categoryId) {
      return NextResponse.json(
        { message: 'Titre FR et catégorie requis.' },
        { status: 400 }
      );
    }

    const category = await prisma.serviceCategory.findUnique({
      where: { id: parseInt(categoryId, 10) },
    });
    if (!category) {
      return NextResponse.json({ message: 'Catégorie invalide.' }, { status: 400 });
    }

    const slug = customSlug
      ? customSlug
      : await uniqueSlug(titleFr, (s) =>
          prisma.service.findUnique({ where: { slug: s } }).then(Boolean)
        );

    const service = await prisma.service.create({
      data: {
        slug,
        categoryId: parseInt(categoryId, 10),
        titleFr,
        titleEn: titleEn || null,
        descriptionFr: descriptionFr || null,
        descriptionEn: descriptionEn || null,
        href: safeLink(href),
        imageUrl: imageUrl || null,
        imageAltFr: imageAltFr || null,
        imageAltEn: imageAltEn || null,
        order,
        isPublished,
        showInNav,
        showOnHomepage,
      },
      include: { category: true },
    });

    return NextResponse.json({ service: formatServiceItem(service) }, { status: 201 });
  } catch (error) {
    console.error('POST /api/services/items:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ message: 'Ce slug existe déjà.' }, { status: 409 });
    }
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}

export const POST = requireAuth(createServiceHandler);
