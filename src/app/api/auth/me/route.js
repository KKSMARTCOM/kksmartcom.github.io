import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/apiMiddleware';
import { hashPassword, verifyPassword } from '@/lib/auth';

async function getProfile(request, context, session) {
  const user = await prisma.user.findUnique({ where: { id: session.userId }, select: { id: true, name: true, email: true, role: true, updatedAt: true } });
  if (!user) return NextResponse.json({ message: 'Utilisateur introuvable.' }, { status: 404 });
  return NextResponse.json({ user });
}

async function updateProfile(request, context, session) {
  const body = await request.json();
  const current = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!current) return NextResponse.json({ message: 'Utilisateur introuvable.' }, { status: 404 });
  const data = {};
  if (body.name !== undefined) data.name = body.name.trim() || null;
  if (body.email && body.email !== current.email) data.email = body.email.trim().toLowerCase();
  if (body.newPassword) {
    if (!body.currentPassword) return NextResponse.json({ message: 'Mot de passe actuel requis.' }, { status: 400 });
    if (body.newPassword.length < 12) return NextResponse.json({ message: 'Le nouveau mot de passe doit comporter au moins 12 caractères.' }, { status: 400 });
    if (!(await verifyPassword(body.currentPassword, current.password))) return NextResponse.json({ message: 'Mot de passe actuel incorrect.' }, { status: 400 });
    data.password = await hashPassword(body.newPassword);
  }
  try {
    const user = await prisma.user.update({ where: { id: current.id }, data, select: { id: true, name: true, email: true, role: true, updatedAt: true } });
    return NextResponse.json({ user, message: 'Paramètres enregistrés.' });
  } catch (error) {
    if (error.code === 'P2002') return NextResponse.json({ message: 'Cette adresse e-mail est déjà utilisée.' }, { status: 409 });
    throw error;
  }
}

export const GET = requireAuth(getProfile);
export const PUT = requireAuth(updateProfile);
