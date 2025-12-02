# 🔐 Configuration des Variables d'Environnement

## 📋 **Variables Requises pour Nodemailer**

Votre projet Stratelink Global nécessite ces variables d'environnement pour fonctionner correctement :

### **1. Variables Principales**

| Variable | Valeur | Description |
|----------|---------|-------------|
| `GMAIL_USER` | `globalstratelink@gmail.com` | Email Gmail principal |
| `GMAIL_APP_PASSWORD` | `fode wwot vqfu wzvu` | Mot de passe d'application Google |

## 🌐 **Configuration sur Netlify (Production)**

### **Étapes :**

1. **Allez sur [netlify.com](https://netlify.com)**
2. **Connectez-vous à votre compte**
3. **Sélectionnez votre site Stratelink Global**
4. **Cliquez sur "Site settings"**
5. **Cliquez sur "Environment variables"**
6. **Cliquez sur "Add a variable"**

### **Variable 1 : GMAIL_USER**
- **Key :** `GMAIL_USER`
- **Value :** `globalstratelink@gmail.com`
- **✅ Cochez "Contains secret values"**
- **Scope :** "All scopes"
- **Cliquez sur "Create variable"**

### **Variable 2 : GMAIL_APP_PASSWORD**
- **Key :** `GMAIL_APP_PASSWORD`
- **Value :** `fode wwot vqfu wzvu`
- **✅ Cochez "Contains secret values"** (TRÈS IMPORTANT)
- **Scope :** "All scopes"
- **Cliquez sur "Create variable"**

## 💻 **Configuration en Local (Développement)**

### **Option 1 : Fichier .env.local (Recommandé)**

Créez un fichier `.env.local` à la racine du projet :

```bash
# .env.local
GMAIL_USER=globalstratelink@gmail.com
GMAIL_APP_PASSWORD=fode wwot vqfu wzvu
```

### **Option 2 : Variables d'environnement système**

#### **Windows (PowerShell) :**
```powershell
$env:GMAIL_USER="globalstratelink@gmail.com"
$env:GMAIL_APP_PASSWORD="fode wwot vqfu wzvu"
```

#### **Windows (CMD) :**
```cmd
set GMAIL_USER=globalstratelink@gmail.com
set GMAIL_APP_PASSWORD=fode wwot vqfu wzvu
```

#### **macOS/Linux :**
```bash
export GMAIL_USER="globalstratelink@gmail.com"
export GMAIL_APP_PASSWORD="fode wwot vqfu wzvu"
```

## 🔒 **Sécurité**

### **⚠️ IMPORTANT :**
- **Ne commitez JAMAIS** le fichier `.env.local`
- **Ne partagez JAMAIS** votre mot de passe d'application
- **Utilisez TOUJOURS** "Contains secret values" sur Netlify
- **Le fichier `.env.local` est déjà dans `.gitignore`**

### **Pourquoi ces variables ?**
- **Sécurité** : Les secrets ne sont pas exposés dans le code
- **Flexibilité** : Différentes valeurs pour dev/prod
- **Conformité** : Bonnes pratiques de sécurité
- **Déploiement** : Fonctionne sur toutes les plateformes

## 🧪 **Test de la Configuration**

### **1. Redémarrez votre serveur :**
```bash
pnpm dev
```

### **2. Testez l'envoi d'email :**
- Allez sur `/contact`
- Remplissez le formulaire
- Envoyez un message
- Vérifiez votre email Gmail

### **3. Vérifiez les logs :**
- Console du serveur pour les erreurs SMTP
- Console du navigateur pour les erreurs côté client

## 🚨 **Dépannage**

### **Erreur "Configuration SMTP invalide"**
- ✅ Vérifiez que `GMAIL_APP_PASSWORD` est correct
- ✅ Vérifiez que l'authentification à 2 facteurs est activée
- ✅ Vérifiez que le mot de passe d'application n'a pas expiré

### **Erreur "Environment variable not found"**
- ✅ Vérifiez que `.env.local` existe et est à la racine
- ✅ Vérifiez que les noms des variables sont exacts
- ✅ Redémarrez le serveur après modification

### **Erreur sur Netlify**
- ✅ Vérifiez que les variables sont bien configurées
- ✅ Vérifiez que "Contains secret values" est coché
- ✅ Redéployez le site après configuration

## 📱 **Déploiement**

### **Netlify (Recommandé) :**
1. Configurez les variables d'environnement
2. Connectez votre repository GitHub
3. Déployez automatiquement
4. Le système d'emails fonctionnera immédiatement

### **Autres plateformes :**
- **Vercel** : Variables d'environnement dans le dashboard
- **Railway** : Variables d'environnement dans les settings
- **Heroku** : Variables d'environnement via CLI ou dashboard

---

## 🎯 **Résultat Final**

Avec ces variables configurées, votre système d'emails sera :
- 🔒 **Sécurisé** (secrets non exposés)
- 🚀 **Fonctionnel** (en local et en production)
- 💰 **Gratuit** (pas de service tiers)
- 🎨 **Professionnel** (templates HTML)

**Votre site Stratelink Global sera prêt pour la production !** 🎉 