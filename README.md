# S&arch — Guide de déploiement complet

## Architecture du projet

```
sarch/
├── index.html          ← Accueil
├── entreprises.html    ← Page Entreprises
├── candidats.html      ← Page Candidats
├── offres.html         ← Offres (filtres IT/Ingé/Tertiaire/Remote)
├── contact.html        ← Contact + formulaire
├── css/
│   ├── main.css        ← Variables, reset, layout, typo
│   └── components.css  ← Nav, footer, boutons, cards, forms
├── js/
│   └── main.js         ← Nav scroll, reveal, compteurs, FAQ, filtres
└── assets/
    └── images/         ← Déposer ici les 6 photos + logo
```

## Photos à intégrer

Remplacer les placeholders gris dans le code par :

| Fichier                          | Emplacement dans le code                    |
|----------------------------------|---------------------------------------------|
| The Hive-Shooting-Jan25-01712    | `index.html` → hero background              |
| The Hive-Shooting-Jan25-01661    | `index.html` → bloc ADN (section concept)   |
| The Hive-Shooting-Jan25-01395    | `index.html` → bloc Sourcing Factory        |
| The Hive-Shooting-Oct25-07987    | `expertises.html` ou `candidats.html`       |
| The Hive-Shooting-Oct25-07849    | `entreprises.html` → bloc réponse S&arch    |
| The Hive-Shooting-Oct25-07794    | `a-propos.html` → section équipe            |

Dans le code, chaque placeholder ressemble à :
```html
<!-- Placeholder : remplacer par The Hive-Shooting-Jan25-01712.jpg -->
<div style="...background gris..."></div>
```
Remplacer par :
```html
<img src="assets/images/The-Hive-Shooting-Jan25-01712.jpg"
     alt="Équipe S&arch" style="width:100%;height:100%;object-fit:cover;">
```

## Infos à compléter (placeholders dans le code)

Chercher `PLACEHOLDER` ou `XX XX XX` dans les fichiers :

- `contact.html` : adresse réelle, téléphone, email
- `footer` dans tous les fichiers : URL LinkedIn réelle
- `index.html` : numéros de stats (missions, satisfaction, délai)

---

## Déploiement Git + Vercel

### Étape 1 — Initialiser le repo Git local

```bash
cd sarch
git init
git add .
git commit -m "feat: init site S&arch complet"
```

### Étape 2 — Créer le repo sur GitHub

1. Aller sur https://github.com/new
2. Nommer le repo `sarch` (ou `sarch-website`)
3. Laisser vide (sans README, sans .gitignore)
4. Cliquer "Create repository"

### Étape 3 — Connecter et pousser

```bash
git remote add origin https://github.com/VOTRE-COMPTE/sarch.git
git branch -M main
git push -u origin main
```

### Étape 4 — Déployer sur Vercel

1. Aller sur https://vercel.com → "Add New Project"
2. Importer le repo GitHub `sarch`
3. Framework Preset : **Other** (site statique)
4. Root Directory : laisser `/`
5. Cliquer **Deploy**

✅ Votre site est en ligne sur `sarch.vercel.app` en 30 secondes.

### Étape 5 — Connecter votre nom de domaine

#### Sur Vercel :
1. Project → Settings → Domains
2. Ajouter votre domaine (ex: `sarch.fr`)
3. Vercel vous donne 2 enregistrements DNS à copier

#### Chez votre registrar (OVH / Gandi / Ionos...) :

| Type  | Nom        | Valeur                          |
|-------|------------|---------------------------------|
| A     | @          | `76.76.21.21`                   |
| CNAME | www        | `cname.vercel-dns.com`          |

Propagation DNS : 5 minutes à 24h selon le registrar.

### Mises à jour futures

Chaque modification = 3 commandes :
```bash
git add .
git commit -m "update: description du changement"
git push
```
→ Vercel redéploie automatiquement en 30 secondes.

---

## Checklist avant mise en ligne

- [ ] Toutes les photos intégrées (plus de placeholders gris)
- [ ] Logo S&arch ajouté
- [ ] Adresse, téléphone, email renseignés dans `contact.html`
- [ ] URL LinkedIn réelle dans tous les footers
- [ ] Témoignages réels (si disponibles)
- [ ] Domaine connecté et HTTPS actif
- [ ] Google Analytics 4 installé (ajouter le tag dans `<head>`)
- [ ] Google Search Console vérifié
- [ ] Test mobile validé (Chrome DevTools)
- [ ] Formulaires testés (à brancher sur Formspree ou Netlify Forms)

## Connexion formulaires (sans backend)

Pour que les formulaires fonctionnent sans serveur :

1. Créer un compte gratuit sur https://formspree.io
2. Créer un formulaire → obtenir un endpoint (ex: `https://formspree.io/f/XXXXXXXX`)
3. Dans `contact.html`, modifier le bouton :

```html
<!-- Remplacer le <button> par : -->
<form action="https://formspree.io/f/XXXXXXXX" method="POST">
  <!-- ... champs du formulaire ... -->
  <button type="submit" class="btn btn--primary btn--lg">
    Envoyer ma demande <span class="arrow">→</span>
  </button>
</form>
```

## Google Analytics 4

Ajouter dans le `<head>` de chaque page (avant `</head>`) :

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Remplacer `G-XXXXXXXXXX` par votre ID Google Analytics.
