import { ArrowRight, Check, Clock3, PhoneCall, SearchX } from "lucide-react";
import Reveal from "../Reveal";

const oldWays = [
  { icon: PhoneCall, text: "Menelepon venue satu per satu" },
  { icon: Clock3, text: "Menunggu balasan untuk kepastian" },
  { icon: SearchX, text: "Belum tahu slot yang masih kosong" },
];
const newWays = ["Jadwal terlihat langsung", "Harga transparan sebelum pesan", "Booking dalam satu alur sederhana", "Status booking dapat dipantau"];

export default function BookingProblem() {
  return (
    <section className="bg-[#142e26] px-5 py-20 text-ivory md:px-8 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mb-12 grid gap-6 md:grid-cols-[1fr_.55fr] md:items-end">
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[.2em] text-sage">Lebih sedikit urusan, lebih banyak permainan</p>
            <h2 className="max-w-3xl text-4xl font-semibold leading-[.98] tracking-[-.05em] md:text-6xl">
              Dari cari-cari jadwal <span className="font-display font-normal italic text-champagne">jadi siap bermain.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-ivory/65">Alur pemesanan menyatukan informasi penting, supaya kamu tahu langkah berikutnya.</p>
        </Reveal>
        <div className="grid gap-8 border-t border-white/15 pt-8 md:grid-cols-[.9fr_60px_1.1fr] md:items-center">
          <Reveal>
            <p className="mb-5 text-[9px] font-bold uppercase tracking-[.18em] text-white/40">Sebelumnya</p>
            <ul className="space-y-4">
              {oldWays.map(({ icon: Icon, text }, i) => (
                <li key={text} className="flex items-center gap-4 text-sm text-ivory/55">
                  <span className="font-display text-xl italic text-white/30">0{i + 1}</span>
                  <Icon size={16} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="hidden justify-center md:flex">
            <span className="grid size-11 place-items-center rounded-full border border-sage/35 text-sage">
              <ArrowRight size={18} />
            </span>
          </div>
          <Reveal delay={100} className="glass-panel rounded-2xl p-5 md:p-7">
            <p className="mb-5 text-[9px] font-bold uppercase tracking-[.18em] text-sage">Dengan GajahBerlianSportsHall</p>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {newWays.map((text, i) => (
                <li key={text} className="flex items-center gap-4 py-4">
                  <span className="grid size-7 place-items-center rounded-full bg-sage/15 text-sage">
                    <Check size={14} />
                  </span>
                  <span className="text-sm font-medium">{text}</span>
                  <span className="ml-auto font-display text-xl italic text-champagne">0{i + 1}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
