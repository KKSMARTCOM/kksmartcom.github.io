// src/app/api/auth/route.js

import { NextResponse } from 'next/server';
import prisma from '@/lib/db';         // Importe notre client BDD unique
import { hashPassword } from '@/lib/auth'; // Importe notre fonction de hachage

// Gère les requêtes POST pour l'inscription d'un nouvel utilisateur
// Accessible via : POST /api/auth
export async function POST(request) {
  try {
    // 1. Récupération des données du corps de la requête (JSON)
    const { name, email, password } = await request.json();

    // 2. Validation simple des champs
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'Veuillez fournir un nom, un email et un mot de passe.' }, 
        { status: 400 } // Bad Request
      );
    }
    
    // 3. Hachage du mot de passe
    const hashedPassword = await hashPassword(password);

    // 4. Création de l'utilisateur dans la BDD via Prisma
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      // Sélectionne uniquement les champs que nous voulons renvoyer au client
      select: {
        id: true,
        name: true,
        email: true,
      }
    });

    return NextResponse.json(
      { message: 'Utilisateur créé avec succès', user }, 
      { status: 201 } // Created
    );

  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    
    // 5. Gestion des erreurs spécifiques de la BDD (ex: email déjà utilisé)
    // Code P2002 : violation d'une contrainte UNIQUE (ici, l'email)
    if (error.code === 'P2002') {
        return NextResponse.json(
          { message: 'Cet email est déjà utilisé (erreur de duplication).' }, 
          { status: 409 } // Conflict
        );
    }

    return NextResponse.json(
      { message: 'Erreur interne du serveur.' }, 
      { status: 500 } // Internal Server Error
    );
  }
}   