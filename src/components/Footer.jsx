import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "../i18n/I18nContext";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#123d32] text-[#f7f3ea] dark:bg-[#0a1713] dark:text-cream border-t border-white/5 transition-colors duration-200">
      <div className="mx-auto grid w-[min(1240px,calc(100%-40px))] gap-10 py-14 md:grid-cols-[1.2fr_.7fr_1fr] md:py-16">
        <div>
          <Link to="/" className="font-extrabold tracking-tight text-lg text-cream">
            GajahBerlianSportsHall
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/65 dark:text-cream/65">
            {t("footer.desc")}
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[.18em] text-[#c8ae78] dark:text-champagne">
            {t("footer.explore")}
          </h2>
          <div className="grid gap-3 text-sm text-white/70 dark:text-cream/70">
            <Link to="/booking" className="hover:text-cream transition">{t("nav.booking")}</Link>
            <Link to="/tentang" className="hover:text-cream transition">{t("nav.about")}</Link>
            <Link to="/daftar-harga" className="hover:text-cream transition">{t("nav.pricing")}</Link>
            <Link to="/fasilitas" className="hover:text-cream transition">{t("nav.facilities")}</Link>
            <Link to="/lokasi" className="hover:text-cream transition">{t("nav.location")}</Link>
            <Link to="/booking/riwayat" className="hover:text-cream transition">{t("nav.history")}</Link>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[.18em] text-[#c8ae78] dark:text-champagne">
            {t("footer.contact")}
          </h2>
          <div className="grid gap-4 text-sm text-white/70 dark:text-cream/70">
            <Link to="/lokasi" className="flex items-start gap-2 hover:text-cream transition group">
              <MapPin size={16} className="shrink-0 text-sage group-hover:text-champagne transition" />
              <span>
                {t("footer.city")} <span className="text-xs text-champagne block mt-0.5">Lihat Peta & Petunjuk Arah →</span>
              </span>
            </Link>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-cream transition"
            >
              <Phone size={16} className="text-sage" />
              <span>+62 812-3456-7890 (WhatsApp)</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <div className="mx-auto flex w-[min(1240px,calc(100%-40px))] flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/50 dark:text-cream/50">
          <span>{t("footer.copyright")}</span>
          <span>
            {t("footer.tagline")}{" "}
            <ArrowUpRight size={13} className="inline ml-0.5" />
          </span>
        </div>
      </div>
    </footer>
  );
}
