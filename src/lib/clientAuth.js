// src/lib/clientAuth.js
import Cookies from 'js-cookie';

export function getAuthHeader() {
  const token = Cookies.get('authToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

/**
 * Logique globale de déconnexion
 * @param {import('next/navigation').AppRouterInstance} router - L'instance du routeur Next.js
 */
export function logout(router) {
  // 1. Supprimer le cookie de session
  Cookies.remove('authToken');

  // 2. Optionnel : Supprimer d'autres données locales si vous en avez (ex: localStorage)
  // localStorage.removeItem('user_info');

  // 3. Rediriger vers la page de login
  if (router) {
    router.push('/login');
    router.refresh(); // Important pour réinitialiser l'état des Server Components
  } else {
    window.location.href = '/login'; // Fallback si le routeur n'est pas passé
  }
}