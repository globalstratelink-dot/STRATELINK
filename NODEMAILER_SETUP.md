# Configuration Nodemailer avec Google App Password

Ce guide vous explique comment configurer Nodemailer pour envoyer des emails depuis votre formulaire de contact vers `globalstratelink@gmail.com` en utilisant un mot de passe d'application Google.

## 🚀 **Avantages de Nodemailer vs EmailJS**

✅ **Plus sécurisé** - Pas d'exposition des clés API côté client  
✅ **Plus fiable** - Envoi direct via SMTP  
✅ **Plus professionnel** - Solution d'entreprise  
✅ **Gratuit** - Pas de limite d'emails  
✅ **Plus rapide** - Pas de service tiers  

## 🔐 **Étape 1 : Activer l'authentification à 2 facteurs**

### **Prérequis obligatoire :**
1. Allez sur [myaccount.google.com](https://myaccount.google.com/)
2. Cliquez sur "Sécurité"
3. Activez "Validation en 2 étapes" si ce n'est pas déjà fait
4. Suivez les instructions pour configurer la 2FA

## 🔑 **Étape 2 : Créer un mot de passe d'application**

1. Dans "Sécurité" → "Validation en 2 étapes"
2. Cliquez sur "Mots de passe d'application"
3. Sélectionnez "Application" → "Autre (nom personnalisé)"
4. Nommez-le : `Stratelink Global Website`
5. Cliquez sur "Générer"
6. **IMPORTANT** : Notez le mot de passe de 16 caractères (ex: `abcd efgh ijkl mnop`)

## ⚙️ **Étape 3 : Configurer le code**

### **3.1 Copier le fichier de configuration**
```bash
cp lib/nodemailer-config.example.ts lib/nodemailer-config.ts
```

### **3.2 Modifier la configuration**
Ouvrez `lib/nodemailer-config.ts` et remplacez :
```typescript
pass: 'YOUR_APP_PASSWORD_HERE'
```
par votre vrai mot de passe d'application :
```typescript
pass: 'abcd efgh ijkl mnop'  // Votre vrai mot de passe de 16 caractères
```

## 🧪 **Étape 4 : Tester la configuration**

### **4.1 Redémarrer le serveur**
```bash
pnpm dev
```

### **4.2 Tester l'API**
Allez sur : `http://localhost:3001/api/contact`
Vous devriez voir :
```json
{
  "message": "API de contact Stratelink Global",
  "status": "active",
  "method": "POST",
  "endpoint": "/api/contact"
}
```

### **4.3 Tester le formulaire**
1. Allez sur `/contact`
2. Remplissez le formulaire
3. Envoyez un message
4. Vérifiez votre email Gmail

## 🔧 **Configuration avancée**

### **Ports SMTP alternatifs**
Si le port 587 ne fonctionne pas, essayez :
```typescript
export const SMTP_CONFIG = {
  host: 'smtp.gmail.com',
  port: 465,        // Port alternatif
  secure: true,     // true pour 465, false pour 587
  auth: {
    user: 'globalstratelink@gmail.com',
    pass: 'votre_mot_de_passe_app'
  }
}
```

### **Configuration avec TLS**
```typescript
export const SMTP_CONFIG = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'globalstratelink@gmail.com',
    pass: 'votre_mot_de_passe_app'
  },
  tls: {
    rejectUnauthorized: false
  }
}
```

## 🚨 **Dépannage**

### **Erreur "Invalid login"**
- ✅ Vérifiez que l'authentification à 2 facteurs est activée
- ✅ Vérifiez que le mot de passe d'application est correct
- ✅ Vérifiez qu'il n'y a pas d'espaces dans le mot de passe

### **Erreur "Connection timeout"**
- ✅ Vérifiez votre connexion internet
- ✅ Vérifiez que le port 587 n'est pas bloqué par votre pare-feu
- ✅ Essayez le port 465 avec `secure: true`

### **Erreur "Authentication failed"**
- ✅ Vérifiez que le compte Gmail est actif
- ✅ Vérifiez que le mot de passe d'application n'a pas expiré
- ✅ Créez un nouveau mot de passe d'application si nécessaire

### **Erreur "Rate limit exceeded"**
- ✅ Gmail limite à 500 emails/jour pour les comptes gratuits
- ✅ Attendez 24h ou passez à un compte Gmail Workspace

## 📱 **Sécurité et bonnes pratiques**

### **Protection des données**
- ✅ Le mot de passe d'application est stocké côté serveur uniquement
- ✅ Validation des données côté serveur
- ✅ Protection contre l'injection de code
- ✅ Limitation du taux d'envoi

### **Monitoring**
- ✅ Logs des erreurs dans la console
- ✅ ID de message unique pour chaque email
- ✅ Gestion des erreurs spécifiques
- ✅ Feedback utilisateur en temps réel

## 🌐 **Déploiement en production**

### **Variables d'environnement**
Créez un fichier `.env.local` :
```env
GMAIL_USER=globalstratelink@gmail.com
GMAIL_APP_PASSWORD=votre_mot_de_passe_app
```

Modifiez `nodemailer-config.ts` :
```typescript
export const SMTP_CONFIG = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER || 'globalstratelink@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD || 'YOUR_APP_PASSWORD_HERE'
  }
}
```

### **Netlify (recommandé)**
1. Ajoutez les variables d'environnement dans Netlify
2. Le fichier `netlify.toml` est déjà configuré
3. Déployez avec `pnpm deploy`

## 📊 **Limites et quotas**

### **Gmail Gratuit**
- ✅ **500 emails/jour** (limite quotidienne)
- ✅ **100 emails/heure** (limite horaire)
- ✅ **25 MB** par email
- ✅ **Pas de limite mensuelle**

### **Gmail Workspace (payant)**
- ✅ **1500 emails/jour** (limite quotidienne)
- ✅ **300 emails/heure** (limite horaire)
- ✅ **25 MB** par email
- ✅ **Support prioritaire**

## 🎯 **Fonctionnalités implémentées**

✅ **Envoi d'emails en temps réel**  
✅ **Templates HTML et texte**  
✅ **Validation côté serveur**  
✅ **Gestion des erreurs avancée**  
✅ **API REST sécurisée**  
✅ **Logs et monitoring**  
✅ **Responsive design**  
✅ **Feedback utilisateur**  

## 📞 **Support**

### **En cas de problème :**
1. Vérifiez la console du navigateur
2. Vérifiez la console du serveur
3. Testez l'API directement : `GET /api/contact`
4. Vérifiez la configuration SMTP
5. Vérifiez votre mot de passe d'application

### **Ressources utiles :**
- [Documentation Nodemailer](https://nodemailer.com/)
- [Configuration Gmail SMTP](https://support.google.com/mail/answer/7126229)
- [Mots de passe d'application Google](https://support.google.com/accounts/answer/185833)

---

## 🎉 **Résultat final**

Votre formulaire de contact envoie maintenant des emails **directement via Gmail SMTP** avec :
- **Sécurité maximale** (mot de passe d'application)
- **Performance optimale** (pas de service tiers)
- **Fiabilité garantie** (SMTP natif)
- **Coût zéro** (pas de limite d'emails)

**Félicitations !** Votre système d'envoi d'emails est maintenant professionnel et sécurisé. 🚀 