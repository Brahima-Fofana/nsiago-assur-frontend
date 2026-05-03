# NSIAGO'ASSUR — Frontend

Interface web de la plateforme de simulation et souscription d'assurance automobile de l'association Action'Elles en partenariat avec NSIAGO'ASSUR.

---

## Stack technique

| Outil | Version | Rôle |
|---|---|---|
| React | 18 | UI |
| Vite | 5 | Bundler / Dev server |
| Tailwind CSS | 3 | Styles utilitaires |
| React Router | 6 | Routing SPA |

---

## Prérequis

- Node.js 18+
- npm ou yarn
- Le backend doit tourner sur `http://localhost:8000`

---

## Installation et lancement

### Option 1 — Développement local

**1. Cloner le projet**
```bash
git clone https://github.com/brahima-fofana/nsiago-assur-frontend.git
cd nsiaga-assur-frontend
```

**2. Installer les dépendances**
```bash
npm install
```

**3. Configurer l'URL de l'API**

Dans `src/services/api.js`, vérifiez que la base URL pointe vers votre backend :
```javascript
const BASE_URL = 'http://localhost:8000/api'
```

**4. Lancer le serveur de développement**
```bash
npm run dev
```

L'application est accessible sur : `http://localhost:5173`

---

### Option 2 — Build de production

**1. Builder le projet**
```bash
npm run build
```

Le dossier `dist/` est généré à la racine du projet.

**2. Prévisualiser le build**
```bash
npm run preview
```

**3. Déployer**

Copiez le contenu du dossier `dist/` sur votre serveur web (Nginx, Apache, etc.) :

```bash
scp -r dist/ user@votre-serveur:/user/nsiago-assur/frontend
```

## Pages disponibles

| Route | Page | Accès |
|---|---|---|
| `/` | Accueil (Landing page) | Publique |
| `/login` | Connexion | Publique |
| `/inscription` | Création de compte | Publique |
| `/activation` | Activation du compte | Publique |
| `/dashboard` | Tableau de bord | Protégée (JWT requis) |

---

## Fonctionnalités

- **Authentification complète** — Inscription, activation par code à 6 chiffres, connexion, déconnexion
- **Simulation de devis** — Formulaire de calcul de prime avec tous les produits disponibles
- **Tableau de bord** — KPIs, historique des devis avec statut valide/expiré
- **Protection des routes** — Redirection automatique vers `/login` si non authentifié
- **Responsive** — Interface adaptée mobile et desktop

---

## Structure du projet

```
src/
├── App.jsx                  — Routing principal + PrivateRoute
├── main.jsx                 — Point d'entrée
├── index.css                — Styles globaux + animations
├── pages/
│   ├── Home.jsx             — Landing page publique
│   ├── Login.jsx            — Page de connexion
│   ├── Register.jsx         — Page d'inscription
│   ├── Activation.jsx       — Page d'activation du compte
│   └── Dashboard.jsx        — Tableau de bord protégé
├── components/
│   ├── Navbar.jsx           — Barre de navigation
│   ├── KpiCard.jsx          — Carte métrique
│   ├── QuoteForm.jsx        — Formulaire de simulation
│   ├── QuoteResult.jsx      — Affichage du résultat
│   └── QuoteTable.jsx       — Tableau des devis
└── services/
    └── api.js               — Couche réseau centralisée
```

---

## Commandes disponibles

```bash
npm run dev        # Lancer le serveur de développement → http://localhost:5173
npm run build      # Builder pour la production → dossier dist/
npm run preview    # Prévisualiser le build de production
```

---

## Application en ligne

L'application est disponible à l'adresse :
**https://nsiaga-assur.devbrahima.com**

---

## Auteur

**Brahima Fofana**
GitHub : [github.com/brahima-fofana](https://github.com/brahima-fofana)

---

## Licence

Tous droits réservés © 2026 NSIAGO'ASSUR