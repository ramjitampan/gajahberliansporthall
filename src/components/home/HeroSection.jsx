import { ArrowDownRight, ArrowRight, MapPin, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import heroImage from '../../assets/badminton-hero.png'

export default function HeroSection() {
  const reduce = useReducedMotion()
  return <section className="relative isolate min-h-[min(850px,100svh)] overflow-hidden bg-[#102a22] px-5 pb-12 pt-28 text-cream md:px-8 md:pt-32">
    <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[59%]">
      <img src={heroImage} alt="Pemain badminton berlatih di lapangan indoor" className="size-full object-cover object-[68%_center]"/>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#102a22_0%,rgba(16,42,34,.92)_10%,rgba(16,42,34,.35)_72%,rgba(16,42,34,.28)_100%)] lg:bg-[linear-gradient(90deg,#102a22_0%,rgba(16,42,34,.96)_8%,rgba(16,42,34,.54)_38%,rgba(16,42,34,.18)_100%)]"/>
      <div className="absolute inset-0 bg-gradient-to-t from-[#102a22]/70 via-transparent to-[#102a22]/20"/>
    </div>
    <div className="mx-auto grid min-h-[min(670px,calc(100svh-150px))] w-full max-w-[1320px] items-center lg:grid-cols-[.9fr_1.1fr]">
      <motion.div initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }} className="relative z-10 py-12 lg:py-20">
        <p className="mb-7 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.22em] text-sage"><MapPin size={14}/> Badminton court booking · Padang</p>
        <h1 className="max-w-3xl text-balance text-[clamp(3.55rem,8vw,7.8rem)] font-semibold leading-[.86] tracking-[-.075em] text-ivory">Temukan lapangan.<br/><span className="font-display font-normal italic tracking-[-.045em] text-[#c6c99c]">Pesan waktumu.</span></h1>
        <p className="mt-8 max-w-lg text-base leading-7 text-cream/75 md:text-lg md:leading-8">Booking lapangan badminton di Kota Padang dengan jadwal yang jelas dan harga transparan, dari pilih jam hingga konfirmasi.</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link to="/booking" className="inline-flex min-h-13 items-center gap-4 rounded-full bg-sage px-6 py-3 text-sm font-bold text-[#142d25] transition hover:bg-[#bdcbb7] focus-visible:outline-3 focus-visible:outline-champagne">Booking Sekarang <ArrowRight size={17}/></Link>
          <Link to="/daftar-harga" className="inline-flex items-center gap-2 border-b border-champagne/70 pb-1 text-sm font-semibold text-ivory transition hover:text-[#d3d5ac]">Lihat Pricelist <ArrowDownRight size={15}/></Link>
        </div>
      </motion.div>
      <div className="relative hidden h-full min-h-[420px] lg:block" aria-hidden="true">
        <motion.div initial={reduce ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .65, delay: .18 }} className="glass-panel absolute right-0 top-[28%] w-[240px] rounded-2xl p-5">
          <span className="mb-5 flex items-center justify-between text-[9px] font-bold uppercase tracking-[.18em] text-cream/60"><Trophy size={16} className="text-champagne"/> Booking, lebih ringkas</span>
          <span className="block font-display text-2xl italic text-ivory">Cari waktu.</span><span className="mt-1 block font-display text-2xl italic text-[#c6c99c]">Temukan ritme.</span>
          <span className="mt-5 block border-t border-white/15 pt-3 text-[9px] uppercase tracking-[.14em] text-cream/55">BadminLap.id · Padang</span>
        </motion.div>
        <motion.div initial={reduce ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .85, delay: .12 }} className="absolute bottom-10 right-0 flex items-center gap-3 border-l border-sage/45 pl-4 text-cream/80"><span className="text-[10px] font-semibold uppercase tracking-[.17em]">Ruang untuk permainanmu</span></motion.div>
        <div className="absolute right-4 top-1/4 h-44 w-px bg-gradient-to-b from-transparent via-sage/50 to-transparent"/>
      </div>
    </div>
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-sage/20"/>
  </section>
}
