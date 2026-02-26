# 🚀 Configuration Nodemailer avec Netlify - Guide Complet

## ✅ **Configuration Modifiée**
Nous avons reconfiguré le projet pour utiliser **Nodemailer** avec les API routes Next.js.

### **Changements Effectués**
1. ✅ `next.config.mjs` - Désactivé `output: 'export'` pour permettre les API routes
2. ✅ `netlify.toml` - Configuré pour les API routes et fonctions Netlify
3. ✅ `components/contact/contact-form.tsx` - Utilise maintenant `useNodemailerSender`
4. ✅ API route `/api/contact` - Prête à fonctionner avec Nodemailer

## 🔧 **Configuration Gmail (Étape 1)**

### **Créer un mot de passe d'application Google**
1. Allez sur [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Activez la **validation en 2 étapes** si ce n'est pas déjà fait
3. Allez dans **"Mots de passe des applications"**
4. Sélectionnez **"Autre (nom personnalisé)"**
5. Nommez-le : `Stratelink Global - Nodemailer`
6. **Copiez le mot de passe généré** (16 caractères)

## 📁 **Créer le fichier .env.local (Étape 2)**

Créez un fichier `.env.local` à la racine du projet avec ce contenu :

```bash
# Configuration Nodemailer pour Gmail
GMAIL_USER=globalstratelink@gmail.com
GMAIL_APP_PASSWORD=VOTRE_MOT_DE_PASSE_D_APPLICATION_ICI

# Configuration SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

# Email de destination
TO_EMAIL=globalstratelink@gmail.com
COMPANY_NAME=Stratelink Global
```

## 🚀 **Tester Nodemailer (Étape 3)**

### **1. Installer les dépendances**
```bash
pnpm install
```

### **2. Démarrer le serveur de développement**
```bash
pnpm dev
```

### **3. Tester le formulaire**
- Allez sur `http://localhost:3000/contact`
- Remplissez le formulaire
- Envoyez le message
- Vérifiez que l'email arrive sur `globalstratelink@gmail.com`

## 📧 **Configuration Nodemailer Actuelle**

Le projet utilise déjà la configuration Nodemailer dans :
- ✅ `lib/nodemailer-config.ts` - Configuration SMTP
- ✅ `app/api/contact/route.ts` - API route pour l'envoi
- ✅ `hooks/use-nodemailer-sender.ts` - Hook pour le composant

## 🔒 **Sécurité**

### **Avantages de Nodemailer**
- ✅ **Plus sécurisé** : Les clés ne sont pas exposées côté client
- ✅ **Plus fiable** : Fonctionne même si JavaScript est désactivé
- ✅ **Meilleur contrôle** : Validation côté serveur
- ✅ **Logs complets** : Traçabilité des envois

### **Configuration sécurisée**
- ✅ Mot de passe d'application Google (pas le mot de passe principal)
- ✅ Variables d'environnement (pas de hardcoding)
- ✅ Validation côté serveur
- ✅ Gestion d'erreurs complète

## 🚨 **Dépannage**

### **Erreur "Invalid login"**
- Vérifiez que le mot de passe d'application est correct
- Assurez-vous que la validation en 2 étapes est activée

### **Erreur "Connection timeout"**
- Vérifiez votre connexion internet
- Vérifiez que le port 587 n'est pas bloqué

### **Erreur "Authentication failed"**
- Vérifiez que `GMAIL_USER` est correct
- Vérifiez que `GMAIL_APP_PASSWORD` est correct

## 📋 **Structure du Projet avec Nodemailer**

```
insaaph-capital/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # ✅ API route Nodemailer
│   └── contact/
│       └── page.tsx              # ✅ Page de contact
├── components/
│   └── contact/
│       └── contact-form.tsx      # ✅ Formulaire avec useNodemailerSender
├── hooks/
│   └── use-nodemailer-sender.ts  # ✅ Hook Nodemailer
├── lib/
│   └── nodemailer-config.ts      # ✅ Configuration SMTP
├── .env.local                     # ⚠️ À créer avec vos clés
└── env.nodemailer.example         # ✅ Exemple de configuration
```

## 🎯 **Résultat Final**

Après configuration, le formulaire de contact :
- ✅ Envoie les emails via Nodemailer (côté serveur)
- ✅ Utilise Gmail SMTP avec authentification sécurisée
- ✅ Valide les données côté serveur
- ✅ Gère les erreurs de manière robuste
- ✅ Fonctionne en mode développement et production

## 🚀 **Déploiement**

### **Développement local**
```bash
pnpm dev
```

### **Production**
```bash
pnpm build
pnpm start
```

### **Netlify (avec fonctions serverless)**
- Le projet fonctionnera sur Netlify avec les fonctions serverless
- Les API routes seront converties en fonctions Netlify
- Configuration automatique via `netlify.toml`

## ⚠️ **Points d'Attention**

### **Déploiement Netlify**
- ⚠️ **Fonctions serverless** : Les API routes deviennent des fonctions Netlify
- ⚠️ **Variables d'environnement** : Configurez-les sur Netlify
- ⚠️ **Limites** : Compte gratuit Netlify (125k invocations/mois)

### **Variables d'Environnement**
- ⚠️ **Production** : Configurez les variables sur Netlify
- ⚠️ **Sécurité** : Ne committez jamais `.env.local`
- ⚠️ **Gmail** : Utilisez uniquement des mots de passe d'application

---

**🎉 Nodemailer est maintenant configuré et prêt à fonctionner avec Netlify !** 