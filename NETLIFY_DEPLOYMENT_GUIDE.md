# 🚀 Guide de Déploiement Nodemailer sur Netlify

## ✅ **Configuration Terminée**

Votre projet est maintenant configuré pour fonctionner avec **Nodemailer sur Netlify** en utilisant les **fonctions serverless**.

## 🔧 **Étapes de Déploiement**

### **1. Committer et Pousser les Modifications**
```bash
git add .
git commit -m "feat: configurer Nodemailer pour Netlify avec fonctions serverless"
git push origin main
```

### **2. Configuration sur Netlify**

#### **A. Variables d'Environnement**
Dans votre dashboard Netlify, allez dans **Site settings** → **Environment variables** et ajoutez :

```bash
GMAIL_USER=globalstratelink@gmail.com
GMAIL_APP_PASSWORD=votre_mot_de_passe_d_application_google
TO_EMAIL=globalstratelink@gmail.com
COMPANY_NAME=Stratelink Global
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
```

#### **B. Vérifier la Configuration**
- **Build command** : `pnpm build`
- **Publish directory** : `.next`
- **Node version** : `18`

### **3. Déploiement Automatique**
Netlify va automatiquement :
- Détecter les changements sur GitHub
- Installer le plugin `@netlify/plugin-nextjs`
- Générer les fonctions serverless
- Déployer votre site avec Nodemailer fonctionnel

## 🎯 **Comment Ça Marche**

### **Architecture Netlify**
```
Votre Site (Frontend)
        ↓
   API Routes Next.js
        ↓
  Fonctions Serverless Netlify
        ↓
      Nodemailer + Gmail SMTP
```

### **Avantages**
- ✅ **API routes** : Fonctionnent via fonctions serverless
- ✅ **Nodemailer** : Envoi d'emails côté serveur
- ✅ **Sécurité** : Variables d'environnement sécurisées
- ✅ **Performance** : Fonctions serverless optimisées

## 🚨 **Points d'Attention**

### **Limites Netlify Gratuit**
- **Fonctions serverless** : 125k invocations/mois
- **Build minutes** : 300 minutes/mois
- **Bandwidth** : 100 GB/mois

### **Configuration Requise**
- ⚠️ **Variables d'environnement** : Doivent être configurées sur Netlify
- ⚠️ **Plugin Next.js** : Installé automatiquement
- ⚠️ **Fonctions serverless** : Générées automatiquement

## 🧪 **Test du Déploiement**

### **1. Vérifier le Build**
Dans les logs Netlify, vous devriez voir :
```
✅ Plugin @netlify/plugin-nextjs installed
✅ Functions generated in .netlify/functions
✅ API routes converted to serverless functions
```

### **2. Tester le Formulaire**
- Allez sur votre site Netlify
- Testez le formulaire de contact
- Vérifiez que l'email arrive sur Gmail

### **3. Vérifier les Logs**
Dans Netlify, allez dans **Functions** pour voir :
- Les logs d'exécution
- Les erreurs éventuelles
- Les performances

## 🔒 **Sécurité**

### **Variables d'Environnement**
- ✅ **Non exposées** côté client
- ✅ **Chiffrées** sur Netlify
- ✅ **Par site** (pas de partage)

### **Authentification Gmail**
- ✅ **Mot de passe d'application** (pas le principal)
- ✅ **Validation 2 étapes** requise
- ✅ **Révocable** à tout moment

## 📞 **Dépannage**

### **Erreur "Function not found"**
- Vérifiez que le plugin Next.js est installé
- Redéployez le site
- Vérifiez les logs de build

### **Erreur "Environment variables not found"**
- Vérifiez la configuration sur Netlify
- Redéployez après ajout des variables
- Vérifiez les noms des variables

### **Erreur "SMTP connection failed"**
- Vérifiez le mot de passe d'application Google
- Vérifiez que la validation 2 étapes est activée
- Testez la connexion locale d'abord

## 🎉 **Résultat Final**

Après déploiement, vous aurez :
- ✅ **Site fonctionnel** sur Netlify
- ✅ **Formulaire de contact** avec Nodemailer
- ✅ **Envoi d'emails** via Gmail SMTP
- ✅ **Fonctions serverless** optimisées
- ✅ **Sécurité** maximale

---

**🚀 Votre site est maintenant prêt pour le déploiement sur Netlify avec Nodemailer !** 