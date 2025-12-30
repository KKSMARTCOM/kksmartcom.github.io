// src/app/api/articles/route.js

import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/apiMiddleware'; // 👈 Import du middleware

// -------------------------------------------------------------------
// FONCTION DE CRÉATION D'ARTICLE SÉCURISÉE (Requête POST)
// -------------------------------------------------------------------

// Le corps de la fonction handler reçoit le payload décodé en 3ème argument
async function createArticlesHandler(request, context, decodedPayload) {
  try {
    // L'authentification a réussi. On récupère l'ID de l'utilisateur connecté.
    const authorId = decodedPayload.userId; // 👈 ID de l'utilisateur à partir du JWT
    
    // On récupère les données du corps de la requête (y compris le JSON complexe)
    const body = await request.json();
    const { uniqueId, date, author, contentFr, contentEn, status = 'brouillon' } = body;

    // Validation simple
    if (!uniqueId || !contentFr) {
      return NextResponse.json(
        { message: 'ID unique et contenu français (contentFr) sont requis.' },
        { status: 400 }
      );
    }

    // Création de l'article
    const newArticle = await prisma.article.create({
      data: {
        uniqueId: String(uniqueId), // S'assurer que c'est une chaîne
        date: new Date(date || Date.now()), // Utiliser la date fournie ou actuelle
        author: author || 'Inconnu',
        status,
        contentFr,
        contentEn: contentEn || null,
        authorId,
      },
    });

    return NextResponse.json(
      { message: 'Article créé avec succès.', article: newArticle },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur lors de la création de l\'article :', error);
    // Gestion de l'erreur de duplication (si uniqueId existe déjà)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: 'Cet ID unique est déjà utilisé.' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: 'Erreur interne du serveur.' },
      { status: 500 }
    );
  }
}

// -------------------------------------------------------------------
// FONCTION DE MISE À JOUR D'ARTICLE (Requête PUT)
// -------------------------------------------------------------------
async function updateArticleHandler(request, context, decodedPayload) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { message: 'ID de l\'article requis.' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { contentFr, contentEn, status, author } = body;

    // Vérifier que l'article existe
    const existingArticle = await prisma.article.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingArticle) {
      return NextResponse.json(
        { message: 'Article non trouvé.' },
        { status: 404 }
      );
    }

    // Vérifier que l'utilisateur est l'auteur ou un administrateur
    if (existingArticle.authorId !== decodedPayload.userId && !decodedPayload.isAdmin) {
      return NextResponse.json(
        { message: 'Non autorisé à modifier cet article.' },
        { status: 403 }
      );
    }

    // Mise à jour de l'article
    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        ...(contentFr && { contentFr }),
        ...(contentEn && { contentEn }),
        ...(status && { status }),
        ...(author && { author }),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: 'Article mis à jour avec succès.',
      article: updatedArticle,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'article :', error);
    return NextResponse.json(
      { message: 'Erreur lors de la mise à jour de l\'article.' },
      { status: 500 }
    );
  }
}

// -------------------------------------------------------------------
// FONCTION DE SUPPRESSION D'ARTICLE (Requête DELETE)
// -------------------------------------------------------------------
async function deleteArticleHandler(request, context, decodedPayload) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { message: 'ID de l\'article requis.' },
        { status: 400 }
      );
    }

    // Vérifier que l'article existe
    const existingArticle = await prisma.article.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingArticle) {
      return NextResponse.json(
        { message: 'Article non trouvé.' },
        { status: 404 }
      );
    }

    // Vérifier que l'utilisateur est l'auteur ou un administrateur
    if (existingArticle.authorId !== decodedPayload.userId && !decodedPayload.isAdmin) {
      return NextResponse.json(
        { message: 'Non autorisé à supprimer cet article.' },
        { status: 403 }
      );
    }

    // Suppression de l'article
    await prisma.article.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({
      message: 'Article supprimé avec succès.',
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article :', error);
    return NextResponse.json(
      { message: 'Erreur lors de la suppression de l\'article.' },
      { status: 500 }
    );
  }
}

// -------------------------------------------------------------------
// FONCTION DE RÉCUPÉRATION D'UN ARTICLE PAR ID (Requête GET avec ID)
// -------------------------------------------------------------------
async function getArticleByIdHandler(request, context, decodedPayload) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { message: 'ID de l\'article requis.' },
        { status: 400 }
      );
    }

    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
    });

    if (!article) {
      return NextResponse.json(
        { message: 'Article non trouvé.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ article }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article :', error);
    return NextResponse.json(
      { message: 'Erreur lors de la récupération de l\'article.' },
      { status: 500 }
    );
  }
}

// -------------------------------------------------------------------
// FONCTION DE LECTURE DE TOUS LES ARTICLES (Requête GET)
// -------------------------------------------------------------------
async function getAllArticlesHandler() {
  try {
    const articles = await prisma.article.findMany({
            // On peut choisir les champs à renvoyer pour ne pas alourdir la réponse
      select: {
        id: true,
        uniqueId: true,
        title: true,
        status: true,
        date: true,
        author: true,
        updatedAt: true,
        contentFr: {
          select: {
            cards: {
              select: {
                title: true,
                description: true,
                tags: true,
                images: true
              }
            }
          }
        }
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json({ articles }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return NextResponse.json(
      { message: 'Impossible de charger les articles.' },
      { status: 500 }
    );
  }
}

// -------------------------------------------------------------------
// GESTIONNAIRE DE ROUTE PRINCIPAL
// -------------------------------------------------------------------
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  // Si un ID est fourni, récupérer un article spécifique
  if (id) {
    return requireAuth(getArticleByIdHandler)(request);
  }
  
  // Sinon, récupérer tous les articles
  return getAllArticlesHandler();
}

export const POST = requireAuth(createArticlesHandler);
export const PUT = requireAuth(updateArticleHandler);
export const DELETE = requireAuth(deleteArticleHandler);