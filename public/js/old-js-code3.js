/*
 * old-js-code3.js
 * Validation côté client pour le formulaire avec la classe `.main_contact_form`.
 * Utilise le plugin jQuery Validation pour définir les règles, messages et la
 * logique lors de la soumission.
 *
 * Comportement principal :
 * - Définit des règles (required, maxlength, email)
 * - Affiche des messages d'erreur personnalisés
 * - Lors d'une validation réussie : désactive le bouton `.main-btn`, soumet
 *   le formulaire et vide les champs
 * - Avant la soumission (événement submit), réactive le bouton pour s'assurer
 *   que la soumission réelle peut se produire (compatibilité navigateur)
 */

$(document).ready(function () {
	$(".main_contact_form").validate({
		// Règles de validation pour chaque champ (noms des champs attendus côté serveur)
		rules: {
			Nom: {
				required: true,
				maxlength: 40
			},
			Email: {
				required: true,
				email: true
			},
			Message: {
				required: true,
				maxlength: 1000
			}
		},
		// Messages d'erreur affichés pour chaque règle
		messages: {
			Nom: {
				required: "Votre nom est requis",
				maxlength: "Longueur maximale 40 caractères"
			},
			Email: {
				email: "Votre email est invalide",
				required: "Email requis"
			},
			Message: {
				required: "Message requis",
				maxlength: "Longueur maximale 1000 caractères"
			}
		},
		submitHandler: function (form) {
			// Lorsqu'un formulaire est valide, désactiver le bouton pour éviter les doubles clics
			$(form).find(".main-btn").attr("disabled", true);

			// Soumission réelle du formulaire (comportement par défaut)
			form.submit();

			// Vider les champs (note: si la soumission provoque un reload, cette ligne peut être redondante)
			$(form).find('input, textarea').val('');
		}
	});

	// Avant la soumission, s'assurer que le bouton est activé (préserve compatibilité)
	$(".main_contact_form").submit(function () {
		$(this).find(".main-btn").removeAttr("disabled");
	});
});