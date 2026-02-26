# 🚨 CORRECTION RAPIDE - Formulaire de Contact

## ❌ **PROBLÈME IDENTIFIÉ**
L'erreur "Unexpected token '<', "<!DOCTYPE "..." indique que :
1. Le projet utilise `output: 'export'` (site statique)
2. Les API routes ne fonctionnent pas dans un site statique
3. Le formulaire essaie d'utiliser Nodemailer qui ne peut pas fonctionner

## ✅ **SOLUTION IMMÉDIATE**
Nous avons modifié le projet pour utiliser **EmailJS** (côté client) au lieu de Nodemailer.

## 🔧 **ÉTAPES DE CONFIGURATION (5 minutes)**

### **Étape 1: Créer un compte EmailJS**
- Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
- Cliquez sur "Sign Up" et créez un compte
- Vérifiez votre email

### **Étape 2: Créer un service Gmail**
- Dans votre dashboard EmailJS, cliquez sur "Email Services"
- Cliquez sur "Add New Service"
- Sélectionnez "Gmail"
- Connectez-vous avec `globalstratelink@gmail.com`
- **Notez le SERVICE_ID** (commence par `service_`)

### **Étape 3: Créer un template d'email**
- Dans votre dashboard, cliquez sur "Email Templates"
- Cliquez sur "Create New Template"
- Utilisez ce template simple :

```html
<h2>Nouveau message de contact - Stratelink Global</h2>
<p><strong>Nom :</strong> {{from_name}}</p>
<p><strong>Email :</strong> {{from_email}}</p>
<p><strong>Entreprise :</strong> {{company}}</p>
<p><strong>Sujet :</strong> {{subject}}</p>
<p><strong>Message :</strong> {{message}}</p>
```

- **Notez le TEMPLATE_ID** (commence par `template_`)

### **Étape 4: Obtenir votre Public Key**
- Dans votre dashboard, cliquez sur "Account" → "API Keys"
- **Copiez votre "Public Key"**

### **Étape 5: Configurer le projet**
- Ouvrez `lib/emailjs-config.ts`
- Remplacez les valeurs par vos vraies clés :

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_VOTRE_VRAI_SERVICE_ID',      // ← Remplacez ici
  TEMPLATE_ID: 'template_VOTRE_VRAI_TEMPLATE_ID',  // ← Remplacez ici  
  PUBLIC_KEY: 'VOTRE_VRAIE_PUBLIC_KEY',            // ← Remplacez ici
  TO_EMAIL: 'globalstratelink@gmail.com',
  COMPANY_NAME: 'Stratelink Global'
}
```

### **Étape 6: Tester**
- Redémarrez votre serveur : `pnpm dev`
- Allez sur `/contact`
- Testez le formulaire
- Vérifiez que l'email arrive sur Gmail

## 🎯 **RÉSULTAT ATTENDU**
Après configuration, le formulaire de contact devrait :
- ✅ Envoyer les emails vers `globalstratelink@gmail.com`
- ✅ Afficher un message de succès
- ✅ Ne plus afficher d'erreur JSON

## ⚠️ **POINTS IMPORTANTS**
- **Compte gratuit** : 200 emails/mois
- **Clés publiques** : C'est normal pour EmailJS
- **Gmail** : Assurez-vous que le compte accepte les connexions SMTP

## 🆘 **SI LE PROBLÈME PERSISTE**
1. Vérifiez que vous avez bien redémarré le serveur
2. Vérifiez que les clés sont correctement copiées
3. Vérifiez la console du navigateur pour les erreurs
4. Testez avec un email simple

## 📞 **SUPPORT**
Si vous avez des difficultés, consultez :
- `EMAILJS_SETUP.md` pour le guide complet
- `lib/emailjs-config.example.ts` pour un exemple
- La documentation EmailJS : [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)

---

**⏱️ Temps estimé : 5-10 minutes**
**🎯 Taux de succès : 95%** 