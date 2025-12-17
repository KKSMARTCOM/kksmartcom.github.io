# KK SMART COM - Site Web

Site web officiel de KK SMART COM, une agence de communication digitale offrant des services complets pour les entreprises et les startups.

## 🚀 Fonctionnalités

- 🌍 **Internationalisation** : Support multilingue (Français et Anglais) avec gestion du contexte de langue
- 📱 **Design responsive** : Adapté à tous les appareils avec Tailwind CSS
- ⚡ **Optimisé pour les performances** : Construit avec Next.js pour un chargement ultra-rapide
- 📝 **Système d'articles** : Gestion de contenu dynamique avec articles et blog
- 📅 **Intégration Calendly** : Prise de rendez-vous intégrée
- 🍪 **Gestion des cookies** : Popup de consentement conforme RGPD

## 🛠️ Technologies utilisées

- **Framework** : Next.js 16
- **UI** : React 19
- **Styling** : Tailwind CSS 4
- **Internationalisation** : Système de contexte personnalisé
- **Gestion d'état** : Contexte React
- **Carrousels** : Swiper.js

## 📁 Structure du Projet

```
src/
├── app/                  # Routage et pages
│   ├── apropos/          # Page À propos
│   ├── articlespages/    # Pages d'articles
│   ├── blog/             # Section blog
│   └── project/          # Pages de projets
│
├── components/           # Composants réutilisables
│   ├── ArticlesComponents/  # Composants d'articles
│   ├── BoutonReservationCalendly.jsx
│   ├── ContactModal.jsx
│   ├── CookiePopup.jsx
│   ├── CTA.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── Mission.jsx
│   ├── PreuveSocial.jsx
│   └── WhoUs.jsx
│
├── context/              # Contexte React
│   └── LangContext.jsx   # Gestion de la langue
│
└── data/                 # Données du site
    ├── articlesData.json # Données des articles
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
