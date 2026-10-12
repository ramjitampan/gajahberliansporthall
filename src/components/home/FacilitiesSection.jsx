import { ArrowUpRight, CircleDot, Dumbbell, LampDesk } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../Reveal'
import { facilities } from '../../data/facilities'
import heroImage from '../../assets/badminton-hero.png'

const icons = [CircleDot, Dumbbell, LampDesk]
const positions = ['68% center', '24% center', 'center']

export default function FacilitiesSection() {
  return <section className="bg-[#182f27] px-5 py-20 text-ivory md:px-8 md:py-28">
    <div className="mx-auto w-full max-w-[1240px]">
      <Reveal className="grid gap-7 md:grid-cols-[1fr_.65fr] md:items-end"><div><p className="mb-5 text-[10px] font-bold uppercase tracking-[.2em] text-sage">Sekilas fasilitas</p><h2 className="max-w-2xl text-4xl font-semibold leading-[1] tracking-[-.05em] md:text-6xl">Ruang untuk <span className="font-display font-normal italic text-champagne">permainanmu.</span></h2></div><p className="max-w-md text-sm leading-6 text-ivory/60">Visual fasilitas masih berupa placeholder; detail venue akan mengikuti data yang dikonfirmasi pengelola.</p></Reveal>
      <div className="mt-10 grid gap-3 md:grid-cols-12 md:grid-rows-[210px_210px]">
        {facilities.slice(0, 3).map((item, i) => { const Icon = icons[i]; return <Reveal key={item.id} delay={i * 65} className={`group relative min-h-[230px] overflow-hidden rounded-sm bg-[#0e261f] ${i === 0 ? 'md:col-span-7 md:row-span-2' : 'md:col-span-5'}`}><img src={heroImage} alt="" aria-hidden="true" style={{ objectPosition: positions[i] }} onError={(event) => { event.currentTarget.style.display = 'none' }} className="absolute inset-0 size-full object-cover opacity-65 transition duration-700 group-hover:scale-[1.025] group-hover:opacity-80"/><div className="absolute inset-0 bg-gradient-to-t from-[#0c211a]/95 via-[#102a22]/20 to-[#102a22]/10"/><div className="absolute inset-x-0 bottom-0 p-4 md:p-5"><div className="glass-panel flex items-end justify-between gap-4 rounded-xl p-4 md:p-5"><div><Icon size={17} className="mb-2.5 text-champagne"/><p className="mb-1 text-[8px] font-bold uppercase tracking-[.18em] text-sage">Placeholder · visual venue</p><h3 className="text-lg font-semibold text-ivory">{item.title}</h3><p className="mt-1 max-w-sm text-[11px] leading-5 text-ivory/75">{item.description}</p></div><span className="font-display text-2xl italic text-ivory/65">0{i + 1}</span></div></div></Reveal> })}
      </div>
      <div className="mt-6 flex justify-end"><Link to="/fasilitas" className="inline-flex items-center gap-2 border-b border-champagne/50 pb-1 text-xs font-semibold text-sage transition hover:text-ivory">Lihat semua fasilitas <ArrowUpRight size={14}/></Link></div>
    </div>
  </section>
}
