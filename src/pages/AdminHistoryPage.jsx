import { useState, useMemo } from "react";
import { AlertTriangle, History, ReceiptText, Search, Filter } from "lucide-react";
import { courts } from "../data/bookingData";
import { useBooking } from "../hooks/useBooking";
import { useTranslation } from "../i18n/I18nContext";
import { timeLabel, rupiah, totalPrice } from "../utils/booking";

const statusKey = (booking) => {
  if (booking.paid || booking.paymentStatus === "paid" || booking.status === "CONFIRMED" || booking.status === "COMPLETED") return "paid";
  if (["expired", "failed", "EXPIRED", "CANCELLED"].includes(booking.paymentStatus || booking.status)) return "expired";
  if (booking.paymentStatus === "pending" || booking.status === "PENDING_PAYMENT") return "pending";
  return "unknownStatus";
};

export default function AdminHistoryPage() {
  const { t, lang } = useTranslation();
  const { history } = useBooking();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const rawBookings = Array.isArray(history) ? history : [];

  const filteredBookings = useMemo(() => {
    return rawBookings.filter((b) => {
      const codeMatch = (b.code || b.bookingCode || "").toLowerCase().includes(searchQuery.toLowerCase());
      const nameMatch = (b.customer?.name || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSearch = !searchQuery || codeMatch || nameMatch;

      const currentStatus = statusKey(b);
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "paid" && currentStatus === "paid") ||
        (statusFilter === "pending" && currentStatus === "pending") ||
        (statusFilter === "expired" && (currentStatus === "expired" || currentStatus === "failed"));

      return matchesSearch && matchesStatus;
    });
  }, [rawBookings, searchQuery, statusFilter]);

  const courtName = (id) => {
    const court = courts.find((item) => item.id === id);
    return court ? court.name : t("admin.unknownCourt");
  };

  const dateLabel = (value) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return "—";
    const date = new Date(`${value}T12:00:00`);
    return Number.isNaN(date.getTime())
      ? "—"
      : new Intl.DateTimeFormat(lang === "en" ? "en-US" : "id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }).format(date);
  };

  return (
    <>
      <header className="mb-8 grid gap-5 border-b border-[#cfcabd] pb-7 dark:border-white/15 sm:grid-cols-[1fr_auto] sm:items-end md:mb-10 md:pb-9">
        <div>
          <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-emerald-soft dark:text-sage">
            <span className="text-[#a88d56]">02</span>
            <span className="h-px w-7 bg-[#a88d56]/70" />
            {t("admin.historyEyebrow")}
          </p>
          <h1 className="font-sans text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[.93] tracking-[-.07em] text-ink dark:text-cream">
            {t("admin.historyTitle")}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted dark:text-cream/60 md:text-[15px]">
            {t("admin.historyCopy")}
          </p>
        </div>
        <div className="flex items-end gap-3 border-l border-[#cfcabd] pl-4 dark:border-white/15 sm:mb-1 sm:pl-6">
          <span className="font-sans text-5xl font-semibold leading-none tracking-[-.08em] text-ink dark:text-cream md:text-6xl">
            {String(filteredBookings.length).padStart(2, "0")}
          </span>
          <span className="max-w-24 pb-1 text-[9px] font-bold uppercase leading-4 tracking-[.14em] text-muted dark:text-cream/50">
            {t("admin.navHistory")}
          </span>
        </div>
      </header>

      {/* SEARCH AND FILTERS */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="relative min-w-[260px] flex-1 sm:max-w-xs">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted dark:text-cream/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kode atau nama..."
            className="min-h-10 w-full border border-[#cfcabd] bg-paper pl-10 pr-3 text-xs text-ink outline-none transition focus:border-emerald dark:border-white/15 dark:bg-[#12211b] dark:text-cream dark:focus:border-sage"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "all", label: "Semua" },
            { id: "paid", label: "Terkonfirmasi" },
            { id: "pending", label: "Menunggu" },
            { id: "expired", label: "Batal / Kadaluarsa" },
          ].map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setStatusFilter(filter.id)}
              className={`min-h-9 px-3 text-xs font-bold transition ${
                statusFilter === filter.id
                  ? "bg-[#123d32] text-white dark:bg-sage dark:text-[#102a22]"
                  : "border border-line bg-paper text-muted hover:border-emerald/40 dark:border-white/10 dark:bg-[#12211b] dark:text-cream/70"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <section aria-labelledby="admin-booking-table-title">
        {filteredBookings.length === 0 ? (
          <div className="grid min-h-52 place-items-center border-y border-[#bbb7a9] py-10 dark:border-white/15">
            <div className="max-w-sm text-center">
              <History size={20} className="mx-auto text-[#a88d56]" />
              <h3 className="mt-4 text-[15px] font-semibold tracking-[-.025em] text-ink dark:text-cream">
                {t("admin.noHistory")}
              </h3>
              <p className="mt-2 text-xs leading-5 text-muted dark:text-cream/55">{t("admin.noHistoryCopy")}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="hidden grid-cols-[44px_minmax(130px,1fr)_minmax(140px,1.1fr)_minmax(100px,.8fr)_minmax(120px,1fr)_minmax(130px,1fr)_minmax(140px,1fr)] gap-4 border-y border-[#bbb7a9] bg-[#e9e7de] px-4 py-3 text-[9px] font-bold uppercase tracking-[.15em] text-[#647069] dark:border-white/15 dark:bg-white/[.04] dark:text-cream/50 lg:grid lg:px-5">
              <span>#</span>
              {[
                t("admin.bookingReference"),
                t("admin.customerName"),
                t("admin.court"),
                t("admin.bookingDate"),
                t("admin.bookingTime"),
                t("admin.bookingStatus"),
              ].map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
            <div className="border-b border-[#bbb7a9] dark:border-white/15">
              {filteredBookings.map((booking, index) => {
                const status = statusKey(booking);
                const start = Number(booking.startHour);
                const duration = Number(booking.duration);
                const validTime =
                  booking.startHour !== null &&
                  booking.startHour !== undefined &&
                  Number.isFinite(start) &&
                  Number.isFinite(duration) &&
                  duration > 0;
                const code = booking.code || booking.bookingCode || "—";

                return (
                  <article
                    key={code || `${booking.date}-${booking.courtId}-${index}`}
                    className="grid gap-x-4 gap-y-4 border-t border-[#d8d4c8] py-5 first:border-0 dark:border-white/10 sm:py-6 lg:grid-cols-[44px_minmax(130px,1fr)_minmax(140px,1.1fr)_minmax(100px,.8fr)_minmax(120px,1fr)_minmax(130px,1fr)_minmax(140px,1fr)] lg:items-center lg:gap-4 lg:px-4 lg:py-6 lg:transition-colors lg:hover:bg-emerald/[.025] lg:dark:hover:bg-white/[.025]"
                  >
                    <span className="hidden text-[10px] font-bold tabular-nums text-[#a88d56] lg:block">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <DataCell label={t("admin.bookingReference")}>
                      <span className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[.015em] text-ink dark:text-cream">
                        <ReceiptText size={14} className="shrink-0 text-[#a88d56]" />
                        {code}
                      </span>
                    </DataCell>
                    <DataCell label={t("admin.customerName")}>
                      <span className="text-sm font-medium text-ink dark:text-cream">
                        {booking.customer?.name?.trim() || "Pelanggan"}
                      </span>
                    </DataCell>
                    <DataCell label={t("admin.court")}>
                      <span className="text-sm text-ink/80 dark:text-cream/80">
                        {booking.courtName || courtName(booking.courtId)}
                      </span>
                    </DataCell>
                    <DataCell label={t("admin.bookingDate")}>
                      <span className="text-sm text-ink/80 dark:text-cream/80">{dateLabel(booking.date)}</span>
                    </DataCell>
                    <DataCell label={t("admin.bookingTime")}>
                      <span className="text-sm font-semibold tabular-nums text-ink dark:text-cream">
                        {validTime ? (
                          <>
                            {timeLabel(start)}
                            <span className="mx-1.5 text-[#a88d56]">—</span>
                            {timeLabel(start + duration)}
                          </>
                        ) : (
                          "—"
                        )}
                      </span>
                    </DataCell>
                    <DataCell label={t("admin.bookingStatus")}>
                      <StatusBadge status={status} label={t(`admin.${status}`)} />
                    </DataCell>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </section>
    </>
  );
}

function DataCell({ label, children }) {
  return (
    <div className="flex min-w-0 items-baseline justify-between gap-3 lg:block">
      <span className="shrink-0 text-[9px] font-bold uppercase tracking-[.12em] text-muted dark:text-cream/45 lg:hidden">
        {label}
      </span>
      <div className="min-w-0 text-right lg:text-left">{children}</div>
    </div>
  );
}

function StatusBadge({ status, label }) {
  const styles = {
    paid: "text-emerald-soft dark:text-sage",
    pending: "text-[#806b37] dark:text-champagne",
    expired: "text-muted dark:text-cream/55",
    failed: "text-danger dark:text-red-300",
    unknownStatus: "text-muted dark:text-cream/55",
  };
  return (
    <span className={`inline-flex min-h-7 items-center gap-2 text-[10px] font-bold ${styles[status]}`}>
      <span
        className={`size-1.5 rounded-full ${
          status === "paid"
            ? "bg-[#789478] dark:bg-sage"
            : status === "failed"
            ? "bg-danger dark:bg-red-300"
            : status === "pending"
            ? "bg-[#b49a65]"
            : "bg-current opacity-60"
        }`}
      />
      {label}
    </span>
  );
}
