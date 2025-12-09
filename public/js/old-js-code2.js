/*
 * old-js-code2.js
 * Initialise un carrousel Swiper pour la classe `.reviews_slider`.
 * Les options configurées ici contrôlent le comportement du slider :
 * - loop: boucle infinie
 * - autoplay: lecture automatique avec délai et comportement lors d'interaction
 * - navigation: sélecteurs pour les boutons next/prev
 * - slidesPerView / breakpoints: responsive (nombre d'éléments visibles selon largeur)
 */
document.addEventListener('DOMContentLoaded', function () {
	// Crée une instance Swiper sur l'élément .reviews_slider
	var mySwiper = new Swiper('.reviews_slider', {
		loop: true, // Active le défilement en boucle
		autoplay: {
			delay: 5000, // 5s entre chaque passage
			disableOnInteraction: false, // Continuer l'autoplay après interaction utilisateur
		},
		navigation: {
			nextEl: '.next', // Sélecteur du bouton 'suivant'
			prevEl: '.prev', // Sélecteur du bouton 'précédent'
		},
		slidesPerView: 1, // Par défaut 1 slide visible
		spaceBetween: 15, // Espace en pixels entre les slides
		breakpoints: {
			// À partir de 768px : afficher 2 slides
			768: {
				slidesPerView: 2,
			},
			// À partir de 1024px : afficher 3 slides
			1024: {
				slidesPerView: 3,
			},
		},
	});
});