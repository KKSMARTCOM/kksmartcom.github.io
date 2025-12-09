/*
 * old-js-code5.js
 * Petite logique 'slider' maison pour la liste des clients/awards
 * (.awards-details). Le script :
 * - calcule combien d'éléments afficher selon la largeur
 * - affiche une page d'éléments (elementsParPage)
 * - gère les boutons 'prev' / 'next' et un défilement automatique
 * - conserve une 'div fixe' (élément .none) ajoutée à la fin de la liste
 *
 * Ce code est un fallback personnalisé qui permet d'afficher les blocs
 * clients sans dépendre d'un plugin de carousel externe.
 */

$(document).ready(function () {
	// Sélection des éléments
	var conteneur = $(".awards-details");
	var lignes = conteneur.find(".row:not(.none)"); // éléments défilants
	var divFixe = conteneur.find(".none"); // bloc fixe à ajouter à la fin
	var indexCourant = 0;
	var elementsParPage;

	// Détermine combien d'éléments afficher selon la largeur de la fenêtre
	function determinerElementsParPage() {
		if (window.innerWidth >= 1024) {
			elementsParPage = 3;
		} else if (window.innerWidth >= 768) {
			elementsParPage = 1; // sur tablettes on garde 1 (peut être ajusté)
		} else {
			elementsParPage = 1; // mobile : 1 élément par vue
		}
	}

	// Affiche la 'page' courante d'éléments et ajoute la div fixe
	function afficherElements() {
		determinerElementsParPage();
		conteneur.empty();

		// Découpe la collection pour la page courante
		var finIndex = indexCourant + elementsParPage;
		var elementsAffiches = lignes.slice(indexCourant, finIndex);

		// Si on est à la fin et qu'il manque des éléments, on boucle au début
		if (elementsAffiches.length < elementsParPage) {
			elementsAffiches = elementsAffiches.add(lignes.slice(0, elementsParPage - elementsAffiches.length));
		}

		// Ajoute les éléments et la div fixe (élément .none) à la zone
		conteneur.append(elementsAffiches);
		conteneur.append(divFixe);
	}

	// Bouton suivant : incrémente l'index et lance l'animation
	$(".next-button").click(function () {
		indexCourant++;
		if (indexCourant >= lignes.length) {
			indexCourant = 0;
		}
		faireDefiler(-conteneur.width());
	});

	// Bouton précédent : décrémente et lance l'animation
	$(".prev-button").click(function () {
		indexCourant--;
		if (indexCourant < 0) {
			indexCourant = lignes.length - 1;
		}
		faireDefiler(conteneur.width());
	});

	// Animation de défilement : translate horizontal via left animate
	function faireDefiler(decalage) {
		conteneur.animate({
			left: decalage
		}, 500, function () {
			// Après l'animation, reconstruire la vue courante et reset left
			afficherElements();
			conteneur.css("left", 0);
		});
	}

	// Initialisation : affichage initial
	afficherElements();

	// Auto-advance : toutes les 5 secondes
	setInterval(function () {
		indexCourant++;
		if (indexCourant >= lignes.length) {
			indexCourant = 0;
		}
		faireDefiler(-conteneur.width());
	}, 5000);

	// Lors du redimensionnement, recalculer les éléments par page
	$(window).resize(function () {
		afficherElements();
	});
});