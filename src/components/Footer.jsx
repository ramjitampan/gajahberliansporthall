import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-[#123d32] text-[#f7f3ea]">
      <div className="mx-auto grid w-[min(1240px,calc(100%-40px))] gap-10 py-14 md:grid-cols-[1.2fr_.7fr_1fr] md:py-16">
        <div>
          <Link to="/" className="font-extrabold tracking-tight">
            GajahBerlianSportsHall
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">Platform pemesanan lapangan badminton di Kota Padang.</p>
        </div>
        <div>
          <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[.18em] text-[#c8ae78]">Jelajahi</h2>
          <div className="grid gap-3 text-sm text-white/70">
            <Link to="/booking">Jadwal Booking</Link>
            <Link to="/tentang">Tentang Kami</Link>
            <Link to="/daftar-harga">Pricelist</Link>
            <Link to="/fasilitas">Fasilitas</Link>
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[.18em] text-[#c8ae78]">Kontak venue</h2>
          <div className="grid gap-4 text-sm text-white/70">
            <p className="flex items-start gap-2">
              <MapPin size={16} />
              Kota Padang, Sumatera Barat
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} />
              Informasi kontak menyusul
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4">
        <div className="mx-auto flex w-[min(1240px,calc(100%-40px))] justify-between text-[11px] text-white/50">
          <span>© 2026 GajahBerlianSportsHall</span>
          <span>
            Booking lapangan, lebih mudah <ArrowUpRight size={13} className="inline" />
          </span>
        </div>
      </div>
    </footer>
  );
}
