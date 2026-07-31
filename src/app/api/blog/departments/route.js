import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/apiMiddleware';
import { uniqueSlug } from '@/lib/slug';
import { formatBlogDepartment } from '@/lib/cmsFormatters';

async function listDepartments(request) {
  const lang = new URL(request.url).searchParams.get('lang') || 'fr';
  const departments = await prisma.blogDepartment.findMany({ orderBy: { order: 'asc' }, include: { subcategories: { orderBy: { order: 'asc' } } } });
  return NextResponse.json({ departments: departments.map((item) => formatBlogDepartment(item, lang)) });
}

export const GET = listDepartments;

async function createDepartment(request) {
  const body = await request.json();
  if (!body.nameFr) return NextResponse.json({ message: 'Nom FR requis.' }, { status: 400 });
  const slug = body.slug || await uniqueSlug(body.nameFr, (value) => prisma.blogDepartment.findUnique({ where: { slug: value } }).then(Boolean));
  const department = await prisma.blogDepartment.create({ data: { slug, nameFr: body.nameFr, nameEn: body.nameEn || null, order: Number(body.order) || 0 }, include: { subcategories: true } });
  return NextResponse.json({ department: formatBlogDepartment(department) }, { status: 201 });
}
export const POST = requireAuth(createDepartment);
