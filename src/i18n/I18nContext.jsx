import React, { createContext, useContext, useEffect, useState } from "react";
import { translations } from "./translations";

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("gb_lang");
      if (saved === "id" || saved === "en") return saved;
      if (navigator.language && navigator.language.startsWith("en")) {
        return "en";
      }
    }
    return "id";
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("gb_lang", lang);
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === "id" ? "en" : "id"));
  };

  const t = (path, fallback = "") => {
    const keys = path.split(".");
    let current = translations[lang] || translations.id;
    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        // Fallback to Indonesian if key missing in current language
        let fallbackVal = translations.id;
        for (const fbKey of keys) {
          if (fallbackVal && typeof fallbackVal === "object" && fbKey in fallbackVal) {
            fallbackVal = fallbackVal[fbKey];
          } else {
            return fallback || path;
          }
        }
        return fallbackVal;
      }
    }
    return current;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}
