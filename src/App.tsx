import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ProductSection } from './sections/ProductSection';
import { HowItWorksSection } from './sections/HowItWorksSection';
import { InteractiveDemo } from './demo/InteractiveDemo';
import { TeamSection } from './sections/TeamSection';
import { CtaSection } from './sections/CtaSection';
import { Footer } from './components/Footer';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');

  // Keep HTML root attributes in sync with language & direction
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground"
    >
      {/* 1. Header Navigation */}
      <Navbar language={language} onLanguageChange={setLanguage} />

      <main className="flex-1">
        {/* 2. Hero Section (#top) with 3-stat strip */}
        <HeroSection language={language} />

        {/* 3. About Viaara Tech (#about) with 6 service cards */}
        <AboutSection language={language} />

        {/* 4. The Product (#app) with Problem/Solution and 6 feature cards */}
        <ProductSection language={language} />

        {/* 5. How It Works (#workflow) with 4-step sequence */}
        <HowItWorksSection language={language} />

        {/* 6. Interactive Live Demo (#demo) with 3-column test drive */}
        <InteractiveDemo language={language} onLanguageChange={setLanguage} />

        {/* 7. Meet The Team (#team) with 6 real Viaara Tech engineers */}
        <TeamSection language={language} />

        {/* 8. Institutional CTA (#contact) */}
        <CtaSection language={language} />
      </main>

      {/* 9. Complete Footer */}
      <Footer language={language} onLanguageChange={setLanguage} />
    </div>
  );
}
