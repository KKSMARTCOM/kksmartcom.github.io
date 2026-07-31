import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/apiMiddleware';
import { uniqueSlug } from '@/lib/slug';

export async function GET() { const subcategories = await prisma.blogSubcategory.findMany({ orderBy: { order: 'asc' } }); return NextResponse.json({ subcategories }); }
async function createSubcategory(request) {
  const body = await request.json(); if (!body.nameFr || !body.departmentId) return NextResponse.json({ message: 'Nom FR et département requis.' }, { status: 400 });
  const slug = body.slug || await uniqueSlug(body.nameFr, (v) => prisma.blogSubcategory.findUnique({ where: { slug: v } }).then(Boolean));
  const subcategory = await prisma.blogSubcategory.create({ data: { slug, nameFr: body.nameFr, nameEn: body.nameEn || null, departmentId: Number(body.departmentId), order: Number(body.order) || 0 } });
  return NextResponse.json({ subcategory }, { status: 201 });
}
export const POST = requireAuth(createSubcategory);
