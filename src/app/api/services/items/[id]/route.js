import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/apiMiddleware';
import { uniqueSlug } from '@/lib/slug';
import { formatServiceItem } from '@/lib/cmsFormatters';
import { safeLink } from '@/lib/safeUrl';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const service = await prisma.service.findUnique({
      where: { id: parseInt(id, 10) },
      include: { category: true },
    });

    if (!service) {
      return NextResponse.json({ message: 'Service non trouvé.' }, { status: 404 });
    }

    return NextResponse.json({ service: formatServiceItem(service) });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}

async function updateServiceHandler(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const existing = await prisma.service.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existing) {
      return NextResponse.json({ message: 'Service non trouvé.' }, { status: 404 });
    }

    const data = {
      titleFr: body.titleFr ?? existing.titleFr,
      titleEn: body.titleEn !== undefined ? body.titleEn : existing.titleEn,
      descriptionFr: body.descriptionFr !== undefined ? body.descriptionFr : existing.descriptionFr,
      descriptionEn: body.descriptionEn !== undefined ? body.descriptionEn : existing.descriptionEn,
      categoryId: body.categoryId !== undefined ? parseInt(body.categoryId, 10) : existing.categoryId,
      href: body.href !== undefined ? safeLink(body.href) : existing.href,
      imageUrl: body.imageUrl !== undefined ? body.imageUrl : existing.imageUrl,
      imageAltFr: body.imageAltFr !== undefined ? body.imageAltFr : existing.imageAltFr,
      imageAltEn: body.imageAltEn !== undefined ? body.imageAltEn : existing.imageAltEn,
      order: body.order !== undefined ? body.order : existing.order,
      isPublished: body.isPublished !== undefined ? body.isPublished : existing.isPublished,
      showInNav: body.showInNav !== undefined ? body.showInNav : existing.showInNav,
      showOnHomepage: body.showOnHomepage !== undefined ? body.showOnHomepage : existing.showOnHomepage,
    };

    if (body.slug && body.slug !== existing.slug) {
      data.slug = await uniqueSlug(body.slug, (s) =>
        prisma.service.findFirst({ where: { slug: s, NOT: { id: existing.id } } }).then(Boolean)
      );
    }

    const service = await prisma.service.update({
      where: { id: parseInt(id, 10) },
      data,
      include: { category: true },
    });

    return NextResponse.json({ service: formatServiceItem(service) });
  } catch (error) {
    console.error('PUT /api/services/items/[id]:', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}

async function deleteServiceHandler(request, { params }) {
  try {
    const { id } = await params;
    await prisma.service.delete({ where: { id: parseInt(id, 10) } });
    return NextResponse.json({ message: 'Service supprimé.' });
  } catch (error) {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}

export const PUT = requireAuth(updateServiceHandler);
export const DELETE = requireAuth(deleteServiceHandler);
