import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Ban, CircleDot, Coffee, LampDesk, Moon, ParkingCircle, Shirt, Sun, Toilet, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import { facilities } from "../data/facilities";
import heroImage from "../assets/badminton-hero.png";
import courtImage from "../assets/LapanganContoh.png";
import waitingImage from "../assets/RuangTnggu.png";
import lightingImage from "../assets/PencahayaanContoh.png";
import parkingImage from "../assets/ParkirContoh.png";
import { useTranslation } from "../i18n/I18nContext";

const gallery = [
  {
    image: courtImage,
    icon: CircleDot,
    number: "01",
    position: "center",
    layout: "lg:col-span-7 lg:row-span-3",
    featured: true,
  },
  {
    image: waitingImage,
    icon: LampDesk,
    number: "02",
    position: "center",
    layout: "lg:col-span-5 lg:row-span-2",
    featured: false,
  },
  {
    image: lightingImage,
    icon: Sun,
    number: "03",
    position: "center",
    layout: "lg:col-span-5 lg:row-span-3",
    featured: false,
  },
  {
    image: parkingImage,
    icon: ParkingCircle,
    number: "04",
    position: "center",
    layout: "lg:col-span-7 lg:row-span-2",
    featured: false,
  },
];

const extraFacilities = [
  { name: "Mushala", Icon: Moon },
  { name: "Free Wi-Fi", Icon: Wifi },
  { name: "Toilet", Icon: Toilet },
  { name: "Kantin", Icon: Coffee },
  { name: "Ruang Ganti Pakaian", Icon: Shirt },
];

