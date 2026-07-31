import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/apiMiddleware';
import { uniqueSlug } from '@/lib/slug';
import { formatServiceCategory } from '@/lib/cmsFormatters';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const category = await prisma.serviceCategory.findUnique({
      where: { id: parseInt(id, 10) },
      include: { services: { orderBy: { order: 'asc' } } },
    });

    if (!category) {
      return NextResponse.json({ message: 'Catégorie non trouvée.' }, { status: 404 });
    }

    return NextResponse.json({ category: formatServiceCategory(category, 'fr', true) });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}

async function updateCategoryHandler(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const existing = await prisma.serviceCategory.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existing) {
      return NextResponse.json({ message: 'Catégorie non trouvée.' }, { status: 404 });
    }

    const data = {
      titleFr: body.titleFr ?? existing.titleFr,
      titleEn: body.titleEn !== undefined ? body.titleEn : existing.titleEn,
      order: body.order !== undefined ? body.order : existing.order,
    };

    if (body.slug && body.slug !== existing.slug) {
      data.slug = await uniqueSlug(body.slug, (s) =>
        prisma.serviceCategory.findFirst({ where: { slug: s, NOT: { id: existing.id } } }).then(Boolean)
      );
    }

    const category = await prisma.serviceCategory.update({
      where: { id: parseInt(id, 10) },
      data,
      include: { services: true },
    });

    return NextResponse.json({ category: formatServiceCategory(category, 'fr', true) });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}

async function deleteCategoryHandler(request, { params }) {
  try {
    const { id } = await params;
    await prisma.serviceCategory.delete({ where: { id: parseInt(id, 10) } });
    return NextResponse.json({ message: 'Catégorie supprimée.' });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}

export const PUT = requireAuth(updateCategoryHandler);
export const DELETE = requireAuth(deleteCategoryHandler);
