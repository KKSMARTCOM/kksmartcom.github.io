# KK SMART COM - Plateforme de Gestion de Contenu

Plateforme complète de gestion de contenu pour KK SMART COM, une agence de communication digitale offrant des services complets pour les entreprises et les startups.

## 🚀 Fonctionnalités Principales

### Frontend
- 🌍 **Internationalisation** : Support multilingue (Français et Anglais) avec gestion du contexte de langue
- 📱 **Design responsive** : Interface adaptative avec Tailwind CSS
- ⚡ **Optimisation des performances** : Next.js 16 avec React 19 pour un chargement ultra-rapide
- 🎨 **UI Moderne** : Composants accessibles avec Radix UI et animations fluides

### Backend & Gestion de Contenu
- 📝 **Système d'articles avancé** : CRUD complet avec éditeur visuel
- 🏷️ **Gestion des tags** : Catégorisation avancée avec tags par catégorie (type de projet, industrie)
- 🖼️ **Gestion des médias** : Téléchargement d'images avec prévisualisation et glisser-déposer
- 🔐 **Authentification** : Système sécurisé avec JWT et hachage bcrypt

### Fonctionnalités Administrateur
- 📊 **Tableau de bord** : Vue d'ensemble des contenus et statistiques
- ✏️ **Éditeur visuel** : Interface intuitive pour la création de contenu
- 🔍 **Recherche avancée** : Filtrage et recherche dans les articles
- 📅 **Planification** : Publication programmée des articles

## 🛠️ Stack Technologique

### Frontend
- **Framework** : Next.js 16 avec App Router
- **UI** : React 19 avec Server Components
- **Styling** : Tailwind CSS 4 avec plugins personnalisés
- **Composants UI** : Radix UI, Hero Icons, Lucide Icons
- **Gestion d'état** : Contexte React + Hooks personnalisés

### Backend
- **Base de données** : PostgreSQL avec Prisma ORM
- **Authentification** : JWT + bcryptjs
- **API** : Routes API Next.js
- **Validation** : Zod pour la validation des schémas

## 🏗️ Structure du Projet

```
src/
├── app/                          # Routage et pages
│   ├── admin/                    # Interface d'administration
│   │   ├── articles/            # Gestion des articles
│   │   │   └── [id]/            # Édition d'article
│   │   └── dashboard/           # Tableau de bord
│   ├── api/                     # Routes API
│   │   ├── auth/                # Authentification
│   │   ├── tags/                # Gestion des tags
│   │   └── articles/            # Gestion des articles
│   └── (site)/                  # Pages publiques
│       ├── apropos/             # Page À propos
│       ├── blog/                # Section blog
│       └── projets/             # Page des projets
│
├── components/
│   ├── ui/                      # Composants UI réutilisables
│   │   ├── ImageUploader.jsx    # Upload d'images avec prévisualisation
│   │   ├── Button.jsx           # Bouton personnalisé
│   │   └── ...
│   ├── backPageComponents/      # Composants admin
│   │   ├── ArticlesEditionComponents/
│   │   │   ├── GeneralSection.jsx
│   │   │   └── ...
│   │   └── ...
│   └── ...
│
├── lib/                         # Utilitaires
│   ├── auth.js                  # Logique d'authentification
│   ├── prisma.js                # Client Prisma
│   └── urlUtils.js              # Gestion des URLs
│
├── context/                     # Contexte React
│   └── AuthContext.jsx          # Contexte d'authentification
│
└── styles/                      # Styles globaux
    └── globals.css              # Feuille de style principale
```

## 🚀 Démarrage Rapide

1. **Configuration initiale**
   ```bash
   # Installer les dépendances
   npm install
   
   # Configurer les variables d'environnement
   cp .env.example .env.local
   # Puis éditer .env.local avec vos paramètres
   ```

2. **Base de données**
   ```bash
   # Appliquer les migrations
   npx prisma migrate dev
   
   # Lancer le seed (optionnel)
   npx prisma db seed
   ```

3. **Développement**
   ```bash
   # Lancer le serveur de développement
   npm run dev
   ```
   Le site sera disponible à l'adresse [http://localhost:3000](http://localhost:3000)
   L'interface d'administration est accessible à [http://localhost:3000/admin](http://localhost:3000/admin)

## 📦 Déploiement

Le projet est configuré pour un déploiement facile sur Vercel ou tout autre hébergeur compatible Next.js.

```bash
# Build pour la production
npm run build

# Lancer en production
npm start
```

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.
    └── siteData.json     # Contenu du site
```

## 🚀 Installation

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/kksmartcom/kksmartcom.github.io.git
   cd kksmartcom.github.io
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Ouvrir** [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🌍 Internationalisation

Le site supporte le français et l'anglais. La gestion de la langue se fait via le contexte React (`LangContext.jsx`) et les fichiers de données JSON.

## 🚀 Déploiement

Le site est optimisé pour le déploiement sur :
- [Vercel](https://vercel.com) (recommandé pour Next.js)
- [Netlify](https://www.netlify.com/)
- Toute plateforme supportant les applications Next.js

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :
1. Forkez le dépôt
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Ajouter une fonctionnalité incroyable'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

Pour toute question, contactez-nous via notre site web [kksmartcom.github.io](https://kksmartcom.github.io)
