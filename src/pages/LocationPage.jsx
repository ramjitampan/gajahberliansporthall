import { MapPin } from "lucide-react";
import VenueMap from "../components/VenueMap";
import { useTranslation } from "../i18n/I18nContext";
import Reveal from "../components/Reveal";

export default function LocationPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-ivory text-ink dark:bg-[#0c1613] dark:text-cream transition-colors duration-200">
      <header className="border-b border-line px-5 pb-12 pt-16 dark:border-white/10 md:px-10 md:pb-16 md:pt-20">
        <div className="mx-auto max-w-[1120px]">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-9 bg-emerald/40 dark:bg-sage/40" />
              <p className="text-[11px] font-semibold uppercase tracking-[.22em] text-emerald-soft dark:text-sage">
                {t("map.eyebrow")}
              </p>
            </div>
            <h1 className="font-semibold text-ink dark:text-cream tracking-[-0.04em] text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05]">
              {t("map.title")}
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted dark:text-cream/70 leading-relaxed">
              {t("map.subtitle")}
            </p>
          </Reveal>
        </div>
      </header>

      <VenueMap className="bg-transparent" />
    </div>
  );
}
