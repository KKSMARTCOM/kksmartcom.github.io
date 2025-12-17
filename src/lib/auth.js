// src/lib/auth.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Le SALT_ROUNDS détermine la complexité (le temps de calcul) du hachage.
// 10 est une valeur standard pour commencer. Plus elle est élevée, plus c'est sécurisé, mais plus c'est lent.
const SALT_ROUNDS = 10; 
const JWT_SECRET = process.env.JWT_SECRET;

// Hache le mot de passe fourni par l'utilisateur lors de l'inscription.
export async function hashPassword(password) {
  // Le hachage est asynchrone pour ne pas bloquer le serveur
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Vérifie le mot de passe fourni par l'utilisateur lors de la connexion
// en le comparant avec le hash stocké dans la base de données.
export async function verifyPassword(password, hashedPassword) {
  // bcrypt.compare() prend en entrée le mot de passe en clair et le hash, 
  // puis renvoie true ou false.
  return bcrypt.compare(password, hashedPassword);
}

// ------------------------------------------------------------------
// NOUVELLE FONCTION : Vérification du JWT
// ------------------------------------------------------------------

/**
 * Vérifie et décode un JSON Web Token.
 * @param {string} token - Le JWT provenant du header Authorization.
 * @returns {object|null} Le payload décodé (ex: { userId, email }) ou null si invalide.
 */
export function verifyToken(token) {
  if (!JWT_SECRET) {
    console.error("JWT_SECRET non défini. Vérifiez votre fichier .env.");
    return null;
  }
  
  try {
    // jwt.verify lance une erreur si le token est invalide ou expiré
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded; // Renvoie le payload (userId, email, etc.)
  } catch (error) {
    // Si la vérification échoue (token expiré, signature invalide)
    console.error("Erreur de vérification du jeton:", error.message);
    return null; 
  }
}