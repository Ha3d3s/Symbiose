# 🌸 Symbiose — Compteur de points

Application mobile pour compter les points du jeu de société **Symbiose**.

## Fonctionnalités
- 👥 Gestion de groupes de joueurs (2 à 4 par groupe)
- 🎮 Assignation d'un joueur par animal avant chaque partie
- 📊 Grille de score 4×2 avec pavé numérique
- 🏆 Popup vainqueur avec confettis en fin de partie
- 📜 Historique, classement des victoires et records personnels

---

## 🚀 Mise en ligne sur GitHub Pages (une seule fois)

### 1. Crée un dépôt GitHub
- Va sur [github.com/new](https://github.com/new)
- Nomme-le `symbiose-score` (ou ce que tu veux)
- Laisse-le **Public**, ne coche rien d'autre
- Clique **Create repository**

### 2. Uploade les fichiers
```bash
git init
git add .
git commit -m "Initial commit - Symbiose score app"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/symbiose-score.git
git push -u origin main
```
> Remplace `TON_USERNAME` par ton nom d'utilisateur GitHub.

### 3. Active GitHub Pages
- Dans ton dépôt → **Settings** → **Pages**
- Sous *Source*, choisis **GitHub Actions**
- Sauvegarde

Le workflow se lance automatiquement. En 1–2 minutes ton app sera disponible à :
```
https://TON_USERNAME.github.io/symbiose-score/
```

---

## 📱 Ajouter à l'écran d'accueil

### Sur iPhone / iPad (Safari)
1. Ouvre l'URL ci-dessus dans **Safari**
2. Tape l'icône **Partager** (carré avec flèche ↑)
3. Choisis **"Sur l'écran d'accueil"**
4. Confirme → l'icône Symbiose apparaît 🌸

### Sur Android (Chrome)
1. Ouvre l'URL dans **Chrome**
2. Tape le menu ⋮ en haut à droite
3. Choisis **"Ajouter à l'écran d'accueil"**
4. Confirme → l'icône apparaît 🌸

---

## 🛠 Développement local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:5173](http://localhost:5173)
