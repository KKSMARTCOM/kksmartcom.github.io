// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // 1. Récupérer le token dans les cookies
  const token = request.cookies.get('authToken')?.value;

  // 2. Définir les routes qui demandent une connexion (ex: tout ce qui commence par /admin)
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/admin');

  // 3. Si la route est protégée et qu'il n'y a pas de token
  if (isProtectedRoute && !token) {
    // Rediriger vers la page de login
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Si tout est ok, on laisse passer la requête
  return NextResponse.next();
}

// Optionnel : Configurer sur quelles routes le middleware doit s'exécuter
export const config = {
  matcher: ['/admin/:path*'], // Protège toutes les sous-pages de /admin
};