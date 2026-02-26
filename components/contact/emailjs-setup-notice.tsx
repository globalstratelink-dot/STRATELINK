import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ExternalLink, Mail, Settings } from "lucide-react"
import { isEmailJSConfigured } from "@/lib/emailjs-config"

export function EmailJSSetupNotice() {
  if (isEmailJSConfigured()) {
    return null
  }

  return (
    <Alert className="mb-6 border-amber-500/30 bg-amber-500/10">
      <Mail className="h-4 w-4 text-amber-500" />
      <AlertTitle className="text-amber-500">
        Configuration EmailJS Requise
      </AlertTitle>
      <AlertDescription className="text-amber-400">
        <div className="space-y-3">
          <p>
            Le formulaire de contact ne peut pas fonctionner car EmailJS n'est pas configuré.
          </p>
          
          <div className="space-y-2">
            <p className="font-medium">Configuration requise :</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Créer un compte sur <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">EmailJS.com</a></li>
              <li>Créer un service Gmail</li>
              <li>Créer un template d'email</li>
              <li>Obtenir vos clés API</li>
              <li>Les configurer dans <code className="bg-amber-500/20 px-1 rounded">lib/emailjs-config.ts</code></li>
            </ol>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-amber-500/50 text-amber-400 hover:bg-amber-500/20"
              onClick={() => window.open('https://www.emailjs.com/', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Aller sur EmailJS
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              className="border-amber-500/50 text-amber-400 hover:bg-amber-500/20"
              onClick={() => window.open('/NETLIFY_QUICK_FIX.md', '_blank')}
            >
              <Settings className="w-4 h-4 mr-2" />
              Voir le Guide
            </Button>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  )
} 