import { AlertTriangle, History, ReceiptText } from "lucide-react";
import { courts } from "../data/bookingData";
import { useBooking } from "../hooks/useBooking";
import { useTranslation } from "../i18n/I18nContext";
import { timeLabel } from "../utils/booking";

const statusKey = (booking) => {
  if (booking.paid || booking.paymentStatus === "paid") return "paid";
  if (["expired", "failed"].includes(booking.paymentStatus)) return booking.paymentStatus;
  if (booking.paymentStatus === "pending") return "pending";
  return "unknownStatus";
};

export default function AdminHistoryPage() {
  const { t, lang } = useTranslation();
  const { history } = useBooking();
  const loading = history === undefined;
  const error = !loading && !Array.isArray(history);
  const bookings = Array.isArray(history) ? history : [];
  const courtName = (id) => {
    const name = courts.find((court) => court.id === id)?.name;
    const number = name?.match(/\d+/)?.[0];
    return number ? `${t("admin.court")} ${number}` : t("admin.unknownCourt");
  };
  const dateLabel = (value) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return "—";
    const date = new Date(`${value}T12:00:00`);
    return Number.isNaN(date.getTime()) ? "—" : new Intl.DateTimeFormat(lang === "en" ? "en-US" : "id-ID", { day: "numeric", month: "short", year: "numeric" }).format(date);
  };

  return (
    <>
      <header className="mb-8 grid gap-5 border-b border-[#cfcabd] pb-7 dark:border-white/15 sm:grid-cols-[1fr_auto] sm:items-end md:mb-10 md:pb-9">
        <div><p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-emerald-soft dark:text-sage"><span className="text-[#a88d56]">02</span><span className="h-px w-7 bg-[#a88d56]/70" />{t("admin.historyEyebrow")}</p><h1 className="font-sans text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[.93] tracking-[-.07em] text-ink dark:text-cream">{t("admin.historyTitle")}</h1><p className="mt-4 max-w-xl text-sm leading-6 text-muted dark:text-cream/60 md:text-[15px]">{t("admin.historyCopy")}</p></div>
        <div className="flex items-end gap-3 border-l border-[#cfcabd] pl-4 dark:border-white/15 sm:mb-1 sm:pl-6"><span className="font-sans text-5xl font-semibold leading-none tracking-[-.08em] text-ink dark:text-cream md:text-6xl">{loading || error ? "—" : String(bookings.length).padStart(2, "0")}</span><span className="max-w-24 pb-1 text-[9px] font-bold uppercase leading-4 tracking-[.14em] text-muted dark:text-cream/50">{t("admin.navHistory")}</span></div>
      </header>

      <div className="mb-7 flex items-start gap-3 border-l-2 border-[#b49a65] py-1 pl-3.5 md:mb-9"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#b49a65]" /><p className="max-w-3xl text-[11px] leading-5 text-muted dark:text-cream/55">{t("admin.historyDemoNote")}</p></div>

      <section aria-labelledby="admin-booking-table-title">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3"><div><p className="mb-1.5 text-[9px] font-bold uppercase tracking-[.18em] text-muted dark:text-cream/45">{t("admin.historyEyebrow")}</p><h2 id="admin-booking-table-title" className="font-sans text-xl font-semibold tracking-[-.04em] text-ink dark:text-cream md:text-2xl">{t("admin.historyTitle")}</h2></div><span className="text-[10px] font-bold uppercase tracking-[.13em] text-emerald-soft dark:text-sage">{t("admin.demoBadge")}</span></div>
        {loading ? <div className="grid gap-3 border-y border-[#bbb7a9] py-5 dark:border-white/15" role="status" aria-label={t("admin.historyLoading")}><div className="h-14 animate-pulse bg-emerald/[.05] dark:bg-white/[.04]" /><div className="h-14 animate-pulse bg-emerald/[.05] dark:bg-white/[.04]" /></div>
          : error ? <div className="border-y border-[#bbb7a9] py-14 text-center dark:border-white/15" role="alert"><AlertTriangle size={18} className="mx-auto text-danger dark:text-red-300" /><h3 className="mt-3 text-sm font-bold text-ink dark:text-cream">{t("admin.historyErrorTitle")}</h3><p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-muted dark:text-cream/55">{t("admin.historyErrorCopy")}</p></div>
          : bookings.length === 0 ? <div className="grid min-h-52 place-items-center border-y border-[#bbb7a9] py-10 dark:border-white/15"><div className="max-w-sm text-center"><History size={20} className="mx-auto text-[#a88d56]" /><h3 className="mt-4 text-[15px] font-semibold tracking-[-.025em] text-ink dark:text-cream">{t("admin.noHistory")}</h3><p className="mt-2 text-xs leading-5 text-muted dark:text-cream/55">{t("admin.noHistoryCopy")}</p></div></div>
          : <>
            <div className="hidden grid-cols-[44px_minmax(130px,1fr)_minmax(140px,1.1fr)_minmax(100px,.8fr)_minmax(120px,1fr)_minmax(130px,1fr)_minmax(140px,1fr)] gap-4 border-y border-[#bbb7a9] bg-[#e9e7de] px-4 py-3 text-[9px] font-bold uppercase tracking-[.15em] text-[#647069] dark:border-white/15 dark:bg-white/[.04] dark:text-cream/50 lg:grid lg:px-5"><span>#</span>{[t("admin.bookingReference"),t("admin.customerName"),t("admin.court"),t("admin.bookingDate"),t("admin.bookingTime"),t("admin.bookingStatus")].map((label) => <span key={label}>{label}</span>)}</div>
            <div className="border-b border-[#bbb7a9] dark:border-white/15">
              {bookings.map((booking, index) => {
                const status = statusKey(booking);
                const start = Number(booking.startHour);
                const duration = Number(booking.duration);
                const validTime = booking.startHour !== null && booking.startHour !== undefined && Number.isFinite(start) && Number.isFinite(duration) && duration > 0;
                return <article key={booking.code || `${booking.date}-${booking.courtId}-${index}`} className="grid gap-x-4 gap-y-4 border-t border-[#d8d4c8] py-5 first:border-0 dark:border-white/10 sm:py-6 lg:grid-cols-[44px_minmax(130px,1fr)_minmax(140px,1.1fr)_minmax(100px,.8fr)_minmax(120px,1fr)_minmax(130px,1fr)_minmax(140px,1fr)] lg:items-center lg:gap-4 lg:px-4 lg:py-6 lg:transition-colors lg:hover:bg-emerald/[.025] lg:dark:hover:bg-white/[.025]">
                  <span className="hidden text-[10px] font-bold tabular-nums text-[#a88d56] lg:block">{String(index + 1).padStart(2, "0")}</span>
                  <DataCell label={t("admin.bookingReference")}><span className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[.015em] text-ink dark:text-cream"><ReceiptText size={14} className="shrink-0 text-[#a88d56]" />{booking.code || "—"}</span></DataCell>
                  <DataCell label={t("admin.customerName")}><span className="text-sm font-medium text-ink dark:text-cream">{booking.customer?.name?.trim() || t("admin.customerUnavailable")}</span></DataCell>
                  <DataCell label={t("admin.court")}><span className="text-sm text-ink/80 dark:text-cream/80">{courtName(booking.courtId)}</span></DataCell>
                  <DataCell label={t("admin.bookingDate")}><span className="text-sm text-ink/80 dark:text-cream/80">{dateLabel(booking.date)}</span></DataCell>
                  <DataCell label={t("admin.bookingTime")}><span className="text-sm font-semibold tabular-nums text-ink dark:text-cream">{validTime ? <>{timeLabel(start)}<span className="mx-1.5 text-[#a88d56]">—</span>{timeLabel(start + duration)}</> : "—"}</span></DataCell>
                  <DataCell label={t("admin.bookingStatus")}><StatusBadge status={status} label={t(`admin.${status}`)} /></DataCell>
                </article>;
              })}
            </div>
          </>}
      </section>
    </>
  );
}

function DataCell({ label, children }) {
  return <div className="flex min-w-0 items-baseline justify-between gap-3 lg:block"><span className="shrink-0 text-[9px] font-bold uppercase tracking-[.12em] text-muted dark:text-cream/45 lg:hidden">{label}</span><div className="min-w-0 text-right lg:text-left">{children}</div></div>;
}

function StatusBadge({ status, label }) {
  const styles = {
    paid: "text-emerald-soft dark:text-sage",
    pending: "text-[#806b37] dark:text-champagne",
    expired: "text-muted dark:text-cream/55",
    failed: "text-danger dark:text-red-300",
    unknownStatus: "text-muted dark:text-cream/55",
  };
  return <span className={`inline-flex min-h-7 items-center gap-2 text-[10px] font-bold ${styles[status]}`}><span className={`size-1.5 rounded-full ${status === "paid" ? "bg-[#789478] dark:bg-sage" : status === "failed" ? "bg-danger dark:bg-red-300" : status === "pending" ? "bg-[#b49a65]" : "bg-current opacity-60"}`} />{label}</span>;
}
