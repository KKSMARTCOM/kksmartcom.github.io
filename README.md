# KK SMART COM CMS

Application Next.js 16 / Prisma pour gérer les carrières, services et le blog éditorial de KK SMART COM.

## Modules

- Carrières : offres publiées ou brouillons, candidature par e-mail.
- Services : catégories, navigation dynamique, affichage accueil et images.
- Blog : départements, sous-catégories, articles FR/EN, sections riches et publication.
- Administration protégée par JWT stocké dans un cookie `HttpOnly`.

Le portfolio historique et le contenu institutionnel restent dans les fichiers JSON hérités. Ils ne sont pas utilisés par les modules CMS ci-dessus.

## Démarrage local

```bash
npm install
Copy-Item .env.example .env.local
# renseigner JWT_SECRET et SEED_ADMIN_PASSWORD dans .env.local
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Le site est disponible sur `http://localhost:3000`, l’administration sur `/admin`.

## Variables d’environnement

| Variable | Usage |
| --- | --- |
| `DATABASE_URL` | SQLite local : `file:./dev.db` |
| `JWT_SECRET` | Secret long, aléatoire et différent par environnement |
| `SEED_ADMIN_EMAIL` | Adresse du premier administrateur |
| `SEED_ADMIN_PASSWORD` | Mot de passe du premier administrateur, utilisé uniquement par le seed |

Ne versionnez jamais `.env.local`. Le seed ne crée pas d’administrateur tant que `SEED_ADMIN_PASSWORD` n’est pas fourni.

## Production PostgreSQL

Le schéma courant est configuré pour SQLite local. Pour produire les migrations PostgreSQL, basculez explicitement le provider Prisma vers `postgresql`, définissez une URL PostgreSQL puis générez et validez les migrations dans un environnement dédié. Ne mélangez pas les fichiers de migration SQLite et PostgreSQL.

```bash
npx prisma migrate deploy
npm run build
npm start
```

## Vérifications

```bash
npx eslint src --quiet
npx prisma migrate status
npm run build
```

cas d'exception où après la migration l'admin n'a pas été créé 
## Création d'admin sans reinitialisé la base de donnée

```bash
.\node_modules\.bin\prisma.cmd db seed
```