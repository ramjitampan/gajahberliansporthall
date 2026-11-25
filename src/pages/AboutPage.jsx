import { useEffect } from "react";
import { ArrowRight, ArrowUpRight, CalendarDays, CircleDollarSign, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import courtImage from "../assets/Lapangan.jpeg";
import { useTranslation } from "../i18n/I18nContext";
import "../styles/homepage.css";
import "../styles/aboutpage.css";

export default function AboutPage() {
  const { t } = useTranslation();
  const principles = t("aboutPage.principles") || [];
  const principleIcons = [CalendarDays, CircleDollarSign, MapPin];

  useEffect(() => {
    document.documentElement.classList.add("gb-home-active", "gb-about-active");
    return () => document.documentElement.classList.remove("gb-home-active", "gb-about-active");
  }, []);

  return (
    <main className="gb-about-page">
      <section className="gb-about-intro">
        <div className="gb-about-intro-inner">
          <Reveal className="gb-about-intro-copy">
            <p className="gb-about-kicker"><span />{t("aboutPage.eyebrow")}</p>
            <h1>
              {t("aboutPage.titleLead")}{" "}
              <span>{t("aboutPage.titleAccent")}</span>
            </h1>
            <p className="gb-about-lead">{t("aboutPage.copy")}</p>
            <Link to="/booking" className="gb-about-button">
              {t("aboutPage.viewSchedule")}<ArrowRight size={16} />
            </Link>
          </Reveal>

          <Reveal className="gb-about-photo-wrap">
            <figure className="gb-about-photo gb-about-glass">
              <img src={courtImage} alt="Lapangan badminton Gajah Berlian Sports Hall" />
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="gb-about-stats-section" aria-label={t("aboutPage.eyebrow")}>
        <div className="gb-about-stats gb-about-glass">
          <div className="gb-about-stat">
            <span className="gb-about-stat-number">1</span>
            <p>{t("aboutPage.stats.areas")}</p>
          </div>
          <div className="gb-about-stat">
            <span className="gb-about-stat-number">1</span>
            <p>{t("aboutPage.stats.venue")}</p>
          </div>
          <div className="gb-about-stat">
            <span className="gb-about-stat-number">∞</span>
            <p>{t("aboutPage.stats.booking")}</p>
          </div>
        </div>
      </section>

      <section className="gb-about-story-section">
        <div className="gb-about-story">
          <Reveal className="gb-about-story-heading">
            <p className="gb-about-kicker"><span />{t("aboutPage.storyTag")}</p>
            <h2>{t("aboutPage.storyTitle")}</h2>
          </Reveal>
          <div className="gb-about-story-copy">
            <Reveal><p>{t("aboutPage.storyP1")}</p></Reveal>
            <Reveal><p>{t("aboutPage.storyP2")}</p></Reveal>
          </div>
        </div>
      </section>

      <section className="gb-about-mission-section">
        <div className="gb-about-mission">
          <Reveal>
            <p className="gb-about-kicker"><span />{t("aboutPage.missionTag")}</p>
            <blockquote>{t("aboutPage.missionQuote")}</blockquote>
          </Reveal>
        </div>
      </section>

      <section className="gb-about-principles-section">
        <div className="gb-about-principles-layout">
          <Reveal className="gb-about-principles-heading">
            <p className="gb-about-kicker"><span />{t("aboutPage.eyebrow")}</p>
            <h2>{t("aboutPage.principlesTitle")}</h2>
          </Reveal>

          <div className="gb-about-principles gb-about-glass">
            {principles.map(({ title, copy }, index) => {
              const Icon = principleIcons[index] || CalendarDays;
              return (
                <Reveal key={title} className="gb-about-principle">
                  <span className="gb-about-principle-icon"><Icon size={19} strokeWidth={1.7} /></span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                  <ArrowUpRight className="gb-about-principle-arrow" size={17} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="gb-about-note-section">
        <div className="gb-about-note">
          <p>{t("aboutPage.footerNote")}</p>
          <Link to="/booking">{t("aboutPage.viewSchedule")}<ArrowRight size={15} /></Link>
        </div>
      </section>
    </main>
  );
}
