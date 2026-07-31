// src/lib/apiMiddleware.js

import { NextResponse } from 'next/server';
import { verifyToken } from './auth';

/**
 * Fonction wrapper pour sécuriser les routes API.
 * Elle vérifie l'existence et la validité d'un JWT dans les headers.
 * * @param {Function} handler - La fonction de route (ex: POST, GET, PUT)
 * @returns {Function} - Une nouvelle fonction de route sécurisée
 */
export function requireAuth(handler) {
  return async (request, context) => {
    const authHeader = request.headers.get('Authorization');
    const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const token = request.cookies.get('authToken')?.value || bearerToken;
    if (!token) {
      return NextResponse.json(
        { message: 'Authentification requise. Jeton manquant.' }, 
        { status: 401 }
      );
    }

    // 2. Vérifier le jeton
    const decodedPayload = verifyToken(token);

    if (!decodedPayload) {
      return NextResponse.json(
        { message: 'Jeton invalide ou expiré.' }, 
        { status: 403 } // Forbidden
      );
    }

    if (decodedPayload.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Accès administrateur requis.' }, { status: 403 });
    }

    // 3. Jeton valide : Injecter les informations de l'utilisateur (payload)
    // dans la requête pour que le contrôleur puisse les utiliser (ex: userId).
    // Note: C'est une méthode courante, mais dans Next.js Server Components/Routes, 
    // l'objet Request est immutable. Nous allons l'injecter via le contexte si nécessaire,
    // mais ici, nous passons le payload directement au handler pour plus de simplicité.
    
    // Ici, nous modifions la logique du handler pour qu'il reçoive le payload.
    // Pour l'approche Next.js Server Components, c'est un peu plus complexe sans 
    // librairie tierce, mais pour commencer, nous allons passer le payload dans le contexte 
    // ou le laisser dans le `decodedPayload` pour que vous sachiez qu'il est accessible.

    // Pour l'instant, appelons simplement le handler original si l'auth réussit.
    // Nous récupérerons le userId à l'intérieur du handler si besoin.
    // L'information du userId est dans `decodedPayload.userId`

    return handler(request, context, decodedPayload); // Passons le payload décodé au handler
  };
}
