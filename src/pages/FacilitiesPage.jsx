import { useEffect } from "react";
import { ArrowUpRight, Ban, CircleDot, Coffee, LampDesk, Moon, ParkingCircle, Shirt, Sun, Toilet } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { facilities } from "../data/facilities";
import courtImage from "../assets/Lapangan.jpeg";
import waitingImage from "../assets/Ruang Tunggu.png";
import lightingImage from "../assets/Pencahayaan.png";
import parkingImage from "../assets/Lapangan Parkir.png";
import { useTranslation } from "../i18n/I18nContext";
import "../styles/homepage.css";
import "../styles/facilitiespage.css";

const galleryVisuals = [
  { image: courtImage, Icon: CircleDot, position: "center 55%" },
  { image: waitingImage, Icon: LampDesk, position: "center 56%" },
  { image: lightingImage, Icon: Sun, position: "center 52%" },
  { image: parkingImage, Icon: ParkingCircle, position: "center 54%" },
];

const supportingFacilities = [
  { name: "Mushala", Icon: Moon },
  { name: "Toilet", Icon: Toilet },
  { name: "Kantin", Icon: Coffee },
  { name: "Ruang Ganti Pakaian", Icon: Shirt },
];

export default function FacilitiesPage() {
  const { t } = useTranslation();
  const galleryItems = facilities.slice(0, 4).map((facility, index) => ({
    ...facility,
    ...galleryVisuals[index],
  }));
  const featuredFacility = galleryItems[0];
  const supportingGallery = galleryItems.slice(1);
  const venueRules = t("facilitiesPage.rules") || [];

  useEffect(() => {
    document.documentElement.classList.add("gb-home-active", "gb-facilities-active");
    return () => document.documentElement.classList.remove("gb-home-active", "gb-facilities-active");
  }, []);

  return (
    <main className="gb-facilities-page">
      <header className="gbf-intro">
        <div className="gbf-container">
          <Reveal className="gbf-intro-content">
            <p className="gbf-kicker"><span />{t("facilitiesPage.eyebrow")}</p>
            <div className="gbf-intro-grid">
              <h1>{t("facilitiesPage.titleLead")} <span>{t("facilitiesPage.titleAccent")}</span></h1>
              <p>{t("facilitiesPage.copy")}</p>
            </div>
          </Reveal>
        </div>
      </header>

      <section className="gbf-section gbf-gallery-section">
        <div className="gbf-container">
          <Reveal className="gbf-section-heading">
            <div>
              <p className="gbf-kicker"><span />{t("facilitiesPage.spacesTag")}</p>
              <h2>{t("facilitiesPage.spacesTitle")}</h2>
            </div>
            <span className="gbf-count">01 / 04</span>
          </Reveal>

          {featuredFacility && (
            <Reveal className="gbf-feature-reveal">
              <article className="gbf-feature">
                <div className="gbf-feature-image">
                  <img
                    src={featuredFacility.image}
                    alt={featuredFacility.title}
                    loading="eager"
                    style={{ objectPosition: featuredFacility.position }}
                  />
                  <span className="gbf-image-number">01</span>
                </div>
                <div className="gbf-feature-caption gbf-glass">
                  <p className="gbf-facility-category">{featuredFacility.category}</p>
                  <h3>{featuredFacility.title}</h3>
                  <p className="gbf-facility-description">{featuredFacility.description}</p>
                  <span className="gbf-feature-icon"><featuredFacility.Icon size={19} strokeWidth={1.65} /></span>
                </div>
              </article>
            </Reveal>
          )}

          <div className="gbf-gallery-support">
            {supportingGallery.map((item, index) => {
              const Icon = item.Icon;
              return (
                <Reveal key={item.id} className="gbf-support-reveal">
                  <article className="gbf-support-item">
                    <div className="gbf-support-image">
                      <img src={item.image} alt={item.title} loading="lazy" style={{ objectPosition: item.position }} />
                      <span className="gbf-image-number">0{index + 2}</span>
                      <span className="gbf-support-icon"><Icon size={17} strokeWidth={1.65} /></span>
                    </div>
                    <div className="gbf-support-caption">
                      <p className="gbf-facility-category">{item.category}</p>
                      <h3>{item.title}</h3>
                      <p className="gbf-facility-description">{item.description}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="gbf-section gbf-rules-section" aria-labelledby="venue-rules-title">
        <div className="gbf-container">
          <div className="gbf-rules-panel gbf-glass">
            <Reveal className="gbf-rules-intro">
              <p className="gbf-kicker"><Ban size={14} />{t("facilitiesPage.rulesTag")}</p>
              <h2 id="venue-rules-title">{t("facilitiesPage.rulesTitle")}</h2>
              <p className="gbf-rules-copy">{t("facilitiesPage.rulesCopy")}</p>
            </Reveal>
            <ol className="gbf-rules-list">
              {venueRules.map((rule, index) => (
                <li key={rule}>
                  <span className="gbf-rule-number">0{index + 1}</span>
                  <p>{rule}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="gbf-section gbf-supporting-section" aria-labelledby="extra-facilities-title">
        <div className="gbf-container">
          <Reveal className="gbf-supporting-heading">
            <div>
              <p className="gbf-kicker"><span />{t("facilitiesPage.extraTag")}</p>
              <h2 id="extra-facilities-title">{t("facilitiesPage.extraTitle")}</h2>
            </div>
            <p>{t("facilitiesPage.extraNote")}</p>
          </Reveal>
          <ul className="gbf-supporting-list gbf-glass">
            {supportingFacilities.map(({ name, Icon }) => (
              <li key={name}>
                <span className="gbf-amenity-icon"><Icon size={20} strokeWidth={1.65} /></span>
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="gbf-cta-section">
        <div className="gbf-container gbf-cta-content">
          <div>
            <p className="gbf-kicker"><span />{t("facilitiesPage.readyTitle")}</p>
            <p className="gbf-cta-copy">{t("facilitiesPage.readyCopy")}</p>
          </div>
          <Link to="/booking" className="gbf-cta-link">
            {t("facilitiesPage.viewSchedule")}<ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
