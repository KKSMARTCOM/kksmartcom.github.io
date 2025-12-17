// src/lib/db.js

import { PrismaClient } from '@prisma/client';

// Initialise une variable pour le client Prisma
let prisma;

// ---------------------------------------------------------------------
// OPTIMISATION POUR NEXT.JS (GESTION DE L'ENVIRONNEMENT DE DÉVELOPPEMENT)
// ---------------------------------------------------------------------

// En production, nous initialisons simplement une nouvelle instance.
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // En développement, pour éviter de créer de nouvelles instances 
  // à chaque "Hot Reload" de Next.js :
  // 1. On vérifie si une instance globale existe déjà.
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  // 2. On utilise l'instance globale.
  prisma = global.prisma;
}

// ---------------------------------------------------------------------
// EXPORTATION
// ---------------------------------------------------------------------

export default prisma;