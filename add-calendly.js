const fs = require("fs"); const content = fs.readFileSync("components/home-slides.tsx", "utf8"); const corrected = content.replace(/return \(/, `// Charger le script Calendly
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ajouter le CSS Calendly
      const link = document.createElement("link");
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);

      // Ajouter le script Calendly
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);

      return () => {
        // Nettoyer si nécessaire
        try {
          if (document.head.contains(link)) {
            document.head.removeChild(link);
          }
          if (document.head.contains(script)) {
            document.head.removeChild(script);
          }
        } catch (error) {
          console.warn("Erreur lors du nettoyage des scripts Calendly:", error);
        }
      };
    }
  }, []);

  return (`); fs.writeFileSync("components/home-slides.tsx", corrected); console.log("Script Calendly ajouté");
