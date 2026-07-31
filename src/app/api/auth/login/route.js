// src/app/api/auth/login/route.js

import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyPassword, getJwtSecret } from '@/lib/auth'; // Importe la fonction de vérification
import jwt from 'jsonwebtoken';

// Accès au secret JWT depuis les variables d'environnement
const JWT_EXPIRATION = '7d'; // Le jeton sera valide pendant 7 jours

// Gère les requêtes POST pour la connexion de l'utilisateur
// Accessible via : POST /api/auth/login
export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // 1. Validation de base
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email et mot de passe sont requis.' }, 
        { status: 400 }
      );
    }
    
    // 2. Recherche de l'utilisateur dans la BDD
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Pour des raisons de sécurité, le message est générique.
      return NextResponse.json(
        { message: 'Identifiants invalides.' }, 
        { status: 401 } // Unauthorized
      );
    }

    // 3. Vérification du mot de passe haché
    const passwordIsValid = await verifyPassword(password, user.password);

    if (!passwordIsValid) {
      return NextResponse.json(
        { message: 'Identifiants invalides.' }, 
        { status: 401 }
      );
    }

    // 4. Génération du JSON Web Token (JWT)
    // Le 'payload' contient les infos importantes pour identifier l'utilisateur plus tard (ex: user ID)
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      getJwtSecret(),
      { expiresIn: JWT_EXPIRATION }
    );

    // 5. Succès : Retourner le jeton au client
    // Le client devra stocker ce token (souvent dans un cookie ou le localStorage)
    const response = NextResponse.json(
      { 
        message: 'Connexion réussie', 
        token, 
        user: { id: user.id, name: user.name, email: user.email } 
      }, 
      { status: 200 }
    );
    response.cookies.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;

  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    return NextResponse.json(
      { message: 'Erreur interne du serveur lors de la connexion.' }, 
      { status: 500 }
    );
  }
}
