import { ArrowUpRight, CircleDot, Dumbbell, LampDesk } from "lucide-react";

import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import { facilities } from "../../data/facilities";
import courtImage from "../../assets/LapanganContoh.png";
import waitingImage from "../../assets/RuangTnggu.png";
import lightingImage from "../../assets/PencahayaanContoh.png";

const icons = [CircleDot, Dumbbell, LampDesk];
const facilityImages = [courtImage, waitingImage, lightingImage];

const positions = ["center 42%", "65% 35%", "30% 65%"];

function FacilityCard({ item, index, Icon, image, imagePosition, featured = false }) {
  return (
    <article
      className={`
        group relative isolate h-full overflow-hidden
        rounded-xl bg-[#10251d]
        ${featured ? "min-h-[430px]" : "min-h-[245px]"}
      `}
    >
      {/* Background Image */}
      <img
        src={image}
        alt=""
        aria-hidden="true"
        style={{ objectPosition: imagePosition }}
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
        className="
          absolute inset-0 h-full w-full
          object-cover opacity-75
          transition-all duration-700 ease-out
          group-hover:scale-[1.06]
          group-hover:opacity-90
        "
      />

      {/* Gradient Overlay */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t
          from-[#071b14]/95
          via-[#071b14]/40
          to-[#071b14]/10
        "
      />

      {/* Subtle Hover Tint */}
      <div
        className="
          absolute inset-0
          bg-champagne/0
          transition-colors duration-500
          group-hover:bg-champagne/[0.04]
        "
      />

      {/* Top Information */}
      <div
        className="
          absolute inset-x-0 top-0
          flex items-start justify-between
          p-6
        "
      >
        {/* Icon */}
        <div
          className="
            flex size-10 items-center justify-center
            rounded-full
            border border-white/25
            bg-black/15
            text-champagne
            backdrop-blur-sm
          "
        >
          <Icon size={18} strokeWidth={1.5} />
        </div>

        {/* Number */}
        <span
          className="
            font-display text-2xl italic
            text-white/60
          "
        >
          0{index + 1}
        </span>
      </div>

      {/* Bottom Information */}
      <div
        className={`
          absolute inset-x-0 bottom-0
          ${featured ? "p-7 md:p-9" : "p-6"}
        `}
      >
        {/* Decorative Line */}
        <div
          className="
            mb-4 h-px w-8
            bg-champagne/80
            transition-all duration-500
            group-hover:w-14
          "
        />

        {/* Facility Title */}
        <h3
          className={`
            font-semibold
            tracking-[-0.025em]
            text-white
            ${featured ? "text-2xl md:text-[32px]" : "text-xl"}
          `}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p
          className={`
            mt-3 max-w-md
            leading-relaxed
            text-white/70
            ${featured ? "text-sm" : "text-xs"}
          `}
        >
          {item.description}
        </p>

        {/* Featured Card Detail */}
        {featured && (
          <div
            className="
              mt-6 flex items-center gap-2
              text-[10px] font-semibold
              uppercase tracking-[0.15em]
              text-champagne
            "
          >
            Jelajahi fasilitas
            <ArrowUpRight size={14} />
          </div>
        )}
      </div>
    </article>
  );
}

export default function FacilitiesSection() {
  const featuredFacility = facilities[0];
  const secondaryFacilities = facilities.slice(1, 3);

  return (
    <section
      id="facilities"
      className="
        bg-[#182f27]
        px-5 py-20
        text-ivory
        md:px-8
        lg:py-28
      "
    >
      <div className="mx-auto w-full max-w-[1200px]">
        {/* SECTION HEADER */}
        <Reveal
          className="
            mb-12
            flex flex-col justify-between
            gap-7
            md:flex-row
            md:items-end
          "
        >
          {/* Heading */}
          <div className="max-w-[650px]">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-champagne" />

              <span
                className="
                  text-[10px] font-bold
                  uppercase tracking-[0.25em]
                  text-sage
                "
              >
                Sekilas fasilitas
              </span>
            </div>

            <h2
              className="
                text-4xl font-semibold
                leading-[1.08]
                tracking-[-0.045em]
                md:text-5xl
                lg:text-[58px]
              "
            >
              Dibuat untuk
              <br />
              <span
                className="
                  font-display font-normal
                  italic text-champagne
                "
              >
                setiap permainan.
              </span>
            </h2>
          </div>

          {/* Subtitle */}
          <p
            className="
              max-w-[290px]
              text-sm leading-7
              text-ivory/55
            "
          >
            Kenali fasilitas yang mendukung kenyamanan dan pengalaman bermainmu.
          </p>
        </Reveal>

        {/* FACILITIES GRID */}
        <div
          className="
            grid gap-4
            md:h-[510px]
            md:grid-cols-[1.2fr_0.8fr]
          "
        >
          {/* Main Facility */}
          {featuredFacility && (
            <Reveal className="h-full">
              <FacilityCard item={featuredFacility} index={0} Icon={icons[0]} image={facilityImages[0]} imagePosition={positions[0]} featured />
            </Reveal>
          )}

          {/* Secondary Facilities */}
          <div
            className="
              grid gap-4
              md:min-h-0
              md:grid-rows-2
            "
          >
            {secondaryFacilities.map((item, index) => {
              const actualIndex = index + 1;
              const Icon = icons[actualIndex];

              return (
                <Reveal key={item.id} delay={actualIndex * 80} className="h-full md:min-h-0">
                  <FacilityCard item={item} index={actualIndex} Icon={Icon} image={facilityImages[actualIndex]} imagePosition={positions[actualIndex]} />
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* SECTION FOOTER */}
        <div
          className="
            mt-9 flex flex-wrap
            items-center justify-between
            gap-5
            border-t border-white/10
            pt-6
          "
        >
          {/* Venue Identity */}
          <span
            className="
              text-[10px]
              uppercase tracking-[0.2em]
              text-ivory/35
            "
          >
            Gajah Berlian Sports Hall
          </span>

          {/* CTA */}
          <Link
            to="/fasilitas"
            className="
              group inline-flex items-center
              gap-3 text-xs font-semibold
              text-champagne
              transition-colors duration-300
              hover:text-ivory
            "
          >
            Eksplorasi fasilitas
            <span
              className="
                flex size-8
                items-center justify-center
                rounded-full
                border border-champagne/35
                transition-all duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
                group-hover:border-ivory
              "
            >
              <ArrowUpRight size={15} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
