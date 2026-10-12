import { ArrowRight, CalendarDays, CircleDollarSign, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";

const principles = [
  { icon: CalendarDays, title: "Jadwal yang mudah dibaca", copy: "Pilih tanggal, durasi, dan slot yang tersedia dari satu alur booking." },
  { icon: CircleDollarSign, title: "Biaya terlihat di awal", copy: "Tarif sewa dan biaya layanan dipisahkan supaya total mudah dipahami." },
  { icon: MapPin, title: "Dirancang untuk pemain", copy: "Pengalaman booking berfokus pada hal penting: kapan dan di lapangan mana bermain." },
];

export default function AboutPage() {
  return (
    <main className="bg-cream px-5 pb-20 pt-12 md:px-8 md:pb-28 md:pt-20">
      <div className="mx-auto max-w-[1120px]">
        <header className="grid gap-8 border-b border-line pb-12 md:grid-cols-[1fr_.65fr] md:items-end md:pb-16">
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[.2em] text-emerald-soft">Tentang Kami</p>
            <h1 className="text-5xl font-semibold leading-[.94] tracking-[-.06em] md:text-7xl">
              Main dimulai dari <span className="font-display font-normal italic text-emerald">waktu yang tepat.</span>
            </h1>
          </div>
          <p className="max-w-md text-base leading-7 text-muted">BadminLap.id adalah frontend booking lapangan badminton yang membantu pemain memilih jadwal dan melihat rincian biaya secara sederhana.</p>
        </header>
        <section className="grid gap-10 py-12 md:grid-cols-[.7fr_1.3fr] md:py-16">
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-champagne">Dibuat oleh pemain, untuk pemain</p>
          <div>
            <div className="space-y-4 border-y border-line py-7 text-base leading-7 text-ink/75">
              <p>BadmintonLapID adalah platform pemesanan lapangan badminton di Kota Padang. Kami menghubungkan pemain dengan venue di Padang Barat, Padang Timur, dan Padang Utara.</p>
              <p>Dulu mencari lapangan kosong berarti menelepon satu per satu dan menunggu balasan. Kami ingin membuat jadwal lebih mudah dilihat, harga lebih jelas, dan proses pemesanan lebih ringkas.</p>
            </div>
            <div className="grid gap-8 border-b border-line py-7 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-emerald-soft">Misi</p>
                <p className="mt-3 max-w-xl font-display text-2xl italic leading-snug text-emerald md:text-3xl">“Membuat setiap jam kosong di lapangan mudah ditemukan dan mudah dipesan.”</p>
              </div>
              <div className="border-t border-line pt-4 sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0">
                <strong className="font-display text-5xl font-normal text-emerald">3</strong>
                <p className="text-sm text-muted">area di Kota Padang</p>
              </div>
            </div>
            <h2 className="mt-10 text-2xl font-semibold tracking-tight">Cara kami membantu</h2>
            <div className="mt-3 divide-y divide-line border-y border-line">
              {principles.map(({ icon: Icon, title, copy }, i) => (
                <Reveal key={title} delay={i * 70} className="grid gap-3 py-6 sm:grid-cols-[50px_1fr] sm:items-start">
                  <span className="grid size-10 place-items-center rounded-full border border-line text-emerald">
                    <Icon size={18} />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <div className="flex flex-col items-start justify-between gap-5 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">Detail venue dan operasional dapat ditambahkan setelah data resmi tersedia.</p>
          <Link to="/booking" className="inline-flex items-center gap-2 border-b border-champagne pb-1 text-sm font-semibold text-emerald">
            Lihat jadwal <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </main>
  );
}
