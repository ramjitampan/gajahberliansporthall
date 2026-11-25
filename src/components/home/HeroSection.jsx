import { ArrowDownRight, ArrowRight, MapPin, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "../../i18n/I18nContext";

function moveSpotlight(event) {
  if (event.pointerType === "touch") return;
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--gb-pointer-x", `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty("--gb-pointer-y", `${event.clientY - bounds.top}px`);
}

export default function HeroSection() {
  const { t } = useTranslation();
  return (
    <section className="gb-hero">
      <div className="gb-hero-stage">
        <div className="gb-hero-copy">
          <p className="gb-kicker"><MapPin size={14} />{t("hero.cityTag")}</p>
          <h1>{t("hero.headlineLead")} <span>{t("hero.headlineAccent")}</span></h1>
          <p className="gb-hero-description">{t("hero.description")}</p>
          <div className="gb-hero-actions">
            <Link to="/booking" className="gb-button gb-button-orange">{t("hero.ctaBooking")}<ArrowRight size={17} /></Link>
            <Link to="/daftar-harga" className="gb-button gb-button-glass">{t("hero.ctaPrice")}<ArrowDownRight size={15} /></Link>
          </div>
        </div>

        <div className="gb-hero-art gb-glass gb-glass-interactive" onPointerMove={moveSpotlight}>
          <div className="gb-art-visual">
            <span className="gb-art-label">{t("hero.courtSpace")}</span>
            <svg className="gb-hero-geometry" viewBox="0 0 620 300" role="img" aria-labelledby="court-art-title">
              <title id="court-art-title">{t("hero.courtSpace")}</title>
              <defs>
                <linearGradient id="court-glass" x1="0" y1="0" x2="1" y2="1"><stop stopColor="var(--gb-blue)" stopOpacity=".1"/><stop offset=".62" stopColor="var(--gb-blue)" stopOpacity=".16"/><stop offset="1" stopColor="var(--gb-orange)" stopOpacity=".08"/></linearGradient>
              </defs>
              <rect x="80" y="45" width="460" height="210" rx="3" fill="url(#court-glass)" stroke="var(--gb-glass-stroke)" strokeWidth="2"/>
              <path d="M80 61h460M80 239h460M106 45v210M514 45v210M148 45v210M472 45v210M310 45v210" fill="none" stroke="var(--gb-geometry-line)" strokeWidth="1.5"/>
              <path d="M310 45v210" stroke="var(--gb-orange)" strokeWidth="2.5" strokeDasharray="3 5"/>
              <path d="M80 150h68M472 150h68" stroke="var(--gb-geometry-line)" strokeWidth="1.5"/>
              <circle cx="310" cy="150" r="4" fill="var(--gb-orange)"/>
            </svg>
          </div>
          <div className="gb-art-caption">
            <span><Trophy size={15}/>{t("hero.cardBadge")}</span>
            <p>{t("hero.cardFindTime")} <strong>{t("hero.cardFindRhythm")}</strong></p>
            <small>{t("hero.cardFooter")}</small>
          </div>
        </div>
      </div>
    </section>
  );
}
