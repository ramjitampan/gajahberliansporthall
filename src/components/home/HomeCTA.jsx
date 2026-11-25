import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import { useTranslation } from "../../i18n/I18nContext";

export default function HomeCTA() {
  const { t } = useTranslation();
  return (
    <section className="gb-section gb-cta">
      <Reveal className="gb-cta-content">
        <div>
          <p className="gb-kicker"><MapPin size={14} />{t("cta.city")}</p>
          <h2>{t("cta.headlineLead")} <span>{t("cta.headlineAccent")}</span></h2>
          <p className="gb-cta-copy">{t("cta.copy")}</p>
        </div>
        <Link to="/booking" className="gb-button gb-button-orange">{t("cta.button")}<ArrowUpRight size={18} /></Link>
      </Reveal>
    </section>
  );
}
