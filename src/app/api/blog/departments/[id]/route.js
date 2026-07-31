import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/apiMiddleware';
import { uniqueSlug } from '@/lib/slug';

async function updateDepartment(request, { params }) {
  const { id } = await params; const existing = await prisma.blogDepartment.findUnique({ where: { id: Number(id) } });
  if (!existing) return NextResponse.json({ message: 'Département introuvable.' }, { status: 404 });
  const body = await request.json(); const slug = body.slug && body.slug !== existing.slug ? await uniqueSlug(body.slug, (v) => prisma.blogDepartment.findFirst({ where: { slug: v, NOT: { id: existing.id } } }).then(Boolean)) : existing.slug;
  const department = await prisma.blogDepartment.update({ where: { id: existing.id }, data: { slug, nameFr: body.nameFr ?? existing.nameFr, nameEn: body.nameEn !== undefined ? body.nameEn || null : existing.nameEn, order: body.order ?? existing.order } });
  return NextResponse.json({ department });
}
async function deleteDepartment(request, { params }) { const { id } = await params; await prisma.blogDepartment.delete({ where: { id: Number(id) } }); return NextResponse.json({ message: 'Département supprimé.' }); }
export const PUT = requireAuth(updateDepartment); export const DELETE = requireAuth(deleteDepartment);
