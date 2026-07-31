import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/apiMiddleware';
import { uniqueSlug } from '@/lib/slug';
import { formatBlogPost } from '@/lib/cmsFormatters';
import { postData } from '@/lib/blogInput';

const include = { department: true, subcategory: true, author: { select: { id: true, name: true, email: true } } };

async function listPosts(request) {
  const query = new URL(request.url).searchParams;
  const lang = query.get('lang') || 'fr';
  const admin = query.get('admin') === 'true';
  const where = admin ? {} : { status: 'published' };
  if (query.get('department')) where.department = { slug: query.get('department') };
  if (query.get('subcategory')) where.subcategory = { slug: query.get('subcategory') };
  const posts = await prisma.blogPost.findMany({ where, include, orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }] });
  return NextResponse.json({ posts: posts.map((post) => formatBlogPost(post, lang)) });
}
export async function GET(request) { return new URL(request.url).searchParams.get('admin') === 'true' ? requireAuth(listPosts)(request) : listPosts(request); }

async function createPost(request, context, session) {
  const body = await request.json();
  if (!body.titleFr) return NextResponse.json({ message: 'Titre français requis.' }, { status: 400 });
  const slug = body.slug || await uniqueSlug(body.titleFr, (v) => prisma.blogPost.findUnique({ where: { slug: v } }).then(Boolean));
  const data = postData(body);
  const post = await prisma.blogPost.create({ data: { ...data, slug, authorId: session.userId, publishedAt: data.status === 'published' ? new Date() : null }, include });
  return NextResponse.json({ post: formatBlogPost(post) }, { status: 201 });
}
export const POST = requireAuth(createPost);
