import { ArrowRight, CalendarDays, CircleDollarSign, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, ...options },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useCountUp(target, duration = 1400, trigger = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);
  return value;
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const principles = [
  { icon: CalendarDays, title: "Jadwal yang mudah dibaca", copy: "Pilih tanggal, durasi, dan slot yang tersedia dari satu alur booking tanpa perlu menelepon." },
  { icon: CircleDollarSign, title: "Biaya terlihat di awal", copy: "Tarif sewa dan biaya layanan dipisahkan supaya total mudah dipahami sebelum konfirmasi." },
  { icon: MapPin, title: "Dirancang untuk pemain", copy: "Pengalaman booking berfokus pada hal penting: kapan dan di lapangan mana bermain." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [statRef, statInView] = useInView();
  const count = useCountUp(3, 1200, statInView);

  return (
    <main className="bg-cream min-h-screen">
      {/* ══════════════════════════════════════════════
          HERO — full-width editorial opener
      ══════════════════════════════════════════════ */}
      <section className="border-b border-line px-5 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-[1120px]">
          {/* Overline — thin rule + label */}
          <Reveal>
            <div className="mb-10 flex items-center gap-4">
              <span className="h-px w-10 bg-emerald/30" />
              <p className="text-[11px] font-medium tracking-[.24em] text-emerald-soft uppercase">Tentang Kami</p>
            </div>
          </Reveal>

          {/* Giant headline — stacked, full bleed */}
          <Reveal delay={80}>
            <h1 className="font-semibold leading-[.9] tracking-[-0.055em] text-ink" style={{ fontSize: "clamp(3rem, 9vw, 6.5rem)" }}>
              Main dimulai
              <br />
              dari <em className="font-display font-normal italic text-emerald">waktu yang tepat.</em>
            </h1>
          </Reveal>

          {/* Subtext + CTA — pinned right on desktop */}
          <Reveal delay={160}>
            <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <p className="max-w-sm text-base leading-[1.8] text-muted">GajahBerlianSportsHall menyediakan cara praktis bagi pemain untuk memilih jadwal lapangan dan melihat rincian biaya — semuanya dari satu tempat.</p>
              <Link to="/booking" className="group inline-flex items-center gap-2.5 self-start text-sm font-semibold text-emerald md:self-auto">
                <span className="relative pb-px after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-champagne after:transition-[width] after:duration-300 group-hover:after:w-full">Lihat jadwal</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STATS BAR — horizontal editorial strip
      ══════════════════════════════════════════════ */}
      <section className="border-b border-line px-5 md:px-10">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <Reveal delay={0}>
              <div ref={statRef} className="py-9 sm:pr-10">
                <p className="font-display text-[2.6rem] font-normal leading-none text-emerald" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {count}
                </p>
                <p className="mt-2.5 text-sm text-muted">area di Kota Padang</p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="py-9 sm:px-10">
                <p className="font-display text-[2.6rem] font-normal leading-none text-emerald">1</p>
                <p className="mt-2.5 text-sm text-muted">venue terpusat & mudah diakses</p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="py-9 sm:pl-10">
                <p className="font-display text-[2.6rem] font-normal leading-none text-emerald">∞</p>
                <p className="mt-2.5 text-sm text-muted">booking tanpa telepon</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STORY — asymmetric two-column
      ══════════════════════════════════════════════ */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-16 md:grid-cols-[1fr_1.6fr] md:gap-24">
            {/* Left — sticky label block */}
            <div>
              <Reveal>
                <div className="md:sticky md:top-28">
                  <p className="mb-4 text-[11px] font-medium tracking-[.22em] text-champagne uppercase">Cerita kami</p>
                  <h2 className="text-[1.6rem] font-semibold leading-[1.2] tracking-[-0.035em]">
                    Dibuat oleh pemain,
                    <br />
                    untuk pemain.
                  </h2>
                </div>
              </Reveal>
            </div>

            {/* Right — prose */}
            <div className="space-y-7 text-[15px] leading-[1.9] text-ink/70">
              <Reveal>
                <p>GajahBerlianSportsHall adalah venue olahraga di Kota Padang. Kami membantu pemain menemukan jadwal dan memesan waktu bermain dengan lebih praktis.</p>
              </Reveal>
              <Reveal delay={60}>
                <p>Dulu mencari lapangan kosong berarti menelepon satu per satu dan menunggu balasan. Kami ingin membuat jadwal lebih mudah dilihat, harga lebih jelas, dan proses pemesanan lebih ringkas.</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MISSION — full-bleed quote block
      ══════════════════════════════════════════════ */}
      <section className="border-y border-line bg-emerald/[.04] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <Reveal>
            <p className="mb-6 text-[11px] font-medium tracking-[.22em] text-emerald-soft uppercase">Misi</p>
          </Reveal>
          <Reveal delay={80}>
            <blockquote className="font-display italic leading-[1.2] text-emerald" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)", maxWidth: "820px" }}>
              "Membuat setiap jam kosong di lapangan mudah ditemukan dan mudah dipesan."
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PRINCIPLES — numbered editorial list
      ══════════════════════════════════════════════ */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1120px]">
          <Reveal>
            <h2 className="mb-14 text-[1.05rem] font-medium tracking-[-0.01em] text-muted">Cara kami membantu</h2>
          </Reveal>

          <div className="divide-y divide-line border-y border-line">
            {principles.map(({ icon: Icon, title, copy }, i) => (
              <Reveal key={title} delay={i * 80}>
                <div className="group grid cursor-default gap-6 py-8 transition-colors duration-300 hover:bg-emerald/[.03] sm:grid-cols-[2.5rem_1fr_auto] sm:items-center sm:gap-10 sm:px-4 sm:-mx-4 sm:rounded-sm">
                  {/* Icon */}
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-emerald/70 transition-colors duration-300 group-hover:border-emerald/40 group-hover:text-emerald">
                    <Icon size={16} strokeWidth={1.5} />
                  </span>
                  {/* Text */}
                  <div>
                    <h3 className="text-[1.05rem] font-semibold tracking-[-0.025em]">{title}</h3>
                    <p className="mt-1.5 max-w-lg text-sm leading-[1.75] text-muted">{copy}</p>
                  </div>
                  {/* Arrow — appears on hover */}
                  <ArrowRight size={16} className="hidden text-emerald/0 transition-all duration-300 group-hover:text-emerald/60 sm:block" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER STRIP
      ══════════════════════════════════════════════ */}
      <Reveal>
        <div className="border-t border-line px-5 py-10 md:px-10">
          <div className="mx-auto flex max-w-[1120px] flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-sm text-muted">Detail venue dan operasional dapat ditambahkan setelah data resmi tersedia.</p>
            <Link to="/booking" className="group inline-flex items-center gap-2 text-sm font-semibold text-emerald">
              <span className="relative pb-px after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-champagne after:transition-[width] after:duration-300 group-hover:after:w-full">Lihat jadwal</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
