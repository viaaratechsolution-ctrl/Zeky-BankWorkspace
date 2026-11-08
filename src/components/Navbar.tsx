import React, { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ language, onLanguageChange }) => {
  const t = translations[language].nav;
  const isRtl = language === 'ar';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    onLanguageChange(language === 'en' ? 'ar' : 'en');
  };

  const navLinks = [
    { href: '#about', label: t.about },
    { href: '#app', label: t.app },
    { href: '#workflow', label: t.workflow },
    { href: '#demo', label: t.demo },
    { href: '#team', label: t.team },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#top" aria-label="Viaara Tech — Home" className="flex items-center">
          <img
            src="/brand/viaara-logo.webp"
            alt="Viaara"
            className="h-11 w-auto drop-shadow-[0_0_24px_rgba(63,207,213,0.45)]"
          />
        </a>

        {/* Center Pill Nav */}
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-border bg-card/60 px-2 py-1.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions: Language Switcher & Contact Button */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground border border-border bg-card/60 transition-colors cursor-pointer"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span>{t.switchLang}</span>
          </button>

          {/* Contact Button */}
          <a
            href="#contact"
            className="hidden rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 md:inline-flex cursor-pointer"
          >
            {t.contact}
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Open menu"
            className="grid size-10 place-items-center rounded-full border border-border md:hidden text-foreground cursor-pointer"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border px-6 pb-6 md:hidden bg-background"
        >
          <ul className="flex flex-col pt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 text-lg text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-lg font-semibold text-primary"
              >
                {t.contact}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
