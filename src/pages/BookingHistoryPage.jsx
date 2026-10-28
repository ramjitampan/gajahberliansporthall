import { ArrowUpRight, Clock3, ReceiptText } from "lucide-react";
import { Button, PageHeading, StateBox } from "../components/UI";
import { courts } from "../data/bookingData";
import { useBooking } from "../hooks/useBooking";
import { localDate, rupiah, timeLabel, totalPrice } from "../utils/booking";
import { useTranslation } from "../i18n/I18nContext";

export default function BookingHistoryPage() {
  const { t } = useTranslation();
  const { history } = useBooking();
  const completedBookings = history.filter((booking) => booking.paid);

  return (
    <main className="mx-auto min-h-[70vh] w-[calc(100%-32px)] py-14 md:w-[min(1060px,calc(100%-48px))] md:py-20">
      <PageHeading
        eyebrow={t("historyPage.eyebrow")}
        title={t("historyPage.title")}
        copy={t("historyPage.copy")}
      />

      <div className="mb-7 flex items-start gap-3 border border-[#d8d0c0] bg-[#f7f3ea] dark:border-white/10 dark:bg-[#142620] p-4 text-sm leading-6 text-[#5e655f] dark:text-cream/70">
        <Clock3 size={17} className="mt-1 shrink-0 text-emerald dark:text-sage" />
        <p>{t("historyPage.storageNote")}</p>
      </div>

      {completedBookings.length === 0 ? (
        <div className="border border-line bg-paper dark:border-white/10 dark:bg-[#142620] px-5 py-12 text-center md:px-10">
          <StateBox type="empty">{t("historyPage.empty")}</StateBox>
          <Button to="/booking" className="mt-6">
            {t("historyPage.startBooking")}
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {completedBookings.map((booking) => {
            const court = courts.find((item) => item.id === booking.courtId);
            const endHour = Number(booking.startHour) + Number(booking.duration);
            return (
              <article
                key={booking.code}
                className="grid gap-5 border border-line bg-paper p-5 shadow-[0_8px_24px_rgba(40,45,35,.04)] dark:border-white/10 dark:bg-[#142620] dark:text-cream md:grid-cols-[1fr_auto] md:items-center md:p-7"
              >
                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#e8f0e9] dark:bg-[#1b362a] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.1em] text-emerald dark:text-sage">
                      <span className="size-1.5 rounded-full bg-emerald dark:bg-sage" />{" "}
                      {t("historyPage.statusPaid")}
                    </span>
                    <span className="text-xs font-bold tracking-[.08em] text-[#5e655f] dark:text-cream/60">
                      {booking.code}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold tracking-tight text-ink dark:text-cream">
                    {court?.name || "Lapangan"}{" "}
                    <span className="px-1 text-muted dark:text-cream/50">·</span>{" "}
                    {localDate(booking.date)}
                  </h2>
                  <p className="mt-2 text-sm text-muted dark:text-cream/70">
                    {timeLabel(booking.startHour)}–{timeLabel(endHour)}{" "}
                    <span className="px-1">·</span> {booking.duration} {t("historyPage.durationUnit")}{" "}
                    <span className="px-1">·</span> {booking.customer?.name}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-emerald dark:text-champagne">
                    Total {rupiah(totalPrice(booking.duration))}
                  </p>
                </div>
                <Button
                  to={`/booking/riwayat/${encodeURIComponent(booking.code)}`}
                  variant="secondary"
                  className="gap-2"
                >
                  <ReceiptText size={16} /> {t("historyPage.viewReceipt")} <ArrowUpRight size={14} />
                </Button>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
