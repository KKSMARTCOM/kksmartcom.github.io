import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { formatServiceCategory, formatServiceItem } from '@/lib/cmsFormatters';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'fr';
    const nav = searchParams.get('nav') === 'true';
    const homepage = searchParams.get('homepage') === 'true';

    if (nav) {
      const categories = await prisma.serviceCategory.findMany({
        orderBy: { order: 'asc' },
        include: {
          services: {
            where: { isPublished: true, showInNav: true },
            orderBy: { order: 'asc' },
          },
        },
      });

      return NextResponse.json({
        categories: categories
          .map((c) => formatServiceCategory(c, lang))
          .filter((c) => c.services.length > 0),
      });
    }

    if (homepage) {
      const services = await prisma.service.findMany({
        where: { isPublished: true, showOnHomepage: true },
        orderBy: { order: 'asc' },
        include: { category: true },
      });

      return NextResponse.json({
        services: services.map((s) => formatServiceItem(s, lang)),
      });
    }

    const categories = await prisma.serviceCategory.findMany({
      orderBy: { order: 'asc' },
      include: {
        services: {
          where: { isPublished: true },
          orderBy: { order: 'asc' },
          include: { category: true },
        },
      },
    });

    return NextResponse.json({
      categories: categories.map((c) => formatServiceCategory(c, lang)),
    });
  } catch (error) {
    console.error('GET /api/services:', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}
