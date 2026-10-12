import { Check, ClipboardList, Clock3, CreditCard, MapPinned } from 'lucide-react'
import Reveal from '../Reveal'

const steps = [
  { icon: MapPinned, title: 'Pilih lapangan dan tanggal', copy: 'Tentukan hari dan lapangan yang diinginkan.' },
  { icon: Clock3, title: 'Pilih jam dan durasi', copy: 'Pastikan seluruh durasi tersedia.' },
  { icon: ClipboardList, title: 'Isi data pemesan', copy: 'Masukkan nama dan nomor WhatsApp.' },
  { icon: CreditCard, title: 'Tunggu konfirmasi admin', copy: 'Selesaikan langkah pembayaran dan simpan bukti booking.' },
]

export default function BookingSteps() {
  return <section className="bg-[#e8e5da] px-5 py-20 text-ink md:px-8 md:py-28">
    <div className="mx-auto max-w-[1240px]">
      <Reveal className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-5 text-[10px] font-bold uppercase tracking-[.2em] text-emerald-soft">Cara booking</p><h2 className="text-4xl font-semibold leading-[.98] tracking-[-.05em] md:text-6xl">Empat langkah menuju <span className="font-display font-normal italic text-emerald">permainanmu.</span></h2></div><p className="max-w-sm text-sm leading-6 text-muted">Proses ringkas dari memilih jadwal sampai bukti booking.</p></Reveal>
      <ol className="relative grid gap-0 border-l border-[#b6b5a6] pl-5 sm:pl-0 md:grid-cols-4 md:border-l-0 md:border-t md:pl-0">{steps.map(({ icon: Icon, title, copy }, i) => <Reveal key={title} delay={i * 60} className="relative border-b border-[#b6b5a6] py-5 sm:pl-2 md:border-b-0 md:border-r md:py-7 md:pr-6 md:first:pl-0 md:last:border-r-0"><span className="absolute -left-[25px] top-8 grid size-3 place-items-center rounded-full bg-emerald text-[8px] text-cream md:-top-[7px] md:left-0">{i === 3 ? <Check size={9}/> : ''}</span><span className="mb-8 flex items-center justify-between md:mb-12"><Icon size={20} className="text-emerald"/><span className="font-display text-3xl italic text-[#9c9a83]">0{i + 1}</span></span><h3 className="max-w-48 text-base font-semibold">{title}</h3><p className="mt-2 max-w-52 text-xs leading-5 text-muted">{copy}</p></Reveal>)}</ol>
    </div>
  </section>
}
