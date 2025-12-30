// src/app/api/tags/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/apiMiddleware';

// Mettre à jour un tag
async function updateTagHandler(request, { params }) {
  const { id } = params;
  const data = await request.json();

  try {
    const updatedTag = await prisma.tag.update({
      where: { id: parseInt(id) },
      data: data
    });
    return NextResponse.json(updatedTag);
  } catch (error) {
    return NextResponse.json({ message: "Erreur de mise à jour" }, { status: 500 });
  }
}

// Supprimer un tag
async function deleteTagHandler(request, { params }) {
  const { id } = params;
  try {
    await prisma.tag.delete({
      where: { id: parseInt(id) }
    });
    return NextResponse.json({ message: "Tag supprimé" });
  } catch (error) {
    return NextResponse.json({ message: "Erreur de suppression" }, { status: 500 });
  }
}

export const PUT = requireAuth(updateTagHandler);
export const DELETE = requireAuth(deleteTagHandler);