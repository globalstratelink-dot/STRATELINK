const fs = require("fs"); const content = fs.readFileSync("components/home-slides.tsx", "utf8"); const corrected = content.replace(/          <\/motion\.div>\n        <\/motion\.div>\n      <\/motion\.div>\n    <\/div>\n  \)/, `          </motion.div>
          
          {/* Bouton Calendly */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4"
          >
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-copper text-copper font-bold text-lg px-8 py-4 hover:bg-copper hover:text-navy transition-all duration-300"
              onClick={() => {
                if (typeof window !== "undefined" && (window as any).Calendly) {
                  (window as any).Calendly.initPopupWidget({
                    url: "https://calendly.com/stratelink"
                  });
                }
              }}
            >
              {t("scheduleTime")}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )`); fs.writeFileSync("components/home-slides.tsx", corrected); console.log("Bouton Calendly ajouté");
