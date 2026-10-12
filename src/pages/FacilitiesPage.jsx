import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, CircleDot, Dumbbell, LampDesk, ParkingCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { facilities } from '../data/facilities'
import heroImage from '../assets/badminton-hero.png'

const icons = [CircleDot, Dumbbell, LampDesk, ParkingCircle]
const positions = ['68% center', '18% center', 'center', '94% center']

function GalleryItem({ item, index, reduce }) {
  const Icon = icons[index] || CircleDot
  const base = 'group relative isolate min-h-[250px] overflow-hidden bg-[#1d382e]'
  const image = <img src={heroImage} alt="" aria-hidden="true" style={{ objectPosition: positions[index] }} onError={(event) => { event.currentTarget.style.display = 'none' }} className="absolute inset-0 z-0 size-full object-cover transition duration-700 group-hover:scale-[1.035]"/>
  const caption = <div><p className="mb-2 text-[9px] font-bold uppercase tracking-[.18em] text-[#c6c99c]">{item.category} · Visual placeholder</p><h2 className="text-xl font-semibold text-ivory">{item.title}</h2><p className="mt-2 max-w-sm text-xs leading-5 text-ivory/70">{item.description}</p></div>
  const style = { duration: .45, delay: index * .06 }
  if (index === 1) return <motion.figure initial={reduce ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={style} className={`${base} flex min-h-[240px] items-stretch`}>
    <div className="relative z-0 w-[40%] shrink-0 overflow-hidden">{image}<div className="absolute inset-0 z-10 bg-[#102a22]/35"/></div><figcaption className="relative z-10 flex flex-1 flex-col justify-between bg-[#29483a] p-5 md:p-7"><Icon size={18} className="text-[#c6c99c]"/>{caption}</figcaption>
  </motion.figure>
  if (index === 3) return <motion.figure initial={reduce ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={style} className={`${base} min-h-[240px]`}>
    {image}<div className="absolute inset-0 z-10 bg-gradient-to-r from-[#102a22]/80 via-[#102a22]/25 to-[#102a22]/45"/><figcaption className="absolute inset-x-0 bottom-0 z-20 flex items-end gap-4 border-t border-white/15 bg-[#102a22]/65 p-5 backdrop-blur-[2px] md:p-6"><Icon className="mb-1 shrink-0 text-[#c6c99c]" size={18}/>{caption}</figcaption>
  </motion.figure>
  return <motion.figure initial={reduce ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={style} className={`${base} ${index === 0 ? 'min-h-[420px] md:col-span-7 md:row-span-2' : 'min-h-[240px] md:col-span-5'}`}>
    {image}<div className="absolute inset-0 z-10 bg-gradient-to-t from-[#102a22]/95 via-[#102a22]/20 to-[#102a22]/10"/><figcaption className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 p-6 md:p-8"><div className="flex items-start gap-4"><Icon className="mt-1 shrink-0 text-[#c6c99c]" size={18}/>{caption}</div><span className="font-display text-3xl italic text-white/45">0{index + 1}</span></figcaption>
  </motion.figure>
}

export default function FacilitiesPage() {
  const reduce = useReducedMotion()
  return <main className="bg-[#e1e2d7]">
    <header className="relative isolate overflow-hidden bg-[#102a22] px-5 pb-14 pt-14 text-ivory md:px-8 md:pb-20 md:pt-20">
      <img src={heroImage} alt="" aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 h-full w-full object-cover object-[70%_center] opacity-25 md:w-[62%]"/><div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#102a22_0%,rgba(16,42,34,.95)_45%,rgba(16,42,34,.35)_100%)]"/>
      <motion.div initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className="mx-auto grid w-full max-w-[1240px] gap-6 md:grid-cols-[1fr_.55fr] md:items-end"><div><p className="mb-5 text-[10px] font-bold uppercase tracking-[.2em] text-[#c6c99c]">Fasilitas</p><h1 className="max-w-3xl text-5xl font-semibold leading-[.94] tracking-[-.06em] md:text-7xl">Nyaman untuk <span className="font-display font-normal italic text-[#c6c99c]">setiap permainan.</span></h1></div><p className="max-w-md text-sm leading-7 text-ivory/70">Kenali ruang-ruang pendukung pengalaman bermain. Gambar dan keterangannya ditandai sebagai placeholder sampai detail venue dikonfirmasi.</p></motion.div>
    </header>
    <section className="px-5 py-10 md:px-8 md:py-14"><div className="mx-auto max-w-[1240px]"><div className="mb-6 flex items-center justify-between border-b border-[#b9bdaf] pb-3"><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#536457]">Galeri venue · 01—04</p><p className="text-[10px] text-[#73796e]">Visual konsep</p></div><div className="grid gap-3 md:grid-cols-12 md:grid-rows-[minmax(240px,22vw)_minmax(220px,20vw)]">{facilities.map((item, index) => <div key={item.id} className={index === 0 ? 'md:col-span-7 md:row-span-2' : index === 1 ? 'md:col-span-5' : index === 2 ? 'md:col-span-3' : 'md:col-span-2'}><GalleryItem item={item} index={index} reduce={reduce}/></div>)}</div><div className="mt-8 flex items-center justify-between gap-4 border-t border-[#b9bdaf] pt-5"><p className="max-w-2xl text-xs leading-5 text-[#657065]">Informasi aktual tentang fasilitas, perlengkapan, kapasitas, dan akses akan diperbarui setelah dikonfirmasi pengelola venue.</p><Link to="/booking" className="inline-flex shrink-0 items-center gap-2 border-b border-[#8c9e84] pb-1 text-xs font-semibold text-[#234635] transition hover:text-[#416d52]">Jadwal Booking <ArrowUpRight size={14}/></Link></div></div></section>
  </main>
}
