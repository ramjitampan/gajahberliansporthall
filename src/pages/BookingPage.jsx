import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookingSummary, Button, Field, PageHeading, StateBox } from '../components/UI'
import { courts, durations, hours } from '../data/bookingData'
import { useBooking } from '../hooks/useBooking'
import { isSlotAvailable, timeLabel, today } from '../utils/booking'

const control = 'w-full rounded-sm border border-[#c8c3b7] bg-[#fffefb] px-3.5 py-3 text-ink'
const card = 'border border-line bg-paper p-5.5 md:p-8.5'

export default function BookingPage() {
  const { booking, update } = useBooking()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => { const id = setTimeout(() => setLoading(false), 450); return () => clearTimeout(id) }, [])
  const availableCount = useMemo(() => hours.filter((hour) => isSlotAvailable(booking.courtId, hour, booking.duration)).length, [booking.courtId, booking.duration])
  const canContinue = Boolean(booking.date && booking.startHour !== null && isSlotAvailable(booking.courtId, booking.startHour, booking.duration))
  const proceed = () => { if (!canContinue) return setError('Pilih tanggal dan satu slot tersedia terlebih dahulu.'); navigate('/booking/data-pemesan') }

  return <div className="mx-auto w-[calc(100%-32px)] py-14 md:w-[min(1180px,calc(100%-48px))] md:py-20">
    <PageHeading eyebrow="Langkah 1 dari 3" title="Pilih waktu terbaikmu." copy="Slot yang ditandai penuh tidak dapat dipilih. Ketersediaan dihitung untuk seluruh durasi."/>
    <div className="grid items-start gap-7 lg:grid-cols-[1.4fr_.65fr]">
      <section className={card}>
        <div className="grid gap-4.5 sm:grid-cols-2"><Field label="Tanggal bermain"><input className={control} type="date" min={today()} value={booking.date} onChange={(event) => update({ date: event.target.value, startHour: null })}/></Field><Field label="Durasi"><select className={control} value={booking.duration} onChange={(event) => update({ duration: Number(event.target.value), startHour: null })}>{durations.map((duration) => <option key={duration} value={duration}>{duration} jam</option>)}</select></Field></div>
        <fieldset className="mb-7.5"><legend className="mb-3.5 text-[13px] font-bold">Pilih lapangan</legend><div className="grid gap-2.5 sm:grid-cols-2">{courts.map((court) => <button key={court.id} type="button" aria-pressed={booking.courtId === court.id} className={`bg-[#fffefb] p-3.5 text-left transition-colors duration-150 hover:border-emerald focus-visible:outline-3 focus-visible:outline-champagne ${booking.courtId === court.id ? 'border-2 border-emerald bg-[#edf3ef]' : 'border border-line'}`} onClick={() => update({ courtId: court.id, startHour: null })}><span className="block text-[13px] font-bold">{court.name}</span><small className="mt-1 block text-[10px] text-muted">{court.note}</small></button>)}</div></fieldset>
        <fieldset><legend className="mb-3.5 w-full text-[13px] font-bold">Jam mulai <span className="mt-2 block text-[11px] font-normal text-muted sm:float-right sm:mt-0"><i className="mr-1.5 inline-block size-1.5 rounded-full bg-emerald-soft"/> tersedia <i className="mr-1.5 ml-3 inline-block size-1.5 rounded-full bg-[#bbb9b1]"/> sudah dipesan</span></legend>{loading ? <StateBox>Memeriksa jadwal…</StateBox> : availableCount === 0 ? <StateBox type="empty">Tidak ada slot untuk durasi ini. Coba lapangan lain.</StateBox> : <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">{hours.map((hour) => { const available = isSlotAvailable(booking.courtId, hour, booking.duration); const selected = booking.startHour === hour; return <button type="button" key={hour} disabled={!available} aria-pressed={selected} className={`p-3.5 text-left transition focus-visible:outline-3 focus-visible:outline-champagne ${!available ? 'border border-line bg-[#eeeae2] text-[#8e8a82] line-through' : selected ? 'border-2 border-emerald bg-[#edf3ef]' : 'border border-line bg-[#fffefb] hover:border-emerald'}`} onClick={() => { update({ startHour: hour }); setError('') }}><b className="block">{timeLabel(hour)}</b><span className="mt-1 block text-[10px]">{!available ? 'Sudah dipesan' : selected ? 'Dipilih' : 'Tersedia'}</span></button> })}</div>}</fieldset>
        {error && <div className="mt-5"><StateBox type="error">{error}</StateBox></div>}
        <div className="mt-7.5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between"><Button to="/" variant="ghost">← Kembali ke Beranda</Button><Button disabled={loading || !canContinue} onClick={proceed}>Lanjut ke Data Pemesan →</Button></div>
      </section>
      <BookingSummary booking={booking}/>
    </div>
  </div>
}
