import { Armchair, ArrowUpRight, CircleDot, LampDesk, ParkingCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import courtImage from "../../assets/Lapangan.jpeg";
import parkingImage from "../../assets/Lapangan Parkir.png";
import lightingImage from "../../assets/Pencahayaan.png";
import waitingImage from "../../assets/Ruang Tunggu.png";
import { facilities } from "../../data/facilities";
import { useTranslation } from "../../i18n/I18nContext";

const facilityVisuals = {
  court: { image: courtImage, Icon: CircleDot, position: "center 54%" },
  waiting: { image: waitingImage, Icon: Armchair, position: "center 54%" },
  lighting: { image: lightingImage, Icon: LampDesk, position: "center 30%" },
  parking: { image: parkingImage, Icon: ParkingCircle, position: "center 55%" },
};

function moveSpotlight(event) {
  if (event.pointerType === "touch") return;
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--gb-pointer-x", `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty("--gb-pointer-y", `${event.clientY - bounds.top}px`);
}

export default function FacilitiesSection() {
  const { t } = useTranslation();
  const visibleFacilities = facilities.slice(0, 4);

  return (
    <section id="facilities" className="gb-section gb-facilities">
      <Reveal className="gb-facilities-head">
        <div>
          <p className="gb-kicker">{t("homeFacilities.eyebrow")}</p>
          <h2>
            {t("homeFacilities.titleLead")} <span>{t("homeFacilities.titleAccent")}</span>
          </h2>
        </div>
        <p>{t("homeFacilities.copy")}</p>
      </Reveal>

      <div className="gb-facility-grid">
        {visibleFacilities.map((facility, index) => {
          const { image, Icon, position } = facilityVisuals[facility.id] || facilityVisuals.court;
          return (
            <Reveal key={facility.id} className="gb-facility-item">
              <article className="gb-facility-card gb-glass gb-glass-interactive" onPointerMove={moveSpotlight}>
                <div className="gb-facility-image">
                  <img src={image} alt={facility.title} loading="lazy" style={{ objectPosition: position }} />
                </div>
                <div className="gb-facility-card-content">
                  <div className="gb-facility-card-top">
                    <span className="gb-facility-icon"><Icon size={21} strokeWidth={1.65} /></span>
                    <span className="gb-facility-number">0{index + 1}</span>
                  </div>
                  <div className="gb-facility-card-copy">
                    <span className="gb-facility-label">{facility.category}</span>
                    <h3>{facility.title}</h3>
                    <p>{facility.description}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="gb-facilities-foot">
        <span>Gajah Berlian Sports Hall</span>
        <Link to="/fasilitas" className="gb-link">{t("homeFacilities.explore")}<ArrowUpRight size={14} /></Link>
      </div>
    </section>
  );
}
