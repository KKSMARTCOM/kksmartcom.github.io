/*
 * old-js-code4.js
 * Même logique que old-js-code3.js mais appliquée au formulaire ayant la
 * classe `.main_contact_form2`. Fournit validation, messages et protection
 * contre les doubles soumissions.
 */

$(document).ready(function () {
	$(".main_contact_form2").validate({
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
			// Désactive le bouton pour éviter les clics répétés
			$(form).find(".main-btn").attr("disabled", true);

			// Soumet le formulaire
			form.submit();

			// Vide les champs (souvent redondant si page reload)
			$(form).find('input, textarea').val('');
		}
	});

	// S'assure que le bouton est activé juste avant la soumission
	$(".main_contact_form2").submit(function () {
		$(this).find(".main-btn").removeAttr("disabled");
	});
});