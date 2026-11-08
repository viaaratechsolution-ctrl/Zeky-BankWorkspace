import React from 'react';
import {
  CodeXml,
  Smartphone,
  Palette,
  Cloud,
  Workflow,
  BrainCircuit,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface AboutSectionProps {
  language: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ language }) => {
  const t = translations[language].about;

  const serviceIcons = [
    CodeXml,
    Smartphone,
    Palette,
    Cloud,
    Workflow,
    BrainCircuit,
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:py-32 lg:grid-cols-[1fr_1.2fr]">
        {/* Left Column: Narrative */}
        <div>
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {t.kicker}
            </p>
            <h2
              id="about-heading"
              className="mt-4 text-balance font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
            >
              {t.titlePrefix}{' '}
              <span className="text-gradient-brand">{t.titleHighlight}</span>
            </h2>
          </div>
          <div className="mt-6 flex flex-col gap-5 text-pretty leading-relaxed text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">{t.p1Bold}</span>
              {t.p1Rest}
            </p>
            <p>{t.p2}</p>
          </div>
        </div>

        {/* Right Column: 6 Services Cards */}
        <ul className="grid gap-4 sm:grid-cols-2">
          {t.services.map((service, idx) => {
            const Icon = serviceIcons[idx] || CodeXml;
            return (
              <li
                key={service.title}
                className="group rounded-2xl border border-border bg-card/60 p-6 transition hover:border-primary/30 hover:bg-card"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-gradient-brand group-hover:text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.desc}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
