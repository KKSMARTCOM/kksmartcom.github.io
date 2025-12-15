# KK SMART COM - Site Web

Site web officiel de KK SMART COM, une agence de communication digitale offrant des services complets pour les entreprises et les startups.

## Fonctionnalités

- 🌍 **Internationalisation** : Support multilingue (Français et Anglais)
- 🚀 **Composants dynamiques** : Données gérées via un fichier JSON centralisé
- 📱 **Design responsive** : Adapté à tous les appareils
- ⚡ **Optimisé pour les performances** : Chargement rapide et expérience utilisateur fluide

## Structure du Projet

- `/src/components` : Composants React réutilisables
  - `Footer.jsx` : Pied de page dynamique avec année de copyright automatique
  - `Header.jsx` : En-tête de navigation
  - `Service.jsx` : Section des services
  - `PreuveSocial.jsx` : Témoignages et avis clients
  - `CTA.jsx` : Appels à l'action
  - `ContactSection.jsx` : Formulaire de contact
  - `AproposHero.jsx` : Section héro de la page À propos
  - `WhoUs.jsx` : Section "Qui sommes-nous"
  - `Mission.jsx` : Section mission et valeurs
- `/src/data` : Données du site
  - `siteData.json` : Fichier JSON centralisé pour tout le contenu du site
- `/public` : Fichiers statiques (images, vidéos, etc.)

## Configuration requise

- Node.js 14.6.0 ou plus récent
- npm ou yarn

## Installation

1. Cloner le dépôt :
   ```bash
   git clone [URL_DU_DEPOT]
   cd kksmartcom.com.stack.reveiw
   ```

2. Installer les dépendances :
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Lancer le serveur de développement :
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Internationalisation

Le site supporte actuellement le français et l'anglais. Les textes sont gérés dans le fichier `src/data/siteData.json` avec les clés `fr` et `en`.

## Déploiement

Le site peut être déployé sur n'importe quelle plateforme prenant en charge les applications Next.js, notamment :

- [Vercel](https://vercel.com)
- [Netlify](https://www.netlify.com/)
- Hébergement Node.js standard

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## Licence

Ce projet est sous licence MIT.
