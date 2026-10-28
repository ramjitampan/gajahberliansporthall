import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import heroImage from "../../assets/badminton-hero.png";
import { useTranslation } from "../../i18n/I18nContext";

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-[#d9dfd2] px-5 py-20 text-[#1e2925] dark:bg-[#13241d] dark:text-cream md:px-8 md:py-28 transition-colors duration-200">
      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[.2em] text-emerald-soft dark:text-sage">
            {t("aboutSection.eyebrow")}
          </p>
          <h2 className="max-w-xl text-4xl font-semibold leading-[.98] tracking-[-.055em] md:text-6xl text-ink dark:text-cream">
            {t("aboutSection.titleLead")}{" "}
            <span className="font-display font-normal italic text-emerald dark:text-champagne">
              {t("aboutSection.titleAccent")}
            </span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-[#43544b] dark:text-cream/70">
            {t("aboutSection.copy")}
          </p>
          <Link
            to="/tentang"
            className="mt-7 inline-flex items-center gap-2 border-b border-emerald/35 pb-1 text-sm font-semibold text-emerald transition hover:border-emerald dark:border-sage/40 dark:text-sage dark:hover:border-sage"
          >
            {t("aboutSection.cta")} <ArrowUpRight size={15} />
          </Link>
        </Reveal>
        <figure className="group relative m-0 min-h-[330px] overflow-hidden rounded-[8px_72px_8px_8px] bg-[#17382d] md:min-h-[460px]">
          <img
            src={heroImage}
            alt="Pemain berlatih di lapangan badminton"
            className="absolute inset-0 size-full object-cover object-[69%_center] transition-transform duration-300 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102a22]/85 via-[#102a22]/5 to-[#102a22]/15" />
          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-ivory md:p-7">
            <div className="glass-panel rounded-xl px-4 py-3 md:px-5 md:py-4">
              <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.18em] text-sage">
                <MapPin size={12} /> Kota Padang
              </span>
              <p className="mt-2 font-display text-2xl italic md:text-3xl">
                {t("aboutSection.tagline")}
              </p>
            </div>
            <span className="hidden border-l border-white/30 pl-4 font-display text-3xl italic text-champagne sm:block">
              01
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
