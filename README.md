# Stratelink Global - Site Web

Site web moderne pour les services d'import/export internationaux.

## 🚀 Déploiement sur Netlify

### Méthode 1 : Déploiement depuis le dossier local

1. **Préparer le projet**
   ```bash
   pnpm install
   pnpm build
   ```

2. **Aller sur Netlify**
   - Visitez [netlify.com](https://netlify.com)
   - Connectez-vous ou créez un compte

3. **Déployer depuis le dossier**
   - Cliquez sur "Sites" dans le menu
   - Glissez-déposez le dossier du projet directement dans la zone de déploiement
   - Ou cliquez sur "Deploy manually" et sélectionnez le dossier

4. **Configuration automatique**
   - Netlify détectera automatiquement que c'est un projet Next.js
   - Le fichier `netlify.toml` configurera automatiquement le build

### Méthode 2 : Déploiement via CLI Netlify

1. **Installer Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Se connecter à Netlify**
   ```bash
   netlify login
   ```

3. **Déployer le projet**
   ```bash
   netlify deploy --prod
   ```

## 📁 Structure du projet

```
insaaph-capital/
├── app/                    # Pages Next.js 14 App Router
├── components/             # Composants React
├── contexts/              # Contextes React
├── hooks/                 # Hooks personnalisés
├── lib/                   # Utilitaires et traductions
├── public/                # Assets statiques
└── styles/                # Styles globaux
```

## 🛠️ Technologies utilisées

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS
- **Framer Motion** - Animations
- **Lucide React** - Icônes
- **Shadcn/ui** - Composants UI

## 🎨 Design System

- **Couleurs** : Navy, Copper, Sand
- **Animations** : Scroll reveal, hover effects
- **Responsive** : Mobile-first design
- **Accessibilité** : WCAG 2.1 compliant

## 🌐 Fonctionnalités

- ✅ Design moderne et professionnel
- ✅ Animations fluides et optimisées
- ✅ Support multilingue (FR/EN)
- ✅ Performance optimisée
- ✅ SEO optimisé
- ✅ Responsive design

## 📝 Scripts disponibles

```bash
pnpm dev          # Développement local
pnpm build        # Build de production
pnpm start        # Démarrer le serveur de production
pnpm lint         # Vérification du code
pnpm deploy       # Déploiement sur Netlify
```

## 🔧 Configuration Netlify

Le fichier `netlify.toml` configure automatiquement :
- Commande de build : `pnpm build`
- Dossier de publication : `.next`
- Version de Node.js : 18
- Redirections pour SPA
- Headers de sécurité

## 📞 Support

Pour toute question concernant le déploiement ou le développement, contactez l'équipe technique.
