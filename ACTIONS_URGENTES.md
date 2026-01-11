# Actions Urgentes - Stratelink Global

## 🔴 CRITIQUE : À faire IMMÉDIATEMENT

### 1. Sécuriser les Credentials Exposés (15 minutes)

**Problème :** Un mot de passe d'application Gmail est exposé dans le code source.

**Étapes :**

#### A. Révoquer le mot de passe compromis

1. Aller sur https://myaccount.google.com/apppasswords
2. Se connecter avec le compte `globalstratelink@gmail.com`
3. Supprimer/révoquer le mot de passe d'application qui commence par `nkpk...`

#### B. Créer un nouveau mot de passe

1. Dans Google Account > Sécurité > Validation en deux étapes
2. Générer un nouveau mot de passe d'application
3. Copier le mot de passe (vous ne pourrez plus le voir après)

#### C. Configurer dans Netlify

1. Aller sur https://app.netlify.com
2. Sélectionner le site `stratelink-global`
3. **Site settings** > **Environment variables**
4. Ajouter/modifier :
   ```
   GMAIL_USER = globalstratelink@gmail.com
   GMAIL_APP_PASSWORD = [nouveau mot de passe]
   ```
5. Cliquer sur **Save**

#### D. Mettre à jour le code

1. Éditer `lib/nodemailer-config.ts`
2. Supprimer le fallback hardcodé :
   ```typescript
   // AVANT (DANGEREUX)
   pass: process.env.GMAIL_APP_PASSWORD || 'nkpjkcdbvteweetw'
   
   // APRÈS (SÉCURISÉ)
   pass: process.env.GMAIL_APP_PASSWORD!
   ```

3. Ajouter une vérification :
   ```typescript
   if (!process.env.GMAIL_APP_PASSWORD) {
     throw new Error('GMAIL_APP_PASSWORD environment variable is required')
   }
   ```

#### E. Redéployer

```bash
git add lib/nodemailer-config.ts
git commit -m "Security: Remove hardcoded credentials"
git push
```

Netlify redéploiera automatiquement.

---

### 2. Renouveler le Certificat SSL (10 minutes)

**Problème :** Certificat SSL expiré depuis le 26 novembre.

**Étapes :**

1. Aller sur https://app.netlify.com
2. Sélectionner le site `stratelink-global`
3. **Site settings** > **Domain management** > **HTTPS**
4. Si l'avertissement de désactivation est encore présent :
   - Attendre 24-48h OU
   - Contacter le support Netlify
5. Si le bouton "Renew certificate" est disponible :
   - Cliquer sur **Renew certificate**
   - Attendre 5-10 minutes
   - Vérifier que le certificat est renouvelé

**Vérification :**
- Ouvrir https://stratelink-global.com
- Vérifier qu'il n'y a pas d'avertissement de sécurité
- Le cadenas vert doit être présent

---

### 3. Nettoyer l'historique Git (Optionnel mais recommandé)

Si le repository est public ou partagé, nettoyer l'historique :

```bash
# Installer git-filter-repo (si pas déjà installé)
pip install git-filter-repo

# Supprimer le mot de passe de l'historique
git filter-repo --path lib/nodemailer-config.ts \
  --invert-paths \
  --force

# OU utiliser BFG Repo-Cleaner (plus simple)
# Télécharger: https://rtyley.github.io/bfg-repo-cleaner/
java -jar bfg.jar --replace-text passwords.txt

# Force push (ATTENTION: coordination avec l'équipe requise)
git push --force --all
```

⚠️ **Important :** Cette opération réécrit l'historique Git. Coordonnez avec l'équipe avant.

---

## 📋 Checklist Post-Actions

Après avoir effectué les actions ci-dessus, vérifier :

- [ ] Le site est accessible en HTTPS sans avertissement
- [ ] Le formulaire de contact fonctionne (tester l'envoi)
- [ ] Les variables d'environnement sont configurées dans Netlify
- [ ] Aucun credential n'est visible dans le code source
- [ ] Le nouveau mot de passe d'application fonctionne
- [ ] Le certificat SSL est valide pour au moins 60 jours

---

## 🔍 Vérification de Sécurité

### Commandes pour vérifier les secrets dans le code :

```bash
# Chercher des patterns de mots de passe
grep -r "password.*=" lib/ components/ app/ --exclude-dir=node_modules

# Chercher des API keys
grep -r "api.*key\|api_key\|apikey" --exclude-dir=node_modules -i

# Chercher des emails avec mots de passe
grep -r "@.*\.com\|@.*\.fr" --exclude-dir=node_modules | grep -i pass
```

### Vérifier les variables d'environnement Netlify :

```bash
# Via Netlify CLI
netlify env:list
```

---

## 📞 Support

Si vous rencontrez des problèmes :

1. **Netlify SSL :** support@netlify.com
2. **Google Account :** https://support.google.com/accounts
3. **Développement :** Vérifier les logs Netlify Functions

---

**Temps estimé total :** 25-30 minutes  
**Priorité :** 🔴 CRITIQUE - À faire aujourd'hui

