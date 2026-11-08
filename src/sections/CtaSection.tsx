import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, ArrowLeft, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface CtaSectionProps {
  language: Language;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ language }) => {
  const isRtl = language === 'ar';

  // Arabic form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleArabicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitted(false);
  };

  // If English, render the exact original English CTA Section untouched
  if (!isRtl) {
    const t = translations.en.contact;
    return (
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="scroll-mt-20"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="relative overflow-hidden rounded-[2rem] border border-primary/25 bg-card p-8 md:p-16">
            {/* Ambient Corner Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-gradient-brand opacity-20 blur-3xl"
            />

            <div className="relative grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              {/* Left Narrative & CTA Button */}
              <div>
                <h2
                  id="contact-heading"
                  className="text-balance font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl text-foreground"
                >
                  {t.titlePrefix}{' '}
                  <span className="text-gradient-brand">{t.titleHighlight}</span>
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  {t.subtitle}
                </p>
                <a
                  href={`mailto:${t.email}`}
                  className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-gradient-brand px-7 font-semibold text-primary-foreground transition hover:opacity-90 cursor-pointer"
                >
                  <span>{t.ctaButton}</span>
                  <ArrowRight className="size-4" />
                </a>
              </div>

              {/* Right Contact Details */}
              <ul className="flex flex-col gap-4 text-sm">
                <li>
                  <a
                    href={`mailto:${t.email}`}
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="size-4 text-primary shrink-0" />
                    <span>{t.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${t.phone1.replace(/\s+/g, '')}`}
                    dir="ltr"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="size-4 text-primary shrink-0" />
                    <span>{t.phone1}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${t.phone2.replace(/\s+/g, '')}`}
                    dir="ltr"
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="size-4 text-primary shrink-0" />
                    <span>{t.phone2}</span>
                  </a>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="size-4 text-primary shrink-0" />
                  <span>{t.locations}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Dedicated, professionally structured Arabic Contact Section with interactive Form
  const tAr = translations.ar.contact;

  return (
    <section
      id="contact"
      dir="rtl"
      aria-labelledby="contact-heading-ar"
      className="scroll-mt-20 font-sans"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/30 bg-card/90 p-8 sm:p-12 md:p-16 shadow-2xl">
          {/* Ambient Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-gradient-brand opacity-20 blur-3xl"
          />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-start">
            {/* Arabic Narrative & Contact Info (Right side in RTL) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-semibold mb-4">
                  <Sparkles className="size-3.5" />
                  <span>تواصل مباشر مع مهندسينا</span>
                </div>

                <h2
                  id="contact-heading-ar"
                  className="text-balance font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-foreground"
                >
                  {tAr.titlePrefix}{' '}
                  <span className="text-gradient-brand">{tAr.titleHighlight}</span>
                </h2>

                <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
                  {tAr.subtitle}
                </p>
              </div>

              {/* Contact details list */}
              <div className="space-y-4 pt-2 border-t border-border/80">
                <a
                  href={`mailto:${tAr.email}`}
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group p-2.5 -mx-2.5 rounded-xl hover:bg-white/5"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-muted-foreground font-medium">البريد الإلكتروني المباشر</span>
                    <span dir="ltr" className="block text-sm font-semibold tracking-wide text-foreground group-hover:text-primary">
                      {tAr.email}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${tAr.phone1.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group p-2.5 -mx-2.5 rounded-xl hover:bg-white/5"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-muted-foreground font-medium">هاتف الاتصال الرئيسي</span>
                    <span dir="ltr" className="block text-sm font-semibold tracking-wide text-foreground group-hover:text-primary">
                      {tAr.phone1}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${tAr.phone2.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group p-2.5 -mx-2.5 rounded-xl hover:bg-white/5"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-muted-foreground font-medium">هاتف المشروعات والدعم</span>
                    <span dir="ltr" className="block text-sm font-semibold tracking-wide text-foreground group-hover:text-primary">
                      {tAr.phone2}
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-foreground p-2.5 -mx-2.5 rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-muted-foreground font-medium">مواقع المكاتب الإقليمية</span>
                    <span className="block text-sm font-semibold text-foreground">
                      {tAr.locations}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Arabic Interactive Contact Form (Left side in RTL) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-primary/20 bg-background/80 p-6 sm:p-8 backdrop-blur-md shadow-lg">
                {isSubmitted ? (
                  <div className="py-10 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 rounded-full bg-accent/20 text-accent flex items-center justify-center mx-auto ring-8 ring-accent/10">
                      <CheckCircle2 className="size-8" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      شكراً لتواصلك معنا!
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                      تم استلام رسالتك وبيانات مشروعك بنجاح. سيقوم فريق الحلول البرمجية في فيارا تك بدراسة المتطلبات والتواصل معك خلال 24 ساعة بمقترح مخصص.
                    </p>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-border bg-card hover:bg-muted text-sm font-semibold text-foreground transition-colors cursor-pointer"
                      >
                        <span>إرسال استفسار آخر</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleArabicSubmit} className="space-y-5 text-right">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        ابدأ مشروعك أو استفسر عن خدماتنا
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        املأ النموذج وسنتواصل معك لمناقشة التفاصيل الفنية والجدول الزمني.
                      </p>
                    </div>

                    {/* Name field: RTL */}
                    <div className="space-y-1.5">
                      <label htmlFor="ar-name" className="block text-xs font-bold text-foreground">
                        الاسم الكامل <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="ar-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="مثال: م. أحمد عبد العزيز"
                        className="w-full text-sm px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-right"
                      />
                    </div>

                    {/* Email and Phone grid */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* Email: Label RTL, Input LTR */}
                      <div className="space-y-1.5">
                        <label htmlFor="ar-email" className="block text-xs font-bold text-foreground">
                          البريد الإلكتروني <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="ar-email"
                          type="email"
                          dir="ltr"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full text-sm px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-left font-sans"
                        />
                      </div>

                      {/* Phone: Label RTL, Input LTR */}
                      <div className="space-y-1.5">
                        <label htmlFor="ar-phone" className="block text-xs font-bold text-foreground">
                          رقم الهاتف / الواتساب
                        </label>
                        <input
                          id="ar-phone"
                          type="tel"
                          dir="ltr"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+20 100 000 0000"
                          className="w-full text-sm px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-left font-sans"
                        />
                      </div>
                    </div>

                    {/* Message / Project details: RTL */}
                    <div className="space-y-1.5">
                      <label htmlFor="ar-message" className="block text-xs font-bold text-foreground">
                        تفاصيل المشروع أو رسالتك
                      </label>
                      <textarea
                        id="ar-message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="أخبرنا عن نوع البرمجيات أو التطبيق المطلوب، النطاق الزمني التقريبي، وأي تفاصيل أخرى تود مشاركتها..."
                        className="w-full text-sm px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-right resize-none"
                      />
                    </div>

                    {/* Submit button: RTL position with ArrowLeft */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto min-w-[200px] h-12 px-8 rounded-full bg-gradient-brand font-bold text-sm text-primary-foreground flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span>جارٍ الإرسال...</span>
                        ) : (
                          <>
                            <span>إرسال طلب المشروع</span>
                            <ArrowLeft className="size-4 stroke-[2.5]" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
