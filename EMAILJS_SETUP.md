# Configuration EmailJS pour le Formulaire de Contact

Ce guide vous explique comment configurer EmailJS pour que le formulaire de contact envoie réellement les emails vers `globalstratelink@gmail.com`.

## 🚀 Étape 1 : Créer un compte EmailJS

1. Allez sur [EmailJS.com](https://www.emailjs.com/)
2. Cliquez sur "Sign Up" et créez un compte gratuit
3. Connectez-vous à votre compte

## 📧 Étape 2 : Configurer un Service Email

1. Dans votre dashboard EmailJS, allez dans "Email Services"
2. Cliquez sur "Add New Service"
3. Choisissez "Gmail" comme service
4. Connectez votre compte Gmail `globalstratelink@gmail.com`
5. Notez le **Service ID** (ex: `service_abc123`)

## 📝 Étape 3 : Créer un Template d'Email

1. Allez dans "Email Templates"
2. Cliquez sur "Create New Template"
3. Configurez le template comme suit :

### Template HTML :
```html
<!DOCTYPE html>
<html>
<head>
    <title>Nouveau message de contact</title>
</head>
<body>
    <h2>Nouveau message de contact - Stratelink Global</h2>
    
    <h3>Informations du contact :</h3>
    <p><strong>Nom :</strong> {{from_name}}</p>
    <p><strong>Email :</strong> {{from_email}}</p>
    <p><strong>Entreprise :</strong> {{company}}</p>
    <p><strong>Sujet :</strong> {{subject}}</p>
    
    <h3>Message :</h3>
    <p>{{message}}</p>
    
    <hr>
    <p><em>Ce message a été envoyé depuis le formulaire de contact du site Stratelink Global.</em></p>
</body>
</html>
```

### Variables du template :
- `{{from_name}}` - Nom complet du contact
- `{{from_email}}` - Email du contact
- `{{company}}` - Entreprise du contact
- `{{subject}}` - Sujet du message
- `{{message}}` - Contenu du message

4. Sauvegardez le template et notez le **Template ID** (ex: `template_xyz789`)

## 🔑 Étape 4 : Obtenir votre Clé Publique

1. Dans votre dashboard EmailJS, allez dans "Account" → "API Keys"
2. Copiez votre **Public Key** (ex: `user_123456789`)

## ⚙️ Étape 5 : Configurer le Code

1. Ouvrez le fichier `lib/emailjs-config.ts`
2. Remplacez les valeurs par vos vraies clés :

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_abc123',        // Votre Service ID
  TEMPLATE_ID: 'template_xyz789',      // Votre Template ID
  PUBLIC_KEY: 'user_123456789',        // Votre Public Key
  
  TO_EMAIL: 'globalstratelink@gmail.com',
  COMPANY_NAME: 'Stratelink Global'
}
```

## 🧪 Étape 6 : Tester le Formulaire

1. Redémarrez votre serveur de développement : `pnpm dev`
2. Allez sur la page de contact
3. Remplissez le formulaire et envoyez un message
4. Vérifiez que vous recevez l'email sur `globalstratelink@gmail.com`

## 🔒 Sécurité et Limitations

### Compte Gratuit EmailJS :
- **200 emails/mois** inclus
- **Limite de 2 services** email
- **Limite de 2 templates**

### Compte Payant (si nécessaire) :
- **1000 emails/mois** : $15/mois
- **10,000 emails/mois** : $35/mois
- **Illimité** : $75/mois

## 🚨 Dépannage

### Erreur "Configuration EmailJS manquante"
- Vérifiez que vous avez bien configuré les clés dans `lib/emailjs-config.ts`

### Erreur "Service not found"
- Vérifiez que votre Service ID est correct
- Assurez-vous que le service Gmail est bien connecté

### Erreur "Template not found"
- Vérifiez que votre Template ID est correct
- Assurez-vous que le template est bien sauvegardé

### Erreur "Network Error"
- Vérifiez votre connexion internet
- Vérifiez que EmailJS n'est pas bloqué par votre pare-feu

## 📱 Configuration Mobile

Le formulaire est entièrement responsive et fonctionne sur tous les appareils. Les emails sont envoyés de la même manière depuis mobile et desktop.

## 🎯 Fonctionnalités

✅ **Validation en temps réel** des champs  
✅ **Gestion des erreurs** avec messages clairs  
✅ **Feedback visuel** pendant l'envoi  
✅ **Message de succès** après envoi  
✅ **Reset automatique** du formulaire  
✅ **Validation côté client** complète  
✅ **Gestion des états** d'envoi  

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez la console du navigateur pour les erreurs
2. Consultez la documentation EmailJS
3. Vérifiez que toutes les clés sont correctement configurées

---

**Note :** N'oubliez pas de ne jamais commiter vos vraies clés EmailJS dans Git. Le fichier `emailjs-config.ts` est déjà dans `.gitignore` pour éviter cela. 