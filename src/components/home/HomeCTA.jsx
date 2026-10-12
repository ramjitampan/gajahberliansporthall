import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../Reveal'

export default function HomeCTA() {
  const reduce = useReducedMotion()
  return <section className="relative isolate overflow-hidden bg-[#102a22] px-5 py-16 text-cream md:px-8 md:py-24">
    <div aria-hidden="true" className="absolute -right-20 -top-36 -z-10 size-[430px] rounded-full border border-sage/10 md:size-[600px]"/><div aria-hidden="true" className="absolute -right-4 -top-20 -z-10 size-[310px] rounded-full border border-sage/10 md:size-[460px]"/>
    <Reveal className="glass-panel mx-auto flex w-full max-w-[1240px] flex-col items-start justify-between gap-8 rounded-[28px] p-6 md:flex-row md:items-end md:p-12">
      <div><p className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.22em] text-sage"><MapPin size={13}/> Kota Padang</p><h2 className="max-w-4xl text-4xl font-semibold leading-[.98] tracking-[-.055em] md:text-6xl">Jam kosong tidak menunggu.<br/><span className="font-display font-normal italic text-champagne">Pilih lapanganmu.</span></h2><p className="mt-5 max-w-md text-sm leading-6 text-cream/65">Tentukan waktu bermain dan lanjutkan booking dalam beberapa langkah.</p></div>
      <motion.div whileHover={reduce ? undefined : { y: -2 }} whileTap={reduce ? undefined : { scale: .985 }} transition={{ duration: .18 }}><Link to="/booking" className="inline-flex min-h-13 items-center gap-4 rounded-full bg-sage px-6 py-3 text-sm font-bold text-[#102a22] transition hover:bg-[#c1cdbb] focus-visible:outline-3 focus-visible:outline-champagne">Mulai Booking <ArrowRight size={17}/></Link></motion.div>
    </Reveal>
  </section>
}
