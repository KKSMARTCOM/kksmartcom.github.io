// src/lib/clientAuth.js
export function getAuthHeader() {
  return {};
}

/**
 * Logique globale de déconnexion
 * @param {import('next/navigation').AppRouterInstance} router - L'instance du routeur Next.js
 */
export async function logout(router) {
  // 1. Supprimer le cookie de session
  await fetch('/api/auth/logout', { method: 'POST' });

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
