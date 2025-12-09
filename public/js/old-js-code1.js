/*
 * old-js-code1.js
 * Chargement conditionnel et différé des librairies de carrousel
 * (Owl Carousel ou Swiper) seulement si la page contient les éléments
 * correspondants. Objectif : réduire la charge initiale en évitant de
 * télécharger des bundles lourds quand ils ne sont pas nécessaires.
 *
 * Comportement :
 * - À la fin du chargement du DOM, on vérifie la présence des sélecteurs
 *   `.owl-carousel` et `.swiper`.
 * - Si présents, on attend 2 secondes (délai optionnel) puis on :
 *     • ajoute la feuille de style correspondante dans <head>
 *     • charge le script du plugin via `$.getScript`
 *     • après le chargement du plugin, charge `footer-scripts.js` qui
 *       contient vraisemblablement l'initialisation des carrousels
 *
 * Remarques :
 * - Le délai `2000ms` est utilisé pour ne pas bloquer le rendu initial,
 *   il peut être ajusté ou supprimé selon les besoins de performance.
 * - Les chemins sont relatifs à la racine du site (comme dans le thème WP
 *   d'origine). Si vous migrez vers Next.js, envisagez de placer ces
 *   fichiers dans `public/js/` et d'ajuster les chemins.
 */

$(document).ready(function () {
	// Si des éléments Owl Carousel sont présents, charger Owl immédiatement
	if ($('.owl-carousel').length > 0) {
		(function () {
			var owl_car = "/js/owl.carousel.min.js";
			// Ajoute la feuille de style Owl dans le head
			$('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', 'wp-content/themes/kksmartcom/css/owl.carousel.css'));
			// Charge le script Owl, puis footer-scripts.js (init)
			$.getScript(owl_car, function () {
				var footer_scripts = "wp-content/themes/kksmartcom/js/other/footer-scripts.js";
				$.getScript(footer_scripts, function () {
					console.log('loaded footer scripts');
				});
			});
		})();
	}

	// Si des éléments Swiper sont présents, charger Swiper immédiatement
	if ($('.swiper').length > 0) {
		(function () {
			var swiper_url = "/js/swiper-bundle.min.js";
			// Ajoute la feuille de style Swiper (CDN)
			$('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '/js/swiper-bundle.min.css'));
			// Charge Swiper, puis footer-scripts.js (init)
			$.getScript(swiper_url, function () {
				var footer_scripts = "/js/other/footer-scripts.js";
				$.getScript(footer_scripts, function () {
					console.log('loaded footer scripts');
				});
			});
		})();
	}

});