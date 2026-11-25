import { useEffect } from "react";
import VenueMap from "../components/VenueMap";
import { useTranslation } from "../i18n/I18nContext";
import Reveal from "../components/Reveal";
import "../styles/homepage.css";
import "../styles/locationpage.css";

export default function LocationPage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.documentElement.classList.add("gb-home-active", "gb-location-active");
    return () => document.documentElement.classList.remove("gb-home-active", "gb-location-active");
  }, []);

  return (
    <main className="gb-location-page">
      <header className="gbl-intro">
        <div className="gbl-container">
          <Reveal className="gbl-intro-content">
            <p className="gbl-kicker"><span />{t("map.eyebrow")}</p>
            <h1>{t("map.title")}</h1>
            <p className="gbl-subtitle">{t("map.subtitle")}</p>
          </Reveal>
        </div>
      </header>

      <VenueMap />
    </main>
  );
}
