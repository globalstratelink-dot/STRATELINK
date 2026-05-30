# ⚙️ Vérification des Paramètres Netlify

## 🎯 Objectif

S'assurer que les paramètres Netlify ne créent pas de conflit avec les redirections.

## 📋 Paramètres à Vérifier

### 1. Force HTTPS

**Emplacement :** Site settings > Domain management > HTTPS

**Configuration recommandée :**
- ✅ **Activer** "Automatic HTTPS"
- ✅ **Activer** "Force HTTPS redirect"

**Pourquoi ?**
- Netlify gère automatiquement HTTP → HTTPS
- Pas besoin de règles de redirection manuelles pour HTTP → HTTPS
- Évite les conflits avec les autres redirections

### 2. Domain Settings

**Emplacement :** Site settings > Domain management > Domains

**Configuration actuelle :**
- Primary domain : `stratelink-global.com`
- Domain aliases : 
  - `www.stratelink-global.com`
  - `stratelink-global.ae`
  - `www.stratelink-global.ae`
  - `stratelink-global.netlify.app`

**Vérifications :**
- [ ] Le domaine principal est bien `stratelink-global.com` (sans www)
- [ ] Tous les alias sont configurés
- [ ] Les DNS pointent correctement vers Netlify

### 3. Build Settings

**Emplacement :** Site settings > Build & deploy > Build settings

**Configuration actuelle :**
```
Build command: pnpm build
Publish directory: .next
```

**Vérifications :**
- [ ] La commande de build est correcte
- [ ] Le dossier de publication est `.next`
- [ ] Node version est 18

### 4. Environment Variables

**Emplacement :** Site settings > Environment variables

**Variables requises :**
- `GMAIL_USER` = globalstratelink@gmail.com
- `GMAIL_APP_PASSWORD` = [mot de passe d'application]

**Vérifications :**
- [ ] Les variables sont définies
- [ ] Pas de valeurs hardcodées dans le code

### 5. Deploy Settings

**Emplacement :** Site settings > Build & deploy > Deploy settings

**Configuration recommandée :**
- ✅ Auto publishing activé
- ✅ Branch deploys : `main` ou `master`
- ✅ Deploy previews activés

## 🔧 Actions à Effectuer

### Étape 1 : Vérifier Force HTTPS

1. Aller sur https://app.netlify.com
2. Sélectionner le site `stratelink-global`
3. **Site settings** > **Domain management** > **HTTPS**
4. Vérifier que ces options sont **activées** :
   - ✅ Automatic HTTPS
   - ✅ Force HTTPS redirect

**Si désactivé :**
- Cliquer sur "Enable" pour chaque option
- Attendre 1-2 minutes pour la propagation

### Étape 2 : Vérifier le Domaine Principal

1. **Site settings** > **Domain management** > **Domains**
2. Vérifier que `stratelink-global.com` est marqué comme "Primary domain"
3. Si ce n'est pas le cas :
   - Cliquer sur les 3 points à côté du domaine
   - Sélectionner "Set as primary domain"

### Étape 3 : Vérifier les DNS

1. **Site settings** > **Domain management** > **Domains**
2. Cliquer sur chaque domaine
3. Vérifier que le statut est "Netlify DNS" ou "External DNS configured"

**Pour stratelink-global.com :**
```
Type: A
Name: @
Value: 75.2.60.5
```

**Pour www.stratelink-global.com :**
```
Type: CNAME
Name: www
Value: stratelink-global.netlify.app
```

### Étape 4 : Vérifier le Certificat SSL

1. **Site settings** > **Domain management** > **HTTPS**
2. Section "SSL/TLS certificate"
3. Vérifier :
   - ✅ Certificat actif
   - ✅ Date d'expiration > 60 jours
   - ✅ Couvre tous les domaines

**Si expiré ou manquant :**
- Cliquer sur "Renew certificate"
- Attendre 5-10 minutes
- Vérifier à nouveau

### Étape 5 : Tester les Redirections

Après avoir vérifié tous les paramètres :

```bash
# Test 1 : URL principale
curl -I https://stratelink-global.com
# Attendu : HTTP/2 200

# Test 2 : www → non-www
curl -I https://www.stratelink-global.com
# Attendu : HTTP/2 301
# Location: https://stratelink-global.com/

# Test 3 : .ae → .com
curl -I https://stratelink-global.ae
# Attendu : HTTP/2 301
# Location: https://stratelink-global.com/

# Test 4 : HTTP → HTTPS (si Force HTTPS activé)
curl -I http://stratelink-global.com
# Attendu : HTTP/1.1 301
# Location: https://stratelink-global.com/
```

## 🚨 Problèmes Courants

### Problème 1 : Force HTTPS désactivé

**Symptôme :** HTTP ne redirige pas vers HTTPS

**Solution :**
1. Activer "Force HTTPS redirect" dans les paramètres
2. Attendre 2-3 minutes
3. Vider le cache du navigateur
4. Tester à nouveau

### Problème 2 : Certificat SSL expiré

**Symptôme :** Erreur de certificat dans le navigateur

**Solution :**
1. Renouveler le certificat dans les paramètres
2. Si le bouton est grisé, attendre 24-48h
3. Contacter le support Netlify si nécessaire

### Problème 3 : DNS mal configuré

**Symptôme :** Le site ne se charge pas ou erreur DNS

**Solution :**
1. Vérifier les enregistrements DNS chez Namecheap
2. S'assurer qu'ils pointent vers Netlify
3. Attendre la propagation DNS (jusqu'à 48h)

### Problème 4 : Domaine principal incorrect

**Symptôme :** Redirections ne fonctionnent pas comme prévu

**Solution :**
1. Définir `stratelink-global.com` (sans www) comme domaine principal
2. Redéployer le site
3. Vider le cache

## 📊 Configuration Optimale

### Résumé de la Configuration Recommandée

```yaml
Domain Settings:
  Primary Domain: stratelink-global.com
  Aliases:
    - www.stratelink-global.com
    - stratelink-global.ae
    - www.stratelink-global.ae

HTTPS Settings:
  Automatic HTTPS: ✅ Enabled
  Force HTTPS: ✅ Enabled
  Certificate: ✅ Valid (Let's Encrypt)

Build Settings:
  Build Command: pnpm build
  Publish Directory: .next
  Node Version: 18

Redirects:
  www → non-www: ✅ Configured
  .ae → .com: ✅ Configured
  HTTP → HTTPS: ✅ Automatic (Force HTTPS)
  SPA Fallback: ✅ Configured
```

## ✅ Checklist de Vérification

### Paramètres Netlify
- [ ] Force HTTPS activé
- [ ] Automatic HTTPS activé
- [ ] Domaine principal : stratelink-global.com
- [ ] Tous les alias configurés
- [ ] Certificat SSL valide
- [ ] DNS correctement configurés

### Fichiers de Configuration
- [ ] `netlify.toml` corrigé
- [ ] `public/_redirects` créé
- [ ] Pas de redirections HTTP → HTTPS manuelles
- [ ] SPA fallback en dernier

### Tests
- [ ] URL principale fonctionne
- [ ] www redirige vers non-www
- [ ] .ae redirige vers .com
- [ ] HTTP redirige vers HTTPS
- [ ] Pas de boucle de redirection

## 📞 Support

Si les problèmes persistent après avoir vérifié tous ces paramètres :

1. **Netlify Support :** support@netlify.com
2. **Netlify Community :** https://answers.netlify.com
3. **Documentation :** https://docs.netlify.com

---

**Dernière mise à jour :** 30 mai 2026  
**Statut :** Guide de vérification
