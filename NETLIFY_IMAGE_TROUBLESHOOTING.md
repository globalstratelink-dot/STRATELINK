# 🔧 Guide de Dépannage - Images sur Netlify

## ❌ **Problème : Images non affichées en production**

### **Symptômes**
- Images visibles en local mais pas sur Netlify
- Erreurs 404 pour les images
- Images cassées ou non chargées
- Console avec erreurs de chargement d'images

## ✅ **Solutions Implémentées**

### **1. Configuration Next.js Corrigée**
```javascript
// next.config.mjs
images: {
  unoptimized: true,  // ✅ CRUCIAL pour Netlify
  remotePatterns: [   // ✅ Remplace domains (déprécié)
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
      port: '',
      pathname: '/**',
    },
  ],
  formats: ['image/webp', 'image/avif'],
}
```

**Pourquoi `unoptimized: true` ?**
- Netlify n'a pas le serveur d'optimisation d'images de Next.js
- Les images doivent être servies directement depuis `/public`
- Évite les erreurs de build et de runtime

### **2. Composant d'Image Optimisé pour Production**
```tsx
// components/production-optimized-image.tsx
export function HomePageImage({ 
  type, 
  src, 
  ...props 
}: { 
  type: 'hero' | 'services' 
} & ImageProps) {
  
  const config = {
    hero: {
      sizes: "(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 400px",
      quality: 85,
      priority: true
    },
    services: {
      sizes: "(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 800px",
      quality: 85,
      priority: true
    }
  }

  return (
    <ProductionOptimizedImage
      {...props}
      sizes={config[type].sizes}
      quality={config[type].quality}
      priority={config[type].priority}
      unoptimized={true}  // ✅ Spécifique à la production
    />
  )
}
```

### **3. Headers Netlify pour les Images**
```bash
# netlify/headers
/public/*.webp
  Cache-Control: public, max-age=31536000, immutable
  Content-Type: image/webp

/public/*.png
  Cache-Control: public, max-age=31536000, immutable
  Content-Type: image/png
```

### **4. Redirections Netlify**
```bash
# netlify/redirects
/public/* /public/:splat 200
/_next/static/* /_next/static/:splat 200
/* /index.html 200
```

## 🚀 **Utilisation dans les Composants**

### **Avant (Problématique)**
```tsx
import Image from "next/image"

<Image
  src="/2152005452.webp"  // ❌ Peut ne pas fonctionner sur Netlify
  alt="Hero Image"
  fill
  priority
/>
```

### **Après (Corrigé)**
```tsx
import { HomePageImage } from "@/components/production-optimized-image"

<HomePageImage
  type="hero"              // ✅ Configuration automatique
  src="/2152005452.webp"   // ✅ Fonctionne sur Netlify
  alt="Hero Image"
  fill
/>
```

## 🔍 **Vérifications à Effectuer**

### **1. Structure des Fichiers**
```
public/
├── 2152005452.webp    ✅ Image du Slide 1
├── 2151663057.webp    ✅ Image du Slide 2
└── ... autres images
```

### **2. Configuration Netlify**
```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

# Headers et redirections
[[headers]]
  for = "/public/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### **3. Build de Production**
```bash
# Vérifier que le build fonctionne
pnpm build

# Vérifier que les images sont dans .next/static
ls .next/static/media/
```

## 🧪 **Tests de Validation**

### **Test Local**
```bash
# Démarrer le serveur de production local
pnpm build
pnpm start

# Vérifier http://localhost:3000
# Les images doivent s'afficher
```

### **Test Netlify**
1. **Déployer** : Push vers GitHub déclenche le déploiement
2. **Vérifier** : Aller sur l'URL Netlify
3. **Inspecter** : Ouvrir DevTools > Network
4. **Valider** : Images chargées sans erreur 404

### **Test des Images Individuelles**
```bash
# Tester l'accès direct aux images
https://votre-site.netlify.app/2152005452.webp
https://votre-site.netlify.app/2151663057.webp
```

## 🚨 **Problèmes Courants et Solutions**

### **Problème 1 : Erreur 404 sur les images**
**Solution :**
- Vérifier que `unoptimized: true` dans `next.config.mjs`
- S'assurer que les images sont dans `/public`
- Vérifier les redirections Netlify

### **Problème 2 : Images trop lentes à charger**
**Solution :**
- Optimiser la taille des images (< 500 KB)
- Utiliser le format WebP
- Implémenter le lazy loading

### **Problème 3 : Images cassées sur mobile**
**Solution :**
- Vérifier les attributs `sizes` responsive
- Tester sur différents appareils
- Utiliser le composant `HomePageImage`

## 📱 **Optimisations Mobile**

### **Détection Automatique**
```tsx
const [isMobile, setIsMobile] = useState(false)

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768)
  }
  
  checkMobile()
  window.addEventListener('resize', checkMobile)
  
  return () => window.removeEventListener('resize', checkMobile)
}, [])
```

### **Qualité Adaptative**
```tsx
// Qualité réduite sur mobile pour les performances
const quality = isMobile ? 75 : 85
```

## 🔄 **Maintenance Continue**

### **Vérifications Régulières**
- [ ] Images accessibles sur Netlify
- [ ] Performance des images optimale
- [ ] Cache des images fonctionnel
- [ ] Responsive sur tous les appareils

### **Mises à Jour**
- [ ] Nouvelles images optimisées
- [ ] Configuration Next.js à jour
- [ ] Headers Netlify optimisés
- [ ] Composants d'image améliorés

---

## 🎯 **Résultat Attendu**

Après application de ces corrections :
- ✅ **Images visibles** sur Netlify
- ✅ **Performance optimale** sur PC et mobile
- ✅ **Chargement rapide** des images
- ✅ **Responsive design** parfait
- ✅ **Cache efficace** des images

---

*Dernière mise à jour : Août 2025*
*Version : 1.0 - Résolution des problèmes d'images* 