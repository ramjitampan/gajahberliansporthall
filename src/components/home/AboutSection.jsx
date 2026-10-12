import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../Reveal";
import heroImage from "../../assets/badminton-hero.png";

export default function AboutSection() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-[#d9dfd2] px-5 py-20 text-[#1e2925] md:px-8 md:py-28">
      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[.2em] text-emerald-soft">Dibuat oleh pemain, untuk pemain</p>
          <h2 className="max-w-xl text-4xl font-semibold leading-[.98] tracking-[-.055em] md:text-6xl">
            Permainan dimulai jauh sebelum <span className="font-display font-normal italic text-emerald">servis pertama.</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-[#43544b]">BadminLap.id membantu pemain di Kota Padang melihat jadwal lapangan dan memesan waktu bermain dengan lebih ringkas.</p>
          <Link to="/tentang" className="mt-7 inline-flex items-center gap-2 border-b border-emerald/35 pb-1 text-sm font-semibold text-emerald">
            Kenali BadminLap.id <ArrowUpRight size={15} />
          </Link>
        </Reveal>
        <motion.figure
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="group relative m-0 min-h-[330px] overflow-hidden rounded-[8px_72px_8px_8px] bg-[#17382d] md:min-h-[460px]"
        >
          <img src={heroImage} alt="Pemain berlatih di lapangan badminton" className="absolute inset-0 size-full object-cover object-[69%_center] transition duration-700 group-hover:scale-[1.025]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102a22]/85 via-[#102a22]/5 to-[#102a22]/15" />
          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-ivory md:p-7">
            <div className="glass-panel rounded-xl px-4 py-3 md:px-5 md:py-4">
              <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.18em] text-sage">
                <MapPin size={12} /> Kota Padang
              </span>
              <p className="mt-2 font-display text-2xl italic md:text-3xl">Cari waktu. Temukan ritmemu.</p>
            </div>
            <span className="hidden border-l border-white/30 pl-4 font-display text-3xl italic text-champagne sm:block">01</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
