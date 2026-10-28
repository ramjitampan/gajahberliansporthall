import { ArrowRight, CalendarDays, CircleDollarSign, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "../i18n/I18nContext";
import VenueMap from "../components/VenueMap";

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, ...options },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useCountUp(target, duration = 1400, trigger = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);
  return value;
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  const { t } = useTranslation();
  const [statRef, statInView] = useInView();
  const count = useCountUp(3, 1200, statInView);

  const principleIcons = [CalendarDays, CircleDollarSign, MapPin];
  const principles = t("aboutPage.principles") || [];

  return (
    <main className="bg-cream text-ink dark:bg-[#0c1613] dark:text-[#f3f5f3] min-h-screen transition-colors duration-200">
      {/* HERO */}
      <section className="border-b border-line dark:border-white/10 px-5 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-[1120px]">
          <Reveal>
            <div className="mb-10 flex items-center gap-4">
              <span className="h-px w-10 bg-emerald/30 dark:bg-sage/40" />
              <p className="text-[11px] font-medium tracking-[.24em] text-emerald-soft dark:text-sage uppercase">
                {t("aboutPage.eyebrow")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-semibold leading-[.9] tracking-[-0.055em] text-ink dark:text-cream text-[clamp(3rem,9vw,6.5rem)]">
              {t("aboutPage.titleLead")}
              <br />
              <span className="font-display font-normal italic text-emerald dark:text-champagne">
                {t("aboutPage.titleAccent")}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <p className="max-w-sm text-base leading-[1.8] text-muted dark:text-cream/70">
                {t("aboutPage.copy")}
              </p>
              <Link
                to="/booking"
                className="group inline-flex items-center gap-2.5 self-start text-sm font-semibold text-emerald dark:text-sage md:self-auto"
              >
                <span className="relative pb-px after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-champagne after:transition-[width] after:duration-300 group-hover:after:w-full">
                  {t("aboutPage.viewSchedule")}
                </span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-b border-line dark:border-white/10 px-5 md:px-10">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid divide-y divide-line dark:divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <Reveal delay={0}>
              <div ref={statRef} className="py-9 sm:pr-10">
                <p className="font-display text-[2.6rem] font-normal leading-none text-emerald dark:text-champagne" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {count}
                </p>
                <p className="mt-2.5 text-sm text-muted dark:text-cream/70">{t("aboutPage.stats.areas")}</p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="py-9 sm:px-10">
                <p className="font-display text-[2.6rem] font-normal leading-none text-emerald dark:text-champagne">1</p>
                <p className="mt-2.5 text-sm text-muted dark:text-cream/70">{t("aboutPage.stats.venue")}</p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="py-9 sm:pl-10">
                <p className="font-display text-[2.6rem] font-normal leading-none text-emerald dark:text-champagne">∞</p>
                <p className="mt-2.5 text-sm text-muted dark:text-cream/70">{t("aboutPage.stats.booking")}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-16 md:grid-cols-[1fr_1.6fr] md:gap-24">
            <div>
              <Reveal>
                <div className="md:sticky md:top-28">
                  <p className="mb-4 text-[11px] font-medium tracking-[.22em] text-champagne uppercase">
                    {t("aboutPage.storyTag")}
                  </p>
                  <h2 className="text-[1.6rem] font-semibold leading-[1.2] tracking-[-0.035em] text-ink dark:text-cream">
                    {t("aboutPage.storyTitle")}
                  </h2>
                </div>
              </Reveal>
            </div>

            <div className="space-y-7 text-[15px] leading-[1.9] text-ink/75 dark:text-cream/80">
              <Reveal>
                <p>{t("aboutPage.storyP1")}</p>
              </Reveal>
              <Reveal delay={60}>
                <p>{t("aboutPage.storyP2")}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="border-y border-line dark:border-white/10 bg-emerald/[.04] dark:bg-emerald/[.08] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <Reveal>
            <p className="mb-6 text-[11px] font-medium tracking-[.22em] text-emerald-soft dark:text-sage uppercase">
              {t("aboutPage.missionTag")}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <blockquote className="font-display italic leading-[1.2] text-emerald dark:text-champagne text-[clamp(1.8rem,4.5vw,3.2rem)] max-w-[820px]">
              {t("aboutPage.missionQuote")}
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <Reveal>
            <h2 className="mb-14 text-[1.05rem] font-medium tracking-[-0.01em] text-muted dark:text-cream/70">
              {t("aboutPage.principlesTitle")}
            </h2>
          </Reveal>

          <div className="divide-y divide-line dark:divide-white/10 border-y border-line dark:border-white/10">
            {principles.map(({ title, copy }, i) => {
              const Icon = principleIcons[i] || CalendarDays;
              return (
                <Reveal key={title} delay={i * 80}>
                  <div className="group grid cursor-default gap-6 py-8 transition-colors duration-300 hover:bg-emerald/[.03] dark:hover:bg-white/[0.02] sm:grid-cols-[2.5rem_1fr_auto] sm:items-center sm:gap-10 sm:px-4 sm:-mx-4 sm:rounded-sm">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line dark:border-white/20 text-emerald/70 dark:text-sage transition-colors duration-300 group-hover:border-emerald/40 group-hover:text-emerald dark:group-hover:text-cream">
                      <Icon size={16} strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="text-[1.05rem] font-semibold tracking-[-0.025em] text-ink dark:text-cream">{title}</h3>
                      <p className="mt-1.5 max-w-lg text-sm leading-[1.75] text-muted dark:text-cream/70">{copy}</p>
                    </div>
                    <ArrowRight size={16} className="hidden text-emerald/0 transition-all duration-300 group-hover:text-emerald/60 dark:group-hover:text-sage sm:block" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* MAP SECTION IN ABOUT PAGE */}
      <section className="border-t border-line dark:border-white/10 bg-ivory dark:bg-[#0f1f19]">
        <VenueMap />
      </section>

      {/* FOOTER STRIP */}
      <Reveal>
        <div className="border-t border-line dark:border-white/10 px-5 py-10 md:px-10">
          <div className="mx-auto flex max-w-[1120px] flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-sm text-muted dark:text-cream/65">
              {t("aboutPage.footerNote")}
            </p>
            <Link to="/booking" className="group inline-flex items-center gap-2 text-sm font-semibold text-emerald dark:text-sage">
              <span className="relative pb-px after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-champagne after:transition-[width] after:duration-300 group-hover:after:w-full">
                {t("aboutPage.viewSchedule")}
              </span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
