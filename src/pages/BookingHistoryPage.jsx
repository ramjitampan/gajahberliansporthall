import { ArrowUpRight, Clock3, ReceiptText } from "lucide-react";
import { Button, PageHeading, StateBox } from "../components/UI";
import { courts } from "../data/bookingData";
import { useBooking } from "../hooks/useBooking";
import { localDate, rupiah, timeLabel, totalPrice } from "../utils/booking";

export default function BookingHistoryPage() {
  const { history } = useBooking();
  const completedBookings = history.filter((booking) => booking.paid);

  return (
    <main className="mx-auto min-h-[70vh] w-[calc(100%-32px)] py-14 md:w-[min(1060px,calc(100%-48px))] md:py-20">
      <PageHeading
        eyebrow="Akun pemain"
        title="Riwayat booking."
        copy="Buka kembali bukti booking kapan saja dan tunjukkan kode booking kepada petugas saat tiba di venue."
      />

      <div className="mb-7 flex items-start gap-3 border border-[#d8d0c0] bg-[#f7f3ea] p-4 text-sm leading-6 text-[#5e655f]">
        <Clock3 size={17} className="mt-1 shrink-0 text-emerald" />
        <p>Riwayat demo tersimpan di browser dan perangkat ini. Untuk akses dari perangkat lain, riwayat perlu disimpan oleh backend setelah integrasi.</p>
      </div>

      {completedBookings.length === 0 ? (
        <div className="border border-line bg-paper px-5 py-12 text-center md:px-10">
          <StateBox type="empty">Belum ada booking yang berhasil dibayar di perangkat ini.</StateBox>
          <Button to="/booking" className="mt-6">Mulai Booking</Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {completedBookings.map((booking) => {
            const court = courts.find((item) => item.id === booking.courtId);
            const endHour = Number(booking.startHour) + Number(booking.duration);
            return (
              <article key={booking.code} className="grid gap-5 border border-line bg-paper p-5 shadow-[0_8px_24px_rgba(40,45,35,.04)] md:grid-cols-[1fr_auto] md:items-center md:p-7">
                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#e8f0e9] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.1em] text-emerald"><span className="size-1.5 rounded-full bg-emerald"/> Lunas · Demo</span>
                    <span className="text-xs font-bold tracking-[.08em] text-[#5e655f]">{booking.code}</span>
                  </div>
                  <h2 className="text-xl font-semibold tracking-tight text-ink">{court?.name || "Lapangan"} <span className="px-1 text-muted">·</span> {localDate(booking.date)}</h2>
                  <p className="mt-2 text-sm text-muted">{timeLabel(booking.startHour)}–{timeLabel(endHour)} <span className="px-1">·</span> {booking.duration} jam <span className="px-1">·</span> {booking.customer?.name}</p>
                  <p className="mt-4 text-sm font-semibold text-emerald">Total {rupiah(totalPrice(booking.duration))}</p>
                </div>
                <Button to={`/booking/riwayat/${encodeURIComponent(booking.code)}`} variant="secondary" className="gap-2">
                  <ReceiptText size={16}/> Lihat Struk <ArrowUpRight size={14}/>
                </Button>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
