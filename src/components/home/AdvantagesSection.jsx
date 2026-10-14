import { ArrowUpRight, BadgeCheck, CircleDollarSign, Clock3, ListChecks } from "lucide-react";
import Reveal from "../Reveal";
import { Link } from "react-router-dom";

const benefits = [
  { icon: Clock3, number: "01", title: "Cepat", copy: "Pilih tanggal dan lihat slot tanpa menunggu balasan." },
  { icon: ListChecks, number: "02", title: "Jadwal jelas", copy: "Status slot menunjukkan waktu tersedia dan sudah dipesan." },
  { icon: CircleDollarSign, number: "03", title: "Harga terbuka", copy: "Biaya sewa dan layanan terlihat sebelum melanjutkan." },
  { icon: BadgeCheck, number: "04", title: "Status terpantau", copy: "Ikuti progres pembayaran demo hingga bukti booking." },
];

export default function AdvantagesSection() {
  return (
    <section className="bg-[#253c32] px-5 py-20 text-cream md:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
        <Reveal>
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[.2em] text-sage">Dirancang untuk alur yang mudah</p>
          <h2 className="max-w-md text-4xl font-semibold leading-[.98] tracking-[-.05em] md:text-6xl">
            Hal penting, <span className="font-display font-normal italic text-champagne">terlihat jelas.</span>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-6 text-cream/60">Dari ketersediaan waktu sampai total pembayaran, setiap langkah punya konteks yang mudah diikuti.</p>
        </Reveal>
        <div className="border-t border-white/15">
          {benefits.map(({ icon: Icon, number, title, copy }, i) => (
            <Reveal
              key={number}
              delay={i * 45}
              className="group grid grid-cols-[42px_1fr_auto] items-center gap-3 border-b border-white/15 py-5 transition-colors duration-300 hover:bg-white/[0.035] md:grid-cols-[48px_1fr_1fr_auto] md:gap-5 md:py-6"
            >
              <span className="font-display text-xl italic text-champagne">{number}</span>
              <div className="flex items-center gap-3">
                <Icon size={17} className="shrink-0 text-sage" />
                <h3 className="font-semibold">{title}</h3>
              </div>
              <p className="col-start-2 text-xs leading-5 text-cream/55 md:col-start-auto md:max-w-xs">{copy}</p>
              <span className="hidden font-display text-xl italic text-white/30 md:block">↗</span>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-[1240px] text-right">
        <Link to="/daftar-harga" className="inline-flex items-center gap-2 text-xs font-semibold text-sage transition hover:text-ivory">
          Lihat rincian harga <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
}
