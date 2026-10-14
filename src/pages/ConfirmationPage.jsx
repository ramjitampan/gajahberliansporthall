import { useParams } from "react-router-dom";
import { Button, PageHeading } from "../components/UI";
import { courts, hourlyRate, serviceFee } from "../data/bookingData";
import { useBooking } from "../hooks/useBooking";
import { localDate, rupiah, timeLabel, totalPrice } from "../utils/booking";
export default function ConfirmationPage() {
  const { code } = useParams();
  const { booking: currentBooking, history, reset } = useBooking();
  const fromHistory = Boolean(code);
  const booking = fromHistory ? history.find((item) => item.code === code) : currentBooking;
  if (!booking || !booking.paid)
    return (
      <div className="mx-auto w-[min(700px,calc(100%-48px))] py-[15vh] text-center">
        <PageHeading eyebrow="Bukti tidak tersedia" title="Booking ini belum ditemukan." copy="Pastikan kamu membuka booking yang tersimpan di perangkat ini." />
        <Button to="/booking/riwayat">Kembali ke Riwayat</Button>
      </div>
    );
  const court = courts.find((item) => item.id === booking.courtId);
  const rows = [
    ["Nama pemesan", booking.customer.name],
    ["Lapangan", court?.name],
    ["Tanggal", localDate(booking.date)],
    ["Waktu", `${timeLabel(booking.startHour)}–${timeLabel(booking.startHour + Number(booking.duration))}`],
    ["Durasi", `${booking.duration} jam`],
  ];
  return (
    <div className="mx-auto w-[calc(100%-32px)] py-14 text-center md:w-[min(1180px,calc(100%-48px))] md:py-20">
      <div className="no-print mx-auto mb-7 grid size-17.5 place-items-center rounded-full bg-emerald text-3xl text-white">✓</div>
      <div className="no-print [&>header]:mx-auto">
        <PageHeading eyebrow="Booking berhasil" title="Sampai jumpa di lapangan." copy="Simpan bukti ini dan tunjukkan kode booking saat tiba di venue." />
      </div>
      <article className="print-receipt mx-auto w-full max-w-150 border border-line bg-paper p-5.5 text-left shadow-[6px_6px_0_#ded5c4] md:p-8 md:shadow-[12px_12px_0_#ded5c4]">
        <div className="flex items-start justify-between border-b-2 border-ink pb-6">
          <span className="text-lg font-extrabold">GajahBerlianSportsHall</span>
          <div className="text-right">
            <small className="block text-[10px] text-muted">Kode booking</small>
            <strong className="mt-1 block">{booking.code}</strong>
          </div>
        </div>
        <dl className="my-6">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 border-b border-line py-3 text-[13px]">
              <dt className="text-muted">{label}</dt>
              <dd className="font-semibold">{value}</dd>
            </div>
          ))}
          <div className="flex justify-between gap-4 border-b border-line py-3 text-[13px]">
            <dt className="text-muted">Sewa lapangan</dt>
            <dd className="font-semibold">{rupiah(hourlyRate * Number(booking.duration))}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-line py-3 text-[13px]">
            <dt className="text-muted">Biaya layanan</dt>
            <dd className="font-semibold">{rupiah(serviceFee)}</dd>
          </div>
          <div className="mt-4 flex justify-between border-t-2 border-ink py-3 text-[17px]">
            <dt>Total pembayaran</dt>
            <dd className="font-semibold text-emerald">{rupiah(totalPrice(booking.duration))}</dd>
          </div>
        </dl>
        <p className="text-center text-[10px] uppercase tracking-[.1em] text-muted">Pembayaran QRIS demo · Lunas</p>
      </article>
      <div className="no-print mt-11 flex flex-col justify-center gap-3 sm:flex-row">
        <Button onClick={() => window.print()}>Simpan Bukti Booking</Button>
        {fromHistory ? (
          <Button to="/booking/riwayat" variant="secondary">Kembali ke Riwayat</Button>
        ) : (
          <>
            <Button to="/booking/riwayat" variant="secondary">Riwayat Booking</Button>
            <Button to="/" variant="ghost" onClick={reset}>Kembali ke Beranda</Button>
          </>
        )}
      </div>
    </div>
  );
}
