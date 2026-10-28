import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { hourlyRate, serviceFee } from "../data/bookingData";
import { rupiah, totalPrice } from "../utils/booking";
import { useTranslation } from "../i18n/I18nContext";

const examples = [1, 2, 3];

export default function PricePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen overflow-hidden bg-[#f3eee3] text-ink dark:bg-[#0c1613] dark:text-[#f3f5f3] transition-colors duration-200">
      <section className="relative border-b border-[#d6cebd] dark:border-white/10 px-5 py-16 md:px-8 md:py-24">
        <div className="pointer-events-none absolute -right-24 -top-36 size-96 rounded-full border border-[#173f35]/10 dark:border-white/5" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-8 -top-20 size-64 rounded-full border border-[#173f35]/10 dark:border-white/5" aria-hidden="true" />
        <div className="mx-auto grid w-full max-w-295 gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[.22em] text-emerald-soft dark:text-sage">
              {t("pricingPage.eyebrow")}
            </p>
            <h1 className="max-w-3xl font-display text-[clamp(3.2rem,7vw,6.8rem)] leading-[.92] tracking-[-.055em] text-emerald dark:text-cream">
              {t("pricingPage.titleLead")}
              <br />
              <em className="font-medium text-[#81714f] dark:text-champagne">
                {t("pricingPage.titleAccent")}
              </em>
            </h1>
          </div>
          <div className="border-l border-[#bdb39f] dark:border-white/15 pl-6 md:pl-8">
            <p className="max-w-md text-base leading-8 text-[#625f57] dark:text-cream/70">
              {t("pricingPage.copy")}
            </p>
            <div className="mt-7 flex items-center gap-3 text-xs font-semibold text-emerald dark:text-sage">
              <span className="h-px w-10 bg-emerald/40 dark:bg-sage/40" /> {t("pricingPage.badgeCourt")}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid w-full max-w-295 gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <Reveal className="rounded-3xl bg-emerald dark:bg-[#142620] border dark:border-white/10 p-7 text-[#f6f0e4] shadow-[0_24px_60px_rgba(35,48,38,.12)] md:p-10">
            <div className="flex items-start justify-between">
              <span className="grid size-12 place-items-center rounded-full border border-white/20 text-xl text-champagne">↗</span>
              <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[.15em] text-white/60">
                {t("pricingPage.perHour")}
              </span>
            </div>
            <p className="mt-16 text-sm text-white/55">{t("pricingPage.courtRent")}</p>
            <strong className="mt-2 block text-[clamp(2.7rem,5vw,4.5rem)] font-semibold leading-none tracking-[-.05em] text-white">
              {rupiah(hourlyRate)}
            </strong>
            <p className="mt-6 max-w-xs text-sm leading-6 text-white/60">
              {t("pricingPage.courtRentDesc")}
            </p>
            <div className="mt-12 border-t border-white/15 pt-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[.15em] text-white/45">
                    {t("pricingPage.serviceFee")}
                  </span>
                  <p className="mt-1 text-sm text-white/60">{t("pricingPage.oncePerBooking")}</p>
                </div>
                <b className="text-2xl text-champagne">{rupiah(serviceFee)}</b>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="overflow-hidden rounded-3xl border border-[#d2cab9] dark:border-white/10 bg-[#fffaf0] dark:bg-[#15251f] shadow-[0_24px_70px_rgba(61,55,43,.08)]">
            <div className="grid grid-cols-[1fr_auto] items-end border-b border-[#ddd5c5] dark:border-white/10 px-6 py-7 md:grid-cols-[.45fr_1fr_.5fr] md:px-9">
              <span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#777064] dark:text-cream/50">
                {t("pricingPage.duration")}
              </span>
              <span className="hidden text-[10px] font-bold uppercase tracking-[.16em] text-[#777064] dark:text-cream/50 md:block">
                {t("pricingPage.calcExample")}
              </span>
              <span className="text-right text-[10px] font-bold uppercase tracking-[.16em] text-[#777064] dark:text-cream/50">
                {t("pricingPage.total")}
              </span>
            </div>
            {examples.map((duration) => (
              <div
                key={duration}
                className="group grid grid-cols-[1fr_auto] items-center border-b border-[#e1d9ca] dark:border-white/10 px-6 py-7 transition last:border-0 hover:bg-[#f7f0e3] dark:hover:bg-white/[0.03] md:grid-cols-[.45fr_1fr_.5fr] md:px-9"
              >
                <div>
                  <b className="text-xl text-emerald dark:text-sage">{duration}</b>
                  <span className="ml-1 text-sm text-[#777064] dark:text-cream/60">{t("pricingPage.hours")}</span>
                </div>
                <span className="hidden text-sm text-[#777064] dark:text-cream/60 md:block">
                  {rupiah(hourlyRate)} × {duration} + {rupiah(serviceFee)}
                </span>
                <strong className="text-right text-xl text-emerald dark:text-champagne md:text-2xl">
                  {rupiah(totalPrice(duration))}
                </strong>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8 md:pb-28">
        <Reveal className="mx-auto grid w-full max-w-295 overflow-hidden rounded-3xl border border-[#d2cab9] dark:border-white/10 bg-[#e7decc] dark:bg-[#162721] lg:grid-cols-[1fr_auto]">
          <div className="p-7 md:p-10">
            <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#81714f] dark:text-champagne">
              {t("pricingPage.formulaTag")}
            </p>
            <p className="mt-4 font-display text-2xl leading-snug text-emerald dark:text-cream md:text-4xl">
              {t("pricingPage.formulaTitle")}
            </p>
            <div className="mt-6 flex gap-3">
              <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-emerald text-xs text-white dark:bg-sage dark:text-[#102a22]">
                i
              </span>
              <p className="max-w-2xl text-sm leading-6 text-[#625f57] dark:text-cream/70">
                {t("pricingPage.formulaNote")}
              </p>
            </div>
          </div>
          <div className="flex items-center border-t border-[#d2cab9] dark:border-white/10 p-7 lg:border-t-0 lg:border-l lg:p-10">
            <Link
              to="/booking"
              className="text-sm font-bold text-emerald dark:text-sage underline decoration-emerald/30 dark:decoration-sage/30 underline-offset-4 transition hover:decoration-emerald"
            >
              {t("pricingPage.ctaBooking")} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
