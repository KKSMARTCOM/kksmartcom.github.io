import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/apiMiddleware';
import { uniqueSlug } from '@/lib/slug';
import { formatJobOffer } from '@/lib/cmsFormatters';
import { sanitizeHtml } from '@/lib/sanitizeHtml';

async function getJobOffersHandler(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const lang = searchParams.get('lang') || 'fr';
    const admin = searchParams.get('admin') === 'true';

    let where = { status: 'published' };
    if (admin) {
      where = status ? { status } : {};
    }

    const jobs = await prisma.jobOffer.findMany({
      where,
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({
      jobOffers: jobs.map((job) => formatJobOffer(job, lang)),
    });
  } catch (error) {
    console.error('GET /api/job-offers:', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}

export async function GET(request) {
  const admin = new URL(request.url).searchParams.get('admin') === 'true';
  return admin ? requireAuth(getJobOffersHandler)(request) : getJobOffersHandler(request);
}

async function createJobOfferHandler(request) {
  try {
    const body = await request.json();
    const {
      titleFr,
      titleEn,
      descriptionFr,
      descriptionEn,
      location,
      contractType,
      department,
      applicationEmail,
      status = 'draft',
      slug: customSlug,
    } = body;

    if (!titleFr || !descriptionFr) {
      return NextResponse.json(
        { message: 'Titre et description (FR) requis.' },
        { status: 400 }
      );
    }

    const slug = customSlug
      ? customSlug
      : await uniqueSlug(titleFr, (s) =>
          prisma.jobOffer.findUnique({ where: { slug: s } }).then(Boolean)
        );

    const job = await prisma.jobOffer.create({
      data: {
        slug,
        titleFr,
        titleEn: titleEn || null,
        descriptionFr: sanitizeHtml(descriptionFr),
        descriptionEn: descriptionEn ? sanitizeHtml(descriptionEn) : null,
        location: location || null,
        contractType: contractType || null,
        department: department || null,
        applicationEmail: applicationEmail || null,
        status,
        publishedAt: status === 'published' ? new Date() : null,
      },
    });

    return NextResponse.json({ jobOffer: formatJobOffer(job) }, { status: 201 });
  } catch (error) {
    console.error('POST /api/job-offers:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ message: 'Ce slug existe déjà.' }, { status: 409 });
    }
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}

export const POST = requireAuth(createJobOfferHandler);
