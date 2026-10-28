import { useState } from "react";
import { Check, Clock, ExternalLink, MapPin, Navigation, Phone, ShieldCheck } from "lucide-react";
import { useTranslation } from "../i18n/I18nContext";
import Reveal from "./Reveal";

export default function VenueMap({ className = "", compact = false }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const placeName = "Hall badminton gajah berlian";
  const lat = -0.9074322;
  const lng = 100.3723326;
  const address = t("map.addressValue");

  const mapQuery = `${placeName}, Jl. Mela Utama No.1, Padang`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
  const whatsappUrl = "https://wa.me/6281234567890?text=" + encodeURIComponent("Halo Hall Badminton Gajah Berlian, saya ingin informasi mengenai jadwal lapangan.");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback jika clipboard API tidak diizinkan browser
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const amenities = [
    "Parkir Luas (Mobil & Motor)",
    "Mushala Bersih",
    "Ruang Ganti & Toilet",
    "Kantin & Minuman Dingin",
    "Free Wi-Fi",
    "Lapangan Badminton Karpet",
  ];

  return (
    <section className={`py-16 md:py-24 transition-colors duration-200 ${className}`}>
    <div className="mx-auto w-[min(1240px,calc(100%-36px))]">
    <Reveal>
    <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
    <div>
    <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.22em] text-emerald-soft dark:text-sage">
    <MapPin size={13} />
    {t("map.eyebrow")}
    </p>
    <h2 className="text-3xl font-semibold tracking-[-0.04em] text-ink dark:text-cream md:text-5xl">
    {t("map.title")}
    </h2>
    </div>
    <p className="max-w-md text-sm leading-relaxed text-muted dark:text-cream/70">
    {t("map.subtitle")}
    </p>
    </div>
    </Reveal>

    <div className="grid gap-8 lg:grid-cols-[1.25fr_0.95fr] lg:items-stretch">
    {/* MAP DISPLAY */}
    <Reveal className="relative overflow-hidden rounded-2xl border border-line bg-paper dark:border-white/10 dark:bg-[#142620] shadow-[0_12px_36px_rgba(0,0,0,0.06)] min-h-[380px] lg:min-h-[460px]">
    <iframe
    title="Peta Lokasi Hall Badminton Gajah Berlian"
    src={embedUrl}
    className="h-full w-full min-h-[380px] border-0"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    allowFullScreen
    />
    {/* Map Overlay Badge */}
    <div className="pointer-events-none absolute bottom-4 left-4 right-4 sm:right-auto z-10 flex items-center gap-3 rounded-xl border border-line/60 bg-white/92 px-4 py-3 shadow-lg backdrop-blur-md dark:border-white/15 dark:bg-[#102a22]/90 dark:text-cream">
    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald text-white dark:bg-sage dark:text-[#102a22]">
    <MapPin size={18} />
    </span>
    <div>
    <p className="text-xs font-bold leading-tight text-ink dark:text-cream">Hall Badminton Gajah Berlian</p>
    <p className="text-[11px] text-muted dark:text-cream/70">Jl. Mela Utama No.1, Kp. Olo, Kec. Nanggalo, Kota Padang</p>
    </div>
    </div>
    </Reveal>

    {/* DETAILS & ACTION CARD */}
    <Reveal delay={80} className="flex flex-col justify-between rounded-2xl border border-line bg-paper p-6 dark:border-white/10 dark:bg-[#142620] shadow-[0_12px_36px_rgba(0,0,0,0.06)] md:p-8">
    <div className="space-y-6">
    {/* Address Section */}
    <div className="border-b border-line pb-6 dark:border-white/10">
    <span className="text-[10px] font-bold uppercase tracking-[.18em] text-muted dark:text-cream/50">
    {t("map.addressLabel")}
    </span>
    <p className="mt-2 text-base font-semibold text-ink dark:text-cream leading-snug">
    {address}
    </p>
    <div className="mt-4 flex flex-wrap gap-2.5">
    <button
    type="button"
    onClick={handleCopy}
    className="inline-flex items-center gap-2 rounded-lg border border-line bg-ivory px-3.5 py-2 text-xs font-semibold text-ink transition hover:bg-cream dark:border-white/15 dark:bg-[#193229] dark:text-cream dark:hover:bg-[#203f34]"
    >
    {copied ? <Check size={14} className="text-emerald dark:text-sage" /> : <MapPin size={14} />}
    <span>{copied ? t("map.copiedNotice") : t("map.copyAddress")}</span>
    </button>

    <a
    href={directionsUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 rounded-lg bg-emerald px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-emerald-soft dark:bg-sage dark:text-[#102a22] dark:hover:bg-[#c7d5c3]"
    >
    <Navigation size={14} />
    <span>{t("map.openInGoogleMaps")}</span>
    <ExternalLink size={12} className="opacity-75" />
    </a>
    </div>
    </div>

    {/* Operating Hours & Contact */}
    <div className="grid gap-4 sm:grid-cols-2 border-b border-line pb-6 dark:border-white/10">
    <div>
    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-muted dark:text-cream/50">
    <Clock size={13} className="text-emerald dark:text-sage" />
    {t("map.hoursLabel")}
    </span>
    <p className="mt-1.5 text-sm font-semibold text-ink dark:text-cream">
    {t("map.hoursValue")}
    </p>
    </div>
    <div>
    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-muted dark:text-cream/50">
    <Phone size={13} className="text-emerald dark:text-sage" />
    {t("map.phoneLabel")}
    </span>
    <a
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-1.5 inline-block text-sm font-semibold text-emerald hover:underline dark:text-champagne"
    >
    {t("map.phoneValue")}
    </a>
    </div>
    </div>

    {/* Venue Perks / Facilities at Venue */}
    <div>
    <span className="text-[10px] font-bold uppercase tracking-[.18em] text-muted dark:text-cream/50">
    {t("map.courtsLabel")}
    </span>
    <p className="mt-1 text-sm text-ink dark:text-cream">
    {t("map.courtsValue")}
    </p>
    <div className="mt-3.5 flex flex-wrap gap-2">
    {amenities.map((item) => (
      <span
      key={item}
      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream/60 px-3 py-1 text-[11px] font-medium text-ink dark:border-white/10 dark:bg-[#11231d] dark:text-cream/80"
      >
      <ShieldCheck size={12} className="text-emerald dark:text-sage" />
      {item}
      </span>
    ))}
    </div>
    </div>
    </div>

    {/* Directions note */}
    <div className="mt-6 rounded-xl bg-emerald/5 p-4 text-xs leading-relaxed text-muted dark:bg-white/[0.03] dark:text-cream/70 border border-emerald/10 dark:border-white/5">
    <strong className="block text-ink dark:text-cream font-semibold mb-1">
    {t("map.directionsLabel")}
    </strong>
    {t("map.directionsGuide")}
    </div>
    </Reveal>
    </div>
    </div>
    </section>
  );
}
