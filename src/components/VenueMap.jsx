import { useState } from "react";
import {
  Building2,
  CarFront,
  Check,
  Clock3,
  Coffee,
  DoorOpen,
  ExternalLink,
  MapPin,
  Navigation,
  Phone,
  Toilet,
} from "lucide-react";
import { useTranslation } from "../i18n/I18nContext";
import Reveal from "./Reveal";

const facilityIcons = [CarFront, Building2, DoorOpen, Coffee, Toilet];

export default function VenueMap() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const placeName = "Hall badminton gajah berlian";
  const lat = -0.9074322;
  const lng = 100.3723326;
  const address = t("map.addressValue");
  const mapQuery = `${placeName}, Jl. Mela Utama No.1, Padang`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
  const whatsappUrl = "https://wa.me/6281234567890?text=" + encodeURIComponent("Halo Hall Badminton Gajah Berlian, saya ingin informasi mengenai jadwal lapangan.");
  const amenities = t("map.amenities") || [];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Preserve the existing feedback when clipboard access is unavailable.
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <>
      <section className="gbl-map-section" aria-label={t("map.title")}>
        <div className="gbl-container">
          <Reveal className="gbl-map-composition">
            <div className="gbl-map-frame">
              <iframe
                title="Peta Lokasi Hall Badminton Gajah Berlian"
                src={embedUrl}
                className="gbl-map-iframe"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="gbl-address-panel">
              <div className="gbl-address-copy">
                <span className="gbl-label">{t("map.addressLabel")}</span>
                <p className="gbl-address">{address}</p>
              </div>
              <div className="gbl-actions">
                <button type="button" onClick={handleCopy} className="gbl-button gbl-button-secondary">
                  {copied ? <Check size={15} aria-hidden="true" /> : <MapPin size={15} aria-hidden="true" />}
                  <span>{copied ? t("map.copiedNotice") : t("map.copyAddress")}</span>
                </button>
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="gbl-button gbl-button-primary">
                  <Navigation size={15} aria-hidden="true" />
                  <span>{t("map.openInGoogleMaps")}</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="gbl-contact-section" aria-label={`${t("map.hoursLabel")} & ${t("map.phoneLabel")}`}>
        <div className="gbl-container">
          <Reveal className="gbl-contact-strip">
            <div className="gbl-contact-item">
              <span className="gbl-contact-icon gbl-contact-icon-hours"><Clock3 size={20} strokeWidth={1.7} aria-hidden="true" /></span>
              <div>
                <p className="gbl-contact-label">{t("map.hoursLabel")}</p>
                <p className="gbl-contact-value">{t("map.hoursValue")}</p>
              </div>
            </div>
            <span className="gbl-contact-divider" aria-hidden="true" />
            <div className="gbl-contact-item">
              <span className="gbl-contact-icon gbl-contact-icon-phone"><Phone size={20} strokeWidth={1.7} aria-hidden="true" /></span>
              <div>
                <p className="gbl-contact-label">{t("map.phoneLabel")}</p>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="gbl-contact-value gbl-contact-link">{t("map.phoneValue")}</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="gbl-facilities-section">
        <div className="gbl-container">
          <Reveal className="gbl-facilities-heading">
            <div>
              <p className="gbl-kicker"><span />{t("map.courtsLabel")}</p>
              <h2>{t("map.courtsValue")}</h2>
            </div>
          </Reveal>
          <div className="gbl-facility-grid">
            {amenities.map((item, index) => {
              const Icon = facilityIcons[index] || Building2;
              return (
                <Reveal key={item} className={`gbl-facility-module gbl-facility-module-${index + 1}`}>
                  <span className="gbl-facility-icon"><Icon size={21} strokeWidth={1.65} aria-hidden="true" /></span>
                  <span className="gbl-facility-name">{item}</span>
                  <span className="gbl-facility-index">0{index + 1}</span>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="gbl-directions-section">
        <div className="gbl-container">
          <Reveal className="gbl-directions-composition">
            <div className="gbl-directions-content">
              <p className="gbl-directions-kicker"><span />{t("map.eyebrow")}</p>
              <h2>{t("map.directionsLabel")}</h2>
              <p className="gbl-directions-copy">{t("map.directionsGuide")}</p>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="gbl-directions-link">
                <Navigation size={17} aria-hidden="true" />
                <span>{t("map.openInGoogleMaps")}</span>
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>
            <div className="gbl-route-art" aria-hidden="true">
              <svg viewBox="0 0 480 190" fill="none">
                <path className="gbl-route-line" d="M20 148C92 148 82 61 169 61S236 145 315 121 389 38 460 38" />
                <path className="gbl-route-line-secondary" d="M20 148C92 148 82 61 169 61S236 145 315 121 389 38 460 38" />
                <circle className="gbl-route-marker gbl-route-marker-start" cx="20" cy="148" r="7" />
                <circle className="gbl-route-marker gbl-route-marker-end" cx="460" cy="38" r="9" />
                <circle className="gbl-route-halo" cx="460" cy="38" r="19" />
              </svg>
              <span className="gbl-route-pin"><MapPin size={24} strokeWidth={1.6} /></span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
