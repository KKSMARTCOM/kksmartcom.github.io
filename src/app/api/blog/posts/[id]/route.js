import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/apiMiddleware';
import { uniqueSlug } from '@/lib/slug';
import { formatBlogPost } from '@/lib/cmsFormatters';
import { postData } from '@/lib/blogInput';

const include = { department: true, subcategory: true, author: { select: { id: true, name: true, email: true } } };
async function lookup(value) { return /^\d+$/.test(value) ? prisma.blogPost.findUnique({ where: { id: Number(value) }, include }) : prisma.blogPost.findUnique({ where: { slug: value }, include }); }
async function getPost(request, { params }) { const { id } = await params; const post = await lookup(id); const admin = new URL(request.url).searchParams.get('admin') === 'true'; if (!post || (post.status !== 'published' && !admin)) return NextResponse.json({ message: 'Article introuvable.' }, { status: 404 }); return NextResponse.json({ post: formatBlogPost(post, new URL(request.url).searchParams.get('lang') || 'fr') }); }
export async function GET(request, context) { return new URL(request.url).searchParams.get('admin') === 'true' ? requireAuth(getPost)(request, context) : getPost(request, context); }
async function updatePost(request, { params }) {
  const { id } = await params; const existing = await lookup(id); if (!existing) return NextResponse.json({ message: 'Article introuvable.' }, { status: 404 });
  const body = await request.json(); const data = postData(body, existing);
  if (body.slug && body.slug !== existing.slug) data.slug = await uniqueSlug(body.slug, (v) => prisma.blogPost.findFirst({ where: { slug: v, NOT: { id: existing.id } } }).then(Boolean));
  data.publishedAt = data.status === 'published' ? (existing.publishedAt || new Date()) : null;
  const post = await prisma.blogPost.update({ where: { id: existing.id }, data, include }); return NextResponse.json({ post: formatBlogPost(post) });
}
async function deletePost(request, { params }) { const { id } = await params; const existing = await lookup(id); if (!existing) return NextResponse.json({ message: 'Article introuvable.' }, { status: 404 }); await prisma.blogPost.delete({ where: { id: existing.id } }); return NextResponse.json({ message: 'Article supprimé.' }); }
export const PUT = requireAuth(updatePost); export const DELETE = requireAuth(deletePost);
