import { ArrowUpRight, BadgeCheck, CircleDollarSign, Clock3, ListChecks } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import { useTranslation } from "../../i18n/I18nContext";

const icons = [Clock3, ListChecks, CircleDollarSign, BadgeCheck];

export default function AdvantagesSection() {
  const { t } = useTranslation();
  const items = t("advantages.items") || [];

  return (
    <section className="gb-section gb-advantages">
      <div className="gb-advantages-layout">
        <Reveal className="gb-advantages-intro">
          <p className="gb-kicker">{t("advantages.eyebrow")}</p>
          <h2>{t("advantages.titleLead")} <span>{t("advantages.titleAccent")}</span></h2>
          <p>{t("advantages.copy")}</p>
        </Reveal>

        <div className="gb-advantages-list gb-glass">
          {items.map((item, index) => {
            const Icon = icons[index] || Clock3;
            return (
              <Reveal key={item.title} className="gb-advantage">
                <span className="gb-number">0{index + 1}</span>
                <span className="gb-advantage-icon"><Icon size={19} strokeWidth={1.65} /></span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </Reveal>
            );
          })}
        </div>
      </div>

      <div className="gb-advantages-link">
        <Link to="/daftar-harga" className="gb-link">{t("advantages.linkPrice")}<ArrowUpRight size={14} /></Link>
      </div>
    </section>
  );
}
