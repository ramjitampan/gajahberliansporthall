import { useEffect } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { hourlyRate, serviceFee } from "../data/bookingData";
import { rupiah, totalPrice } from "../utils/booking";
import { useTranslation } from "../i18n/I18nContext";
import "../styles/homepage.css";
import "../styles/pricelist.css";

const examples = [1, 2, 3];

export default function PricePage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.documentElement.classList.add("gb-home-active");
    return () => document.documentElement.classList.remove("gb-home-active");
  }, []);

  return (
    <div className="gb-pricelist min-h-screen overflow-hidden transition-colors duration-200">
      <section className="gb-price-hero relative border-b px-5 py-16 md:px-8 md:py-24">
        <div className="gb-price-ring pointer-events-none absolute -right-24 -top-36 size-96 rounded-full border" aria-hidden="true" />
        <div className="gb-price-ring gb-price-ring-inner pointer-events-none absolute -right-8 -top-20 size-64 rounded-full border" aria-hidden="true" />
        <div className="mx-auto grid w-full max-w-295 gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <p className="gb-price-eyebrow mb-5 text-[11px] font-bold uppercase tracking-[.22em]">
              {t("pricingPage.eyebrow")}
            </p>
            <h1 className="gb-price-title max-w-3xl">
              {t("pricingPage.titleLead")}
              <br />
              <em className="gb-price-title-accent">
                {t("pricingPage.titleAccent")}
              </em>
            </h1>
          </div>
          <div className="gb-price-summary border-l pl-6 md:pl-8">
            <p className="gb-price-copy max-w-md text-base leading-8">
              {t("pricingPage.copy")}
            </p>
            <div className="gb-price-badge mt-7 flex items-center gap-3 text-xs font-semibold">
              <span className="gb-price-badge-line h-px w-10" /> {t("pricingPage.badgeCourt")}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid w-full max-w-295 gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <Reveal className="gb-price-rate border p-7 md:p-10">
            <div className="flex items-start justify-between">
              <span className="grid size-12 place-items-center rounded-full border border-white/20 text-xl">↗</span>
              <span className="gb-price-period rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[.15em]">
                {t("pricingPage.perHour")}
              </span>
            </div>
            <p className="gb-price-rate-label mt-16 text-sm">{t("pricingPage.courtRent")}</p>
            <strong className="gb-price-amount mt-2 block">
              {rupiah(hourlyRate)}
            </strong>
            <p className="gb-price-rate-copy mt-6 max-w-xs text-sm leading-6">
              {t("pricingPage.courtRentDesc")}
            </p>
            <div className="gb-price-service mt-12 border-t pt-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="gb-price-service-label text-[10px] font-bold uppercase tracking-[.15em]">
                    {t("pricingPage.serviceFee")}
                  </span>
                  <p className="gb-price-service-copy mt-1 text-sm">{t("pricingPage.oncePerBooking")}</p>
                </div>
                <b className="gb-price-service-amount text-2xl">{rupiah(serviceFee)}</b>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="gb-price-table overflow-hidden border">
            <div className="gb-price-table-head grid grid-cols-[1fr_auto] items-end border-b px-6 py-7 md:grid-cols-[.45fr_1fr_.5fr] md:px-9">
              <span className="gb-price-table-label text-[10px] font-bold uppercase tracking-[.16em]">
                {t("pricingPage.duration")}
              </span>
              <span className="gb-price-table-label hidden text-[10px] font-bold uppercase tracking-[.16em] md:block">
                {t("pricingPage.calcExample")}
              </span>
              <span className="gb-price-table-label text-right text-[10px] font-bold uppercase tracking-[.16em]">
                {t("pricingPage.total")}
              </span>
            </div>
            {examples.map((duration) => (
              <div
                key={duration}
                className="gb-price-row group grid grid-cols-[1fr_auto] items-center border-b px-6 py-7 transition last:border-0 md:grid-cols-[.45fr_1fr_.5fr] md:px-9"
              >
                <div>
                  <b className="gb-price-duration text-xl">{duration}</b>
                  <span className="gb-price-hours ml-1 text-sm">{t("pricingPage.hours")}</span>
                </div>
                <span className="gb-price-example hidden text-sm md:block">
                  {rupiah(hourlyRate)} × {duration} + {rupiah(serviceFee)}
                </span>
                <strong className="gb-price-total text-right text-xl md:text-2xl">
                  {rupiah(totalPrice(duration))}
                </strong>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8 md:pb-28">
        <Reveal className="gb-price-formula mx-auto grid w-full max-w-295 overflow-hidden border lg:grid-cols-[1fr_auto]">
          <div className="p-7 md:p-10">
            <p className="gb-price-formula-label text-[11px] font-bold uppercase tracking-[.18em]">
              {t("pricingPage.formulaTag")}
            </p>
            <p className="gb-price-formula-title mt-4 text-2xl leading-snug md:text-4xl">
              {t("pricingPage.formulaTitle")}
            </p>
            <div className="mt-6 flex gap-3">
              <span className="gb-price-info mt-1 grid size-6 shrink-0 place-items-center rounded-full text-xs">
                i
              </span>
              <p className="gb-price-formula-copy max-w-2xl text-sm leading-6">
                {t("pricingPage.formulaNote")}
              </p>
            </div>
          </div>
          <div className="gb-price-formula-action flex items-center border-t p-7 lg:border-t-0 lg:border-l lg:p-10">
            <Link
              to="/booking"
              className="gb-price-link text-sm font-bold"
            >
              {t("pricingPage.ctaBooking")} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
