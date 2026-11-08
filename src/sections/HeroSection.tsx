import React from 'react';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface HeroSectionProps {
  language: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const t = translations[language].hero;
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      {/* Background Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
      />

      {/* Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[var(--primary)]/20 blur-[140px]"
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-24 text-center md:pt-32">
        {/* Badge */}
        <p className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/25 bg-[var(--card)]/60 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--primary)]">
          <Sparkles className="size-3.5" />
          <span>{t.badge}</span>
        </p>

        {/* Headline */}
        <h1 className="mt-8 text-balance text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
          {t.titlePrefix}{' '}
          <span className="text-gradient-brand">{t.titleHighlight}</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--muted-foreground)]">
          {t.description}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="#demo"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-brand px-7 font-semibold text-[var(--primary-foreground)] transition hover:opacity-90 cursor-pointer"
          >
            <span>{t.tryDemo}</span>
            <ArrowIcon className="size-4" />
          </a>
          <a
            href="#about"
            className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)]/60 px-7 font-medium text-[var(--foreground)] transition hover:border-[var(--primary)]/40 cursor-pointer"
          >
            {t.aboutViaara}
          </a>
        </div>

        {/* Stats Strip */}
        <dl className="mt-20 grid w-full max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-3">
          {t.stats.map((stat, idx) => (
            <div key={idx} className="bg-[var(--background)]/80 px-6 py-6 text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-3xl font-semibold text-gradient-brand tabular-nums">
                {stat.value}
              </dd>
              <dd className="mt-1 text-xs uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
