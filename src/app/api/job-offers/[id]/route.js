import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/apiMiddleware';
import { uniqueSlug } from '@/lib/slug';
import { formatJobOffer } from '@/lib/cmsFormatters';
import { sanitizeHtml } from '@/lib/sanitizeHtml';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const isNumeric = /^\d+$/.test(id);

    const job = isNumeric
      ? await prisma.jobOffer.findUnique({ where: { id: parseInt(id, 10) } })
      : await prisma.jobOffer.findUnique({ where: { slug: id } });

    if (!job) {
      return NextResponse.json({ message: 'Offre non trouvée.' }, { status: 404 });
    }

    return NextResponse.json({ jobOffer: formatJobOffer(job) });
  } catch (error) {
    console.error('GET /api/job-offers/[id]:', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}

async function updateJobOfferHandler(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const existing = await prisma.jobOffer.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existing) {
      return NextResponse.json({ message: 'Offre non trouvée.' }, { status: 404 });
    }

    const status = body.status ?? existing.status;
    const data = {
      titleFr: body.titleFr ?? existing.titleFr,
      titleEn: body.titleEn !== undefined ? body.titleEn : existing.titleEn,
      descriptionFr: body.descriptionFr !== undefined ? sanitizeHtml(body.descriptionFr) : existing.descriptionFr,
      descriptionEn: body.descriptionEn !== undefined ? sanitizeHtml(body.descriptionEn) : existing.descriptionEn,
      location: body.location !== undefined ? body.location : existing.location,
      contractType: body.contractType !== undefined ? body.contractType : existing.contractType,
      department: body.department !== undefined ? body.department : existing.department,
      applicationEmail: body.applicationEmail !== undefined ? body.applicationEmail : existing.applicationEmail,
      status,
      publishedAt:
        status === 'published' && !existing.publishedAt
          ? new Date()
          : status === 'draft'
            ? null
            : existing.publishedAt,
    };

    if (body.slug && body.slug !== existing.slug) {
      data.slug = await uniqueSlug(body.slug, (s) =>
        prisma.jobOffer.findFirst({ where: { slug: s, NOT: { id: existing.id } } }).then(Boolean)
      );
    }

    const job = await prisma.jobOffer.update({
      where: { id: parseInt(id, 10) },
      data,
    });

    return NextResponse.json({ jobOffer: formatJobOffer(job) });
  } catch (error) {
    console.error('PUT /api/job-offers/[id]:', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}

async function deleteJobOfferHandler(request, { params }) {
  try {
    const { id } = await params;
    await prisma.jobOffer.delete({ where: { id: parseInt(id, 10) } });
    return NextResponse.json({ message: 'Offre supprimée.' });
  } catch (error) {
    console.error('DELETE /api/job-offers/[id]:', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}

export const PUT = requireAuth(updateJobOfferHandler);
export const DELETE = requireAuth(deleteJobOfferHandler);
