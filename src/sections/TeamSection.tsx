import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { COMPANY_TEAM } from '../data/mockData';

interface TeamSectionProps {
  language: Language;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ language }) => {
  const t = translations[language].teamSection;
  const isRtl = language === 'ar';

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {t.kicker}
          </p>
          <h2
            id="team-heading"
            className="mt-4 text-balance font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
          >
            {t.titlePrefix}{' '}
            <span className="text-gradient-brand">{t.titleHighlight}</span>
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            {t.subtitle}
          </p>
        </div>

        {/* 6 Real Team Members Grid */}
        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COMPANY_TEAM.map((member) => (
            <li
              key={member.id}
              className="group overflow-hidden rounded-3xl border border-border bg-card/60 transition hover:border-primary/30"
            >
              {/* Photo */}
              <div className="relative aspect-[4/4.2] overflow-hidden bg-muted">
                <img
                  src={member.image}
                  alt={`Portrait of ${isRtl ? member.nameAr : member.nameEn}`}
                  className="h-full w-full object-cover object-top grayscale-[35%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  loading="lazy"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/90 to-transparent"
                />
              </div>

              {/* Info Body */}
              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                  {isRtl ? member.roleAr : member.roleEn}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                  {isRtl ? member.nameAr : member.nameEn}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {isRtl ? member.bioAr : member.bioEn}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
