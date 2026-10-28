import { Link } from "react-router-dom";
import { courts, hourlyRate, serviceFee } from "../data/bookingData";
import { localDate, rupiah, timeLabel, totalPrice } from "../utils/booking";
import { useTranslation } from "../i18n/I18nContext";

export function Button({ to, variant = "primary", children, className = "", ...props }) {
  const base = "inline-flex min-h-12.5 items-center justify-center gap-3 rounded-sm px-5.5 text-sm font-bold transition duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50";
  const styles = {
    primary: "bg-emerald text-white hover:bg-emerald-soft dark:bg-sage dark:text-[#102a22] dark:hover:bg-[#c1d1ba]",
    secondary: "border border-[#99988f] bg-transparent text-ink hover:bg-[#ebe5d8] dark:border-white/20 dark:text-cream dark:hover:bg-white/10",
    ghost: "bg-transparent px-0 text-emerald hover:text-emerald-soft dark:text-sage dark:hover:text-cream",
    light: "bg-ivory text-emerald hover:bg-white dark:bg-[#182e25] dark:text-cream dark:hover:bg-[#203a30]",
    danger: "border border-[#c88b84] bg-transparent text-danger hover:bg-[#fff0ed] dark:border-red-500/40 dark:text-red-400 dark:hover:bg-red-950/20",
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
  const { t } = useTranslation();
  return (
    <label className="mb-6 flex flex-col gap-2.5 text-[13px] font-semibold text-ink dark:text-cream">
      <span>
        {label} {optional && <em className="font-normal not-italic text-muted dark:text-cream/50">({t("customerPage.optional") || "opsional"})</em>}
      </span>
      {children}
      {error && <small className="font-medium text-danger dark:text-red-400">{error}</small>}
    </label>
  );
}

export function BookingSummary({ booking, compact = false }) {
  const { t } = useTranslation();
  const court = courts.find((item) => item.id === booking.courtId);
  const notSelected = t("bookingPage.notSelected") || "Belum dipilih";

  const rows = [
    [t("bookingPage.summaryDate") || "Tanggal", localDate(booking.date)],
    [t("bookingPage.summaryCourt") || "Lapangan", court?.name || notSelected],
    [
      t("bookingPage.summaryTime") || "Jam",
      booking.startHour === null
        ? notSelected
        : `${timeLabel(booking.startHour)}–${timeLabel(booking.startHour + Number(booking.duration))}`,
    ],
    [t("bookingPage.summaryDuration") || "Durasi", `${booking.duration} ${t("pricingPage.hours") || "jam"}`],
    [t("bookingPage.summaryRent") || "Sewa", rupiah(hourlyRate * Number(booking.duration))],
    [t("bookingPage.summaryService") || "Biaya layanan", rupiah(serviceFee)],
  ];

  return (
    <aside
      className={`sticky top-24 border border-line bg-paper p-5.5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] dark:border-white/10 dark:bg-[#142620] dark:text-cream md:p-7.5 ${
        compact ? "text-sm" : ""
      }`}
      aria-label="Ringkasan booking"
    >
      <p className="mb-4.5 text-[11px] font-bold uppercase tracking-[.16em] text-emerald-soft dark:text-sage">
        {t("bookingPage.summaryTitle") || "Ringkasan pesanan"}
      </p>
      <h2 className="font-display text-3xl text-ink dark:text-cream">
        {t("bookingPage.summarySubtitle") || "Waktu bermainmu"}
      </h2>
      <dl className="my-6.5">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 border-b border-[#e4dfd5] py-3 text-[13px] dark:border-white/10">
            <dt className="text-muted dark:text-cream/65">{label}</dt>
            <dd className="m-0 text-right font-semibold text-ink dark:text-cream">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 flex items-end justify-between border-t border-line pt-4 dark:border-white/10">
        <span className="text-sm font-medium text-muted dark:text-cream/70">
          {t("pricingPage.total") || "Total"}
        </span>
        <strong className="font-display text-[27px] text-emerald dark:text-champagne">
          {rupiah(totalPrice(booking.duration))}
        </strong>
      </div>
    </aside>
  );
}

export function PageHeading({ eyebrow, title, copy }) {
  const stepMatch = eyebrow?.match(/(\d+)\s*(?:dari|of)\s*(\d+)/i);
  return (
    <header className="mb-10 max-w-3xl md:mb-14">
      {stepMatch && <FlowSteps active={Number(stepMatch[1])} />}
      <p className="mb-4.5 text-[11px] font-bold uppercase tracking-[.16em] text-emerald-soft dark:text-sage">{eyebrow}</p>
      <h1 className="mb-5 font-display text-[43px] leading-[.98] tracking-[-.045em] text-ink dark:text-cream md:text-7xl">{title}</h1>
      {copy && <p className="max-w-2xl text-base leading-7 text-muted dark:text-cream/70">{copy}</p>}
    </header>
  );
}

export function FlowSteps({ active = 1 }) {
  const { lang } = useTranslation();
  const steps = lang === "en" ? ["Schedule", "Customer", "Payment"] : ["Jadwal", "Pemesan", "Pembayaran"];

  return (
    <ol aria-label="Tahapan booking" className="mb-8 flex max-w-xl items-center">
      {steps.map((step, index) => {
        const number = index + 1;
        return (
          <li
            key={step}
            className={`flex flex-1 items-center ${
              number < steps.length ? "after:mx-2 after:h-px after:flex-1 after:bg-line dark:after:bg-white/15 sm:after:mx-4" : ""
            }`}
            aria-current={number === active ? "step" : undefined}
          >
            <span
              className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
                number === active
                  ? "bg-emerald text-white dark:bg-sage dark:text-[#102a22]"
                  : number < active
                  ? "bg-[#dfe9e1] text-emerald dark:bg-[#1f382e] dark:text-sage"
                  : "bg-[#e9e4da] text-muted dark:bg-[#1a2d24] dark:text-cream/40"
              }`}
            >
              {number < active ? "✓" : number}
            </span>
            <span
              className={`ml-2 text-[10px] font-bold uppercase tracking-wide sm:ml-2.5 sm:text-xs ${
                number === active ? "text-emerald dark:text-sage" : "text-muted dark:text-cream/50"
              }`}
            >
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function StateBox({ type = "loading", children }) {
  const theme =
    type === "error"
      ? "justify-start bg-[#f8e8e5] text-danger dark:bg-red-950/30 dark:text-red-300 dark:border dark:border-red-900/40"
      : "justify-center bg-[#eeebe3] text-muted dark:bg-[#162921] dark:text-cream/75 dark:border dark:border-white/10";

  return (
    <div className={`flex items-center gap-2.5 p-4.5 text-center text-[13px] rounded-sm ${theme}`} role={type === "error" ? "alert" : "status"}>
      {type === "loading" && <span className="size-4 animate-spin rounded-full border-2 border-[#b9beb9] border-t-emerald dark:border-white/30 dark:border-t-sage" />}
      {children}
    </div>
  );
}
