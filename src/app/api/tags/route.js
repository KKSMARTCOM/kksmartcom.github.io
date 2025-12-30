// src/app/api/tags/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/apiMiddleware';

// 1. Récupérer tous les tags (Public)
export async function GET() {
  try {
    const tags = await prisma.tag.findMany();
    // On renvoie directement le tableau 'tags'
    return NextResponse.json(tags); 
  } catch (error) {
    return NextResponse.json([], { status: 500 }); // Renvoie un tableau vide en cas d'erreur
  }
}

// 2. Ajouter un tag (Protégé)
async function createTagHandler(request) {
  try {
    const { slug, label, href, category } = await request.json();
    
    const newTag = await prisma.tag.create({
      data: { slug, label, href, category }
    });

    return NextResponse.json(newTag, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur lors de la création" }, { status: 500 });
  }
}

export const POST = requireAuth(createTagHandler);