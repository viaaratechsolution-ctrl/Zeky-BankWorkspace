import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface FooterProps {
  language: Language;
  onLanguageChange?: (lang: Language) => void;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language].footer;

  return (
    <footer className="border-t border-white/[0.05] bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <a href="#top" aria-label="Viaara Tech — Home" className="flex items-center">
          <img
            src="/brand/viaara-logo.webp"
            alt="Viaara"
            className="h-9 w-auto drop-shadow-[0_0_16px_rgba(63,207,213,0.35)]"
            loading="lazy"
          />
        </a>
        <p className="text-sm text-muted-foreground">{t.copyright}</p>
      </div>
    </footer>
  );
};
