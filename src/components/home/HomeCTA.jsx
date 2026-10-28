import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import { useTranslation } from "../../i18n/I18nContext";

export default function HomeCTA() {
  const { t } = useTranslation();

  return (
    <section className="relative isolate overflow-hidden bg-[#052e25] px-5 py-16 text-cream dark:bg-[#071c16] md:px-8 md:py-24 transition-colors duration-200">
      <div aria-hidden="true" className="absolute right-[-180px] top-[-120px] -z-10 h-[520px] w-[520px] rounded-full border border-sage/10" />
      <div aria-hidden="true" className="absolute right-[-90px] top-[-40px] -z-10 h-[380px] w-[380px] rounded-full border border-sage/10" />
      <div aria-hidden="true" className="absolute left-[-120px] bottom-[-180px] -z-10 h-[360px] w-[360px] rounded-full bg-champagne/[0.03] blur-3xl" />
      <div aria-hidden="true" className="absolute right-[12%] top-[22%] -z-10 h-[240px] w-[240px] rounded-full bg-sage/[0.05] blur-3xl" />

      <Reveal className="mx-auto w-full max-w-[1240px]">
        <div
          className="
            group relative overflow-hidden rounded-[30px]
            border border-white/10
            bg-white/[0.045]
            px-6 py-8
            shadow-[0_20px_60px_rgba(0,0,0,0.18)]
            backdrop-blur-xl
            transition-all duration-500
            hover:border-white/15
            md:px-14 md:py-14
          "
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01)_35%,rgba(212,185,126,0.04)_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-80px] top-1/2 h-[220px] w-[220px] -translate-y-1/2 rounded-full bg-champagne/[0.06] blur-[90px] transition duration-500 group-hover:bg-champagne/[0.09]"
          />

          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[760px]">
              <p className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.22em] text-sage">
                <span className="flex size-6 items-center justify-center rounded-full border border-champagne/25 bg-champagne/[0.05] text-champagne">
                  <MapPin size={12} />
                </span>
                {t("cta.city")}
              </p>

              <h2 className="max-w-4xl text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-.055em] text-cream">
                {t("cta.headlineLead")}
                <br />
                <span className="font-display font-normal italic text-champagne">
                  {t("cta.headlineAccent")}
                </span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-cream/62 md:text-[15px]">
                {t("cta.copy")}
              </p>
            </div>

            <div className="flex shrink-0 md:pb-2">
              <Link
                to="/booking"
                className="
                  group/btn inline-flex min-h-[58px] items-center gap-4
                  rounded-full border border-transparent
                  bg-[#b8c7b0] px-7 py-3 text-sm font-bold text-[#102a22]
                  shadow-[0_10px_30px_rgba(0,0,0,0.10)]
                  transition-all duration-300
                  hover:-translate-y-0.5 hover:bg-[#c7d3bf]
                  hover:shadow-[0_16px_36px_rgba(0,0,0,0.16)]
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-offset-4 focus-visible:outline-champagne
                "
              >
                <span>{t("cta.button")}</span>
                <span className="flex size-8 items-center justify-center rounded-full bg-[#102a22]/8 transition-transform duration-300 group-hover/btn:translate-x-1">
                  <ArrowUpRight size={17} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
