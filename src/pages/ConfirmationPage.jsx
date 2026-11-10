import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, PageHeading } from "../components/UI";
import { courts, hourlyRate, serviceFee } from "../data/bookingData";
import { useBooking } from "../hooks/useBooking";
import { localDate, rupiah, timeLabel, totalPrice } from "../utils/booking";
import { useTranslation } from "../i18n/I18nContext";
import { apiClient } from "../services/apiClient";

export default function ConfirmationPage() {
  const { t } = useTranslation();
  const { code } = useParams();
  const { booking: currentBooking, history, reset } = useBooking();
  const fromHistory = Boolean(code);

  const [remoteBooking, setRemoteBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  // If code is in URL, attempt to find in local history first, otherwise query API
  useEffect(() => {
    if (code) {
      const local = history.find((item) => item.code === code);
      if (!local) {
        setLoading(true);
        apiClient
          .getBooking(code)
          .then((data) => {
            if (data) {
              setRemoteBooking({
                code: data.bookingCode,
                courtId: data.courtId,
                courtName: data.courtName,
                date: data.date,
                startHour: data.startHour,
                duration: data.duration,
                totalAmount: data.totalAmount,
                paid: data.status === "CONFIRMED" || data.status === "COMPLETED",
                status: data.status,
                customer: { name: data.notes || "Pemesan" },
              });
            }
          })
          .catch((err) => {
            console.warn("Could not fetch booking from API:", err);
          })
          .finally(() => setLoading(false));
      }
    }
  }, [code, history]);

  const booking = fromHistory
    ? history.find((item) => item.code === code) || remoteBooking
    : currentBooking;

  if (loading) {
    return (
      <div className="mx-auto w-[min(700px,calc(100%-48px))] py-[15vh] text-center">
        <div className="mx-auto size-8 animate-spin rounded-full border-2 border-emerald border-t-transparent dark:border-sage" />
        <p className="mt-4 text-xs font-semibold text-muted dark:text-cream/60">Memuat Tanda Bukti Pemesanan...</p>
      </div>
    );
  }

  if (!booking || (!booking.paid && booking.status !== "CONFIRMED")) {
    return (
      <div className="mx-auto w-[min(700px,calc(100%-48px))] py-[15vh] text-center">
        <PageHeading
          eyebrow={t("confirmationPage.notFoundEyebrow")}
          title={t("confirmationPage.notFoundTitle")}
          copy={t("confirmationPage.notFoundCopy")}
        />
        <Button to="/booking/riwayat">{t("confirmationPage.btnBackHistory")}</Button>
      </div>
    );
  }

  const court = courts.find((item) => item.id === booking.courtId);
  const courtDisplayName = booking.courtName || court?.name || "Lapangan";
  const rows = [
    [t("confirmationPage.customerName"), booking.customer?.name || "Pelanggan"],
    [t("confirmationPage.court"), courtDisplayName],
    [t("confirmationPage.date"), localDate(booking.date)],
    [
      t("confirmationPage.time"),
      `${timeLabel(booking.startHour)}–${timeLabel(booking.startHour + Number(booking.duration))}`,
    ],
    [t("confirmationPage.duration"), `${booking.duration} ${t("pricingPage.hours")}`],
  ];

  return (
    <div className="mx-auto w-[calc(100%-32px)] py-14 text-center md:w-[min(1180px,calc(100%-48px))] md:py-20">
      <div className="no-print mx-auto mb-7 grid size-17.5 place-items-center rounded-full bg-emerald text-3xl text-white dark:bg-sage dark:text-[#102a22]">
        ✓
      </div>
      <div className="no-print [&>header]:mx-auto">
        <PageHeading
          eyebrow={t("confirmationPage.eyebrow")}
          title={t("confirmationPage.title")}
          copy={t("confirmationPage.copy")}
        />
      </div>

      <article className="print-receipt mx-auto w-full max-w-150 border border-line bg-paper p-5.5 text-left shadow-[6px_6px_0_#ded5c4] dark:border-white/15 dark:bg-[#142620] dark:text-cream dark:shadow-[6px_6px_0_#183429] md:p-8 md:shadow-[12px_12px_0_#ded5c4] md:dark:shadow-[12px_12px_0_#183429]">
        <div className="flex items-start justify-between border-b-2 border-ink pb-6 dark:border-white/20">
          <span className="text-lg font-extrabold text-ink dark:text-cream">GajahBerlianSportsHall</span>
          <div className="text-right">
            <small className="block text-[10px] text-muted dark:text-cream/60">{t("paymentPage.bookingCode")}</small>
            <strong className="mt-1 block font-mono text-ink dark:text-cream">{booking.code}</strong>
          </div>
        </div>

        <dl className="my-6">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 border-b border-line dark:border-white/10 py-3 text-[13px]">
              <dt className="text-muted dark:text-cream/65">{label}</dt>
              <dd className="font-semibold text-ink dark:text-cream">{value}</dd>
            </div>
          ))}
          <div className="flex justify-between gap-4 border-b border-line dark:border-white/10 py-3 text-[13px]">
            <dt className="text-muted dark:text-cream/65">{t("confirmationPage.courtRent")}</dt>
            <dd className="font-semibold text-ink dark:text-cream">{rupiah(hourlyRate * Number(booking.duration))}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-line dark:border-white/10 py-3 text-[13px]">
            <dt className="text-muted dark:text-cream/65">{t("confirmationPage.serviceFee")}</dt>
            <dd className="font-semibold text-ink dark:text-cream">{rupiah(serviceFee)}</dd>
          </div>
          <div className="mt-4 flex justify-between border-t-2 border-ink dark:border-white/20 py-3 text-[17px]">
            <dt className="font-bold text-ink dark:text-cream">{t("confirmationPage.total")}</dt>
            <dd className="font-semibold text-emerald dark:text-champagne">{rupiah(booking.totalAmount || totalPrice(booking.duration))}</dd>
          </div>
        </dl>
        <p className="text-center text-[10px] uppercase tracking-[.1em] text-muted dark:text-cream/60">
          {t("confirmationPage.qrisPaidTag")}
        </p>
      </article>

      <div className="no-print mt-11 flex flex-col justify-center gap-3 sm:flex-row">
        <Button onClick={() => window.print()}>{t("confirmationPage.btnPrint")}</Button>
        {fromHistory ? (
          <Button to="/booking/riwayat" variant="secondary">
            {t("confirmationPage.btnBackHistory")}
          </Button>
        ) : (
          <>
            <Button to="/booking/riwayat" variant="secondary">
              {t("confirmationPage.btnHistory")}
            </Button>
            <Button to="/" variant="ghost" onClick={reset}>
              {t("confirmationPage.btnBackHome")}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
