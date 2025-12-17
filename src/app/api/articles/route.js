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
    const { uniqueId, date, author, contentFr, contentEn } = body;

    // Validation simple
    if (!uniqueId || !contentFr) {
        return NextResponse.json(
            { message: 'ID unique et contenu français (contentFr) sont requis.' }, 
            { status: 400 }
        );
    }

    // 4. Création de l'article dans la BDD
    const newArticle = await prisma.article.create({
      data: {
        uniqueId: String(uniqueId), // S'assurer que c'est une chaîne
        date: new Date(date || Date.now()), // Utiliser la date fournie ou actuelle
        author: author || 'Inconnu',
        contentFr, // Le JSON complexe
        contentEn: contentEn || null,
        authorId, // L'ID de l'utilisateur connecté
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
         return NextResponse.json({ message: 'Cet ID unique est déjà utilisé.' }, { status: 409 });
    }
    return NextResponse.json({ message: 'Erreur interne du serveur.' }, { status: 500 });
  }
}

// -------------------------------------------------------------------
// EXPORT : On utilise le middleware pour envelopper notre fonction POST
// -------------------------------------------------------------------
export const POST = requireAuth(createArticlesHandler);


// -------------------------------------------------------------------
// FONCTION DE LECTURE D'ARTICLE NON SÉCURISÉE (Requête GET)
// -------------------------------------------------------------------

// Cette route est publique, donc pas besoin de requireAuth
export async function GET() {
    try {
        const articles = await prisma.article.findMany({
            // On peut choisir les champs à renvoyer pour ne pas alourdir la réponse
            select: {
                id: true,
                uniqueId: true,
                date: true,
                author: true,
                contentFr: true, // Ou seulement les champs "cards"
                contentEn: true,
            }
        });

        return NextResponse.json({ articles }, { status: 200 });
    } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
        return NextResponse.json({ message: 'Impossible de charger les articles.' }, { status: 500 });
    }
}