import { ArrowDownRight, ArrowRight, MapPin, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "../../assets/badminton-hero.png";
import { useTranslation } from "../../i18n/I18nContext";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative isolate min-h-[min(850px,100svh)] overflow-hidden bg-[#102a22] px-5 pb-12 pt-28 text-cream md:px-8 md:pt-32 dark:bg-[#0c1c17]">
      <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[59%]">
        <img
          src={heroImage}
          alt="Pemain badminton berlatih di lapangan indoor"
          className="size-full object-cover object-[68%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#102a22_0%,rgba(16,42,34,.92)_10%,rgba(16,42,34,.35)_72%,rgba(16,42,34,.28)_100%)] lg:bg-[linear-gradient(90deg,#102a22_0%,rgba(16,42,34,.96)_8%,rgba(16,42,34,.54)_38%,rgba(16,42,34,.18)_100%)] dark:bg-[linear-gradient(90deg,#0c1c17_0%,rgba(12,28,23,.96)_8%,rgba(12,28,23,.6)_45%,rgba(12,28,23,.22)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102a22]/70 via-transparent to-[#102a22]/20 dark:from-[#0c1c17]/80" />
      </div>

      <div className="mx-auto grid min-h-[min(670px,calc(100svh-150px))] w-full max-w-[1320px] items-center lg:grid-cols-[.9fr_1.1fr]">
        <motion.div initial={false} animate={{ opacity: 1 }} className="relative z-10 py-12 lg:py-20">
          <p className="mb-7 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.22em] text-sage">
            <MapPin size={14} /> {t("hero.cityTag")}
          </p>
          <h1 className="max-w-3xl text-balance text-[clamp(3.55rem,8vw,7.8rem)] font-semibold leading-[.86] tracking-[-.075em] text-ivory">
            {t("hero.headlineLead")}
            <br />
            <span className="font-display font-normal italic tracking-[-.045em] text-[#c6c99c]">
              {t("hero.headlineAccent")}
            </span>
          </h1>
          <p className="mt-8 max-w-lg text-base leading-7 text-cream/75 md:text-lg md:leading-8">
            {t("hero.description")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link
              to="/booking"
              className="inline-flex min-h-13 items-center gap-4 rounded-full bg-sage px-6 py-3 text-sm font-bold text-[#142d25] transition hover:bg-[#bdcbb7] focus-visible:outline-3 focus-visible:outline-champagne shadow-lg"
            >
              {t("hero.ctaBooking")} <ArrowRight size={17} />
            </Link>
            <Link
              to="/daftar-harga"
              className="inline-flex items-center gap-2 border-b border-champagne/70 pb-1 text-sm font-semibold text-ivory transition hover:text-[#d3d5ac]"
            >
              {t("hero.ctaPrice")} <ArrowDownRight size={15} />
            </Link>
          </div>
        </motion.div>

        <div className="relative hidden h-full min-h-[420px] lg:block" aria-hidden="true">
          <motion.div initial={false} animate={{ opacity: 1 }} className="glass-panel absolute right-0 top-[28%] w-[240px] rounded-2xl p-5">
            <span className="mb-5 flex items-center justify-between text-[9px] font-bold uppercase tracking-[.18em] text-cream/60">
              <Trophy size={16} className="text-champagne" /> {t("hero.cardBadge")}
            </span>
            <span className="block font-display text-2xl italic text-ivory">{t("hero.cardFindTime")}</span>
            <span className="mt-1 block font-display text-2xl italic text-[#c6c99c]">{t("hero.cardFindRhythm")}</span>
            <span className="mt-5 block border-t border-white/15 pt-3 text-[9px] uppercase tracking-[.14em] text-cream/55">
              {t("hero.cardFooter")}
            </span>
          </motion.div>
          <motion.div initial={false} animate={{ opacity: 1 }} className="absolute bottom-10 right-0 flex items-center gap-3 border-l border-sage/45 pl-4 text-cream/80">
            <span className="text-[10px] font-semibold uppercase tracking-[.17em]">{t("hero.courtSpace")}</span>
          </motion.div>
          <div className="absolute right-4 top-1/4 h-44 w-px bg-gradient-to-b from-transparent via-sage/50 to-transparent" />
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-sage/20" />
    </section>
  );
}
