import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import heroImage from "../../assets/Lapangan.jpeg";
import { useTranslation } from "../../i18n/I18nContext";

function moveSpotlight(event) {
  if (event.pointerType === "touch") return;
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--gb-pointer-x", `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty("--gb-pointer-y", `${event.clientY - bounds.top}px`);
}

export default function AboutSection() {
  const { t } = useTranslation();
  return (
    <section className="gb-section gb-about">
      <div className="gb-about-layout">
        <Reveal className="gb-about-visual">
          <div className="gb-about-image-frame">
            <img src={heroImage} alt="Pemain berlatih di lapangan badminton" loading="lazy" />
          </div>
          <div className="gb-about-caption gb-glass-subtle gb-glass-interactive" onPointerMove={moveSpotlight}>
            <span><MapPin size={13} />Kota Padang</span>
            <p>{t("aboutSection.tagline")}</p>
          </div>
        </Reveal>
        <Reveal className="gb-about-copy">
          <p className="gb-kicker">{t("aboutSection.eyebrow")}</p>
          <h2>{t("aboutSection.titleLead")} <span className="gb-accent">{t("aboutSection.titleAccent")}</span></h2>
          <p>{t("aboutSection.copy")}</p>
          <Link to="/tentang" className="gb-link">{t("aboutSection.cta")}<ArrowUpRight size={15} /></Link>
        </Reveal>
      </div>
    </section>
  );
}
