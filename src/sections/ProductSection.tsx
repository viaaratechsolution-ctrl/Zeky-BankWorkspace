import React from 'react';
import {
  TriangleAlert,
  CheckCircle2,
  ClipboardPlus,
  MessagesSquare,
  ChartColumn,
  BellRing,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface ProductSectionProps {
  language: Language;
}

export const ProductSection: React.FC<ProductSectionProps> = ({ language }) => {
  const t = translations[language].product;

  const featureIcons = [
    ClipboardPlus,
    MessagesSquare,
    ChartColumn,
    BellRing,
    Users,
    ShieldCheck,
  ];

  return (
    <section
      id="app"
      aria-labelledby="app-heading"
      className="scroll-mt-20 bg-card/30"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        {/* Section Heading */}
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {t.kicker}
          </p>
          <h2
            id="app-heading"
            className="mt-4 text-balance font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
          >
            {t.titlePrefix}{' '}
            <span className="text-gradient-brand">{t.titleHighlight}</span>
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            {t.subtitle}
          </p>
        </div>

        {/* Problem vs Solution Split */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Problem Card */}
          <div className="rounded-3xl border border-border bg-background/60 p-8">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-destructive">
              <TriangleAlert className="size-4" />
              <span>{t.problemTitle}</span>
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              {t.problems.map((problem, idx) => (
                <li
                  key={idx}
                  className="flex gap-3 leading-relaxed text-muted-foreground"
                >
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-destructive"
                    aria-hidden="true"
                  />
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Card */}
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-primary/5 p-8">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
              <CheckCircle2 className="size-4" />
              <span>{t.solutionTitle}</span>
            </p>
            <p className="mt-6 text-pretty font-display text-2xl font-medium leading-snug text-foreground">
              {t.solutionHeading}
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {t.solutionBody}
            </p>
          </div>
        </div>

        {/* 6 Feature Cards Grid */}
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.map((feature, idx) => {
            const Icon = featureIcons[idx] || ClipboardPlus;
            return (
              <li
                key={feature.title}
                className="rounded-2xl border border-border bg-background/60 p-6"
              >
                <Icon className="size-6 text-accent" />
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.desc}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