function GalleryItem({ item, index }) {
  const visual = gallery[index];
  const Icon = visual.icon;
  const reducedMotion = useReducedMotion();

  return (
    <motion.figure
      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.55,
        delay: reducedMotion ? 0 : index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        group relative isolate min-h-[280px] overflow-hidden rounded-[6px] bg-[#17372d] lg:min-h-0 ${visual.layout}
      `}
    >
      <img
        src={visual.image}
        alt={item.title}
        loading={index === 0 ? "eager" : "lazy"}
        style={{ objectPosition: visual.position }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.025] motion-reduce:transform-none"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071b14]/95 via-[#071b14]/25 to-transparent" />

      <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-5 md:p-6">
        <span className="flex size-9 items-center justify-center rounded-full border border-white/25 bg-[#102a22]/25 text-[#d6c18c] backdrop-blur-sm">
          <Icon size={17} strokeWidth={1.5} />
        </span>
        <span className="font-display text-2xl italic text-white/70">{visual.number}</span>
      </div>

      <figcaption className={`absolute inset-x-0 bottom-0 z-10 ${visual.featured ? "p-7 lg:p-10" : "p-6"}`}>
        <div className="mb-4 h-px w-9 bg-[#d6c18c] transition-all duration-500 group-hover:w-16" />
        <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#d6c18c]">
          {item.category || "Fasilitas venue"}
        </p>
        <h3 className={`font-semibold tracking-[-0.035em] text-[#f3f1e9] ${visual.featured ? "text-3xl lg:text-[38px]" : "text-xl md:text-2xl"}`}>
          {item.title}
        </h3>
        <p className={`mt-3 max-w-[390px] leading-relaxed text-white/75 ${visual.featured ? "text-sm" : "text-xs md:text-sm"}`}>
          {item.description}
        </p>
      </figcaption>

      <div className="pointer-events-none absolute inset-0 rounded-[6px] border border-white/10 transition-colors duration-500 group-hover:border-[#d6c18c]/35" />
    </motion.figure>
  );
}

export default function FacilitiesPage() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const visibleFacilities = facilities.slice(0, 4);
  const venueRules = t("facilitiesPage.rules") || [];

  return (
    <main className="min-h-screen bg-[#e6e7de] dark:bg-[#0c1613] text-ink dark:text-cream transition-colors duration-200">
      <header className="relative isolate overflow-hidden bg-[#102a22] dark:bg-[#0c1c17] px-5 py-20 text-[#f3f1e9] md:px-8 md:py-28">
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center] opacity-20"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#102a22] via-[#102a22]/95 to-[#102a22]/60 dark:from-[#0c1c17] dark:via-[#0c1c17]/95" />

        <div className="mx-auto max-w-[1240px]">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-7 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d6c18c]">
              <span className="h-px w-9 bg-[#d6c18c]" />
              {t("facilitiesPage.eyebrow")}
            </div>
            <h1 className="max-w-[850px] text-[clamp(2.8rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.055em]">
              {t("facilitiesPage.titleLead")}
              <br />
              <span className="font-display font-normal italic text-[#d6c18c]">
                {t("facilitiesPage.titleAccent")}
              </span>
            </h1>
            <p className="mt-7 max-w-[480px] text-sm leading-7 text-[#f3f1e9]/65">
              {t("facilitiesPage.copy")}
            </p>
          </motion.div>
        </div>
      </header>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-[#17372d]/20 dark:border-white/10 pb-5">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#687568] dark:text-sage">
                {t("facilitiesPage.spacesTag")}
              </p>
              <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[#17372d] dark:text-cream md:text-3xl">
                {t("facilitiesPage.spacesTitle")}
              </h2>
            </div>
            <span className="text-xs text-[#687568] dark:text-cream/50">01 / 04</span>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:h-[780px] lg:grid-cols-12 lg:grid-rows-5">
            {visibleFacilities.map((item, index) => (
              <GalleryItem key={item.id ?? index} item={item} index={index} />
            ))}
          </div>

          {/* VENUE RULES */}
          <section aria-labelledby="venue-rules-title" className="mt-16 overflow-hidden rounded-[8px] bg-[#17372d] dark:bg-[#132820] text-[#f3f1e9] shadow-[0_18px_48px_rgba(23,55,45,.12)] md:mt-20">
            <div className="grid lg:grid-cols-[.72fr_1.28fr]">
              <div className="border-b border-white/10 p-6 md:p-9 lg:border-b-0 lg:border-r">
                <p className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.22em] text-[#d6c18c]">
                  <Ban size={14} /> {t("facilitiesPage.rulesTag")}
                </p>
                <h2 id="venue-rules-title" className="max-w-sm font-display text-4xl italic leading-[1.02] text-[#f3f1e9] md:text-5xl">
                  {t("facilitiesPage.rulesTitle")}
                </h2>
                <p className="mt-5 max-w-sm text-sm leading-6 text-white/65">
                  {t("facilitiesPage.rulesCopy")}
                </p>
              </div>
              <ol className="grid gap-x-8 px-6 py-2 sm:grid-cols-2 md:px-9 md:py-4">
                {venueRules.map((rule, index) => (
                  <li key={rule} className="flex gap-4 border-b border-white/10 py-5 last:border-0 sm:[&:nth-last-child(2)]:border-0">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-[#d6c18c]/50 font-display text-sm italic text-[#d6c18c]">
                      0{index + 1}
                    </span>
                    <p className="text-sm leading-6 text-white/80">{rule}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* EXTRA AMENITIES */}
          <section aria-labelledby="extra-facilities-title" className="mt-16 md:mt-20">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-[#17372d]/20 dark:border-white/10 pb-4">
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[.22em] text-[#687568] dark:text-sage">
                  {t("facilitiesPage.extraTag")}
                </p>
                <h2 id="extra-facilities-title" className="text-2xl font-semibold tracking-[-.035em] text-[#17372d] dark:text-cream md:text-3xl">
                  {t("facilitiesPage.extraTitle")}
                </h2>
              </div>
              <p className="text-xs text-[#687568] dark:text-cream/50">{t("facilitiesPage.extraNote")}</p>
            </div>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {extraFacilities.map(({ name, Icon }) => (
                <li
                  key={name}
                  className="flex min-h-[132px] flex-col items-center justify-center gap-3 rounded-[6px] border border-[#17372d]/10 dark:border-white/10 bg-[#f4f3ed] dark:bg-[#142620] px-3 py-5 text-center shadow-[0_6px_18px_rgba(23,55,45,.05)] transition-colors duration-200 hover:bg-white dark:hover:bg-[#1a332a]"
                >
                  <span className="grid size-12 place-items-center rounded-full bg-[#e6e9df] dark:bg-[#1a332a] text-[#315c49] dark:text-sage">
                    <Icon size={21} strokeWidth={1.7} />
                  </span>
                  <span className="text-sm font-semibold text-[#26382f] dark:text-cream">{name}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* BOTTOM CTA */}
          <div className="mt-10 flex flex-col justify-between gap-6 border-t border-[#17372d]/20 dark:border-white/10 pt-7 sm:flex-row sm:items-center">
            <div>
              <p className="mb-2 text-sm font-semibold text-[#17372d] dark:text-cream">
                {t("facilitiesPage.readyTitle")}
              </p>
              <p className="max-w-[450px] text-xs leading-6 text-[#687568] dark:text-cream/65">
                {t("facilitiesPage.readyCopy")}
              </p>
            </div>
            <Link
              to="/booking"
              className="group inline-flex items-center justify-between gap-8 border-b border-[#17372d] dark:border-sage pb-2 text-sm font-semibold text-[#17372d] dark:text-sage transition-colors duration-300 hover:text-[#54735b] dark:hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {t("facilitiesPage.viewSchedule")}
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
