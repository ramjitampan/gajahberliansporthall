import { Link } from "react-router-dom";
import { courts, hourlyRate, serviceFee } from "../data/bookingData";
import { localDate, rupiah, timeLabel, totalPrice } from "../utils/booking";
export function Button({ to, variant = "primary", children, className = "", ...props }) {
  const base = "inline-flex min-h-12.5 items-center justify-center gap-5 rounded-sm px-5.5 text-sm font-bold transition duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50";
  const styles = {
    primary: "bg-emerald text-white hover:bg-emerald-soft",
    secondary: "border border-[#99988f] bg-transparent text-ink hover:bg-[#ebe5d8]",
    ghost: "bg-transparent px-0 text-emerald hover:text-emerald-soft",
    light: "bg-ivory text-emerald hover:bg-white",
    danger: "border border-[#c88b84] bg-transparent text-danger hover:bg-[#fff0ed]",
  };
  const cn = `${base} ${styles[variant]} ${className}`;
  return to ? (
    <Link className={cn} to={to} {...props}>
      {children}
    </Link>
  ) : (
    <button className={cn} {...props}>
      {children}
    </button>
  );
}
export function Field({ label, error, optional, children }) {
  return (
    <label className="mb-6 flex flex-col gap-2.5 text-[13px] font-semibold">
      <span>
        {label} {optional && <em className="font-normal not-italic text-muted">opsional</em>}
      </span>
      {children}
      {error && <small className="font-medium text-danger">{error}</small>}
    </label>
  );
}
export function BookingSummary({ booking, compact = false }) {
  const court = courts.find((item) => item.id === booking.courtId);
  const rows = [
    ["Tanggal", localDate(booking.date)],
    ["Lapangan", court?.name || "Belum dipilih"],
    ["Jam", booking.startHour === null ? "Belum dipilih" : `${timeLabel(booking.startHour)}–${timeLabel(booking.startHour + Number(booking.duration))}`],
    ["Durasi", `${booking.duration} jam`],
    ["Sewa", rupiah(hourlyRate * Number(booking.duration))],
    ["Biaya layanan", rupiah(serviceFee)],
  ];
  return (
    <aside className={`sticky top-5 border border-line bg-paper p-5.5 md:p-7.5 ${compact ? "text-sm" : ""}`} aria-label="Ringkasan booking">
      <p className="mb-4.5 text-[11px] font-bold uppercase tracking-[.16em] text-emerald-soft">Ringkasan pesanan</p>
      <h2 className="font-display text-3xl">Waktu bermainmu</h2>
      <dl className="my-6.5">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 border-b border-[#e4dfd5] py-3 text-[13px]">
            <dt className="text-muted">{label}</dt>
            <dd className="m-0 text-right font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 flex items-end justify-between">
        <span>Total</span>
        <strong className="font-display text-[27px] text-emerald">{rupiah(totalPrice(booking.duration))}</strong>
      </div>
    </aside>
  );
}
export function PageHeading({ eyebrow, title, copy }) {
  const step = eyebrow?.match(/Langkah (\d+) dari 3/);
  return (
    <header className="mb-10 max-w-3xl md:mb-14">
      {step && <FlowSteps active={Number(step[1])} />}
      <p className="mb-4.5 text-[11px] font-bold uppercase tracking-[.16em] text-emerald-soft">{eyebrow}</p>
      <h1 className="mb-5 font-display text-[43px] leading-[.98] tracking-[-.045em] md:text-7xl">{title}</h1>
      {copy && <p className="max-w-2xl text-base leading-7 text-muted">{copy}</p>}
    </header>
  );
}
export function FlowSteps({ active = 1 }) {
  const steps = ["Jadwal", "Pemesan", "Pembayaran"];
  return (
    <ol aria-label="Tahapan booking" className="mb-8 flex max-w-xl items-center">
      {steps.map((step, index) => {
        const number = index + 1;
        return (
          <li key={step} className={`flex flex-1 items-center ${number < steps.length ? "after:mx-2 after:h-px after:flex-1 after:bg-line sm:after:mx-4" : ""}`} aria-current={number === active ? "step" : undefined}>
            <span className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold ${number === active ? "bg-emerald text-white" : number < active ? "bg-[#dfe9e1] text-emerald" : "bg-[#e9e4da] text-muted"}`}>
              {number < active ? "✓" : number}
            </span>
            <span className={`ml-2 text-[10px] font-bold uppercase tracking-wide sm:ml-2.5 sm:text-xs ${number === active ? "text-emerald" : "text-muted"}`}>{step}</span>
          </li>
        );
      })}
    </ol>
  );
}
export function StateBox({ type = "loading", children }) {
  const theme = type === "error" ? "justify-start bg-[#f8e8e5] text-danger" : "justify-center bg-[#eeebe3] text-muted";
  return (
    <div className={`flex items-center gap-2.5 p-4.5 text-center text-[13px] ${theme}`} role={type === "error" ? "alert" : "status"}>
      {type === "loading" && <span className="size-4 animate-spin rounded-full border-2 border-[#b9beb9] border-t-emerald" />}
      {children}
    </div>
  );
}
