import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const items = [
  ["/", "Beranda"],
  ["/booking", "Jadwal Booking"],
  ["/tentang", "Tentang"],
  ["/daftar-harga", "Pricelist"],
  ["/fasilitas", "Fasilitas"],
  ["/booking/riwayat", "Riwayat"],
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  const glassOnScroll = scrolled && !open;
  const navClass = ({ isActive }) => `border-b py-2.5 text-[11px] font-bold uppercase tracking-[.12em] transition ${isActive ? "border-sage text-cream" : "border-transparent text-cream/65 hover:text-cream"}`;

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 border-b text-cream transition-[background-color,backdrop-filter,box-shadow] duration-300 ease-out ${glassOnScroll ? "border-white/20 bg-[#102a22]/80 shadow-[0_5px_22px_rgba(10,24,19,.14)] backdrop-blur-xl" : "border-white/10 bg-[#102a22] shadow-[0_5px_22px_rgba(10,24,19,.18)]"}`}
      animate={{ backgroundColor: glassOnScroll ? "rgba(16,42,34,0.82)" : "rgba(16,42,34,1)" }}
    >
      <div className="mx-auto flex h-18 w-[min(1240px,calc(100%-36px))] items-center justify-between md:h-20">
        <NavLink to="/" aria-label="GajahBerlianSportsHall Beranda" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-lg border border-champagne/65 font-display text-lg text-champagne">B</span>
          <span className="text-[17px] font-extrabold tracking-[-.05em]">GajahBerlianSportsHall</span>
        </NavLink>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigasi utama">
          {items.map(([to, label]) => (
            <NavLink key={label} to={to} end={to === "/" || to === "/booking"} className={navClass}>
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          aria-label={open ? "Tutup navigasi" : "Buka navigasi"}
          aria-expanded={open}
          className="grid size-10 place-items-center rounded-lg border border-white/20 text-cream lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute inset-x-0 top-full border-b border-white/10 bg-[#102a22] px-5 py-3 shadow-xl lg:hidden"
            aria-label="Navigasi mobile"
          >
            {items.map(([to, label]) => (
              <NavLink
                key={label}
                to={to}
                end={to === "/" || to === "/booking"}
                className={({ isActive }) => `flex items-center justify-between border-b border-white/10 py-4 text-xs font-bold uppercase tracking-[.12em] last:border-0 ${isActive ? "text-sage" : "text-cream/65"}`}
              >
                <span>{label}</span>
                <ArrowUpRight size={14} />
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
