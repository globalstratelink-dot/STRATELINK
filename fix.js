const fs = require("fs");
const content = fs.readFileSync("components/home-slides.tsx", "utf8");
const corrected = content.replace(/document\.head\.removeChild\(script\);/g, "try { if (document.head.contains(script)) { document.head.removeChild(script); } } catch (e) { console.warn(\"Erreur nettoyage script:\", e); }");
