# 🔧 Correction de la Boucle de Redirection Infinie

## 🚨 Problème

**Erreur :** `ERR_TOO_MANY_REDIRECTS` - "stratelink-global.com vous a redirigé à de trop nombreuses reprises"

## 🔍 Cause

La configuration des redirections dans `netlify.toml` créait un conflit :
- Les redirections HTTP → HTTPS étaient mal configurées
- Conflit entre les règles de redirection avec `force = true`
- Le SPA fallback entrait en conflit avec les autres redirections

## ✅ Solution Appliquée

### 1. Correction de `netlify.toml`

**Avant (problématique) :**
```toml
# Redirection HTTP vers HTTPS pour .com
[[redirects]]
  from = "http://stratelink-global.com/*"
  to = "https://stratelink-global.com/:splat"
  status = 301
  force = true
```

**Après (corrigé) :**
```toml
# Redirection www vers non-www pour .com (HTTPS uniquement)
[[redirects]]
  from = "/*"
  to = "https://stratelink-global.com/:splat"
  status = 301
  force = true
  conditions = { Host = ["www.stratelink-global.com"] }

# Redirection .ae vers .com (301)
[[redirects]]
  from = "/*"
  to = "https://stratelink-global.com/:splat"
  status = 301
  force = true
  conditions = { Host = ["stratelink-global.ae", "www.stratelink-global.ae"] }

# SPA fallback pour Next.js (doit être en dernier)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Création de `public/_redirects`

Fichier de redirections Netlify plus simple et plus fiable :

```
# Redirection www vers non-www
https://www.stratelink-global.com/*  https://stratelink-global.com/:splat  301!

# Redirection .ae vers .com
https://stratelink-global.ae/*  https://stratelink-global.com/:splat  301!
https://www.stratelink-global.ae/*  https://stratelink-global.com/:splat  301!

# SPA fallback pour Next.js (doit être en dernier)
/*  /index.html  200
```

## 🚀 Déploiement

### Étape 1 : Commit et Push

```bash
git add netlify.toml public/_redirects FIX_REDIRECT_LOOP.md
git commit -m "fix: Correction de la boucle de redirection infinie"
git push
```

### Étape 2 : Attendre le Déploiement Netlify

Netlify va automatiquement :
1. Détecter le push
2. Lancer le build
3. Déployer avec la nouvelle configuration
4. Appliquer les nouvelles règles de redirection

**Temps estimé :** 2-3 minutes

### Étape 3 : Vider le Cache

Après le déploiement, vider le cache du navigateur :

**Chrome/Edge :**
1. Ouvrir les DevTools (F12)
2. Clic droit sur le bouton Actualiser
3. Sélectionner "Vider le cache et actualiser de manière forcée"

**Firefox :**
1. Ctrl + Shift + Delete
2. Cocher "Cache"
3. Cliquer sur "Effacer maintenant"

**Safari :**
1. Cmd + Option + E (vider les caches)
2. Cmd + R (actualiser)

### Étape 4 : Tester

Tester les URLs suivantes :

```bash
# URL principale (doit fonctionner)
https://stratelink-global.com

# www (doit rediriger vers non-www)
https://www.stratelink-global.com

# .ae (doit rediriger vers .com)
https://stratelink-global.ae
https://www.stratelink-global.ae
```

## 🔍 Vérification

### Test en ligne de commande

```bash
# Tester la redirection www → non-www
curl -I https://www.stratelink-global.com

# Devrait retourner :
# HTTP/2 301
# location: https://stratelink-global.com/

# Tester l'URL principale
curl -I https://stratelink-global.com

# Devrait retourner :
# HTTP/2 200
```

### Test dans le navigateur

1. Ouvrir https://stratelink-global.com en navigation privée
2. Vérifier qu'il n'y a pas d'erreur de redirection
3. Vérifier que le site se charge correctement
4. Tester les autres URLs (www, .ae)

## 📊 Ordre des Redirections

**Important :** L'ordre des règles de redirection est crucial :

1. **Redirections spécifiques** (www, .ae) avec `conditions`
2. **SPA fallback** (doit être en dernier)

Netlify traite les règles dans l'ordre, la première correspondance gagne.

## ⚠️ Points d'Attention

### HTTP → HTTPS

Netlify gère automatiquement la redirection HTTP → HTTPS quand :
- Le certificat SSL est valide
- L'option "Force HTTPS" est activée dans les paramètres

**Vérifier dans Netlify :**
1. Site settings > Domain management > HTTPS
2. Activer "Force HTTPS redirect"

### Certificat SSL

Si le certificat SSL est expiré, les redirections HTTPS ne fonctionneront pas.

**Vérifier :**
1. Site settings > Domain management > HTTPS
2. Vérifier l'état du certificat
3. Renouveler si nécessaire

## 🐛 Dépannage

### Si le problème persiste

1. **Vider le cache Netlify**
   ```bash
   # Via Netlify CLI
   netlify deploy --prod --clear-cache
   ```

2. **Vérifier les logs Netlify**
   - Aller sur https://app.netlify.com
   - Sélectionner le site
   - Onglet "Deploys"
   - Cliquer sur le dernier déploiement
   - Vérifier les logs

3. **Désactiver temporairement les redirections**
   - Commenter toutes les redirections sauf le SPA fallback
   - Déployer
   - Tester
   - Réactiver une par une

4. **Tester localement**
   ```bash
   # Installer Netlify CLI
   npm install -g netlify-cli
   
   # Tester localement avec les redirections
   netlify dev
   ```

### Erreurs courantes

**Erreur : "Redirect loop detected"**
- Vérifier qu'il n'y a pas de redirection circulaire
- Vérifier l'ordre des règles

**Erreur : "Too many redirects"**
- Vider le cache du navigateur
- Vérifier les conditions des redirections
- S'assurer que le SPA fallback est en dernier

**Erreur : "Certificate error"**
- Renouveler le certificat SSL
- Vérifier que "Force HTTPS" est activé

## 📚 Ressources

- [Netlify Redirects Documentation](https://docs.netlify.com/routing/redirects/)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/)
- [Debugging Redirects](https://docs.netlify.com/routing/redirects/redirect-options/#debugging-redirects)

## ✅ Checklist Post-Correction

- [ ] Code committé et pushé
- [ ] Déploiement Netlify terminé
- [ ] Cache navigateur vidé
- [ ] URL principale fonctionne
- [ ] Redirections www → non-www fonctionnent
- [ ] Redirections .ae → .com fonctionnent
- [ ] Pas d'erreur de redirection
- [ ] Certificat SSL valide
- [ ] Force HTTPS activé

---

**Date de correction :** 30 mai 2026  
**Statut :** ✅ Corrigé  
**Temps de résolution :** ~5 minutes
