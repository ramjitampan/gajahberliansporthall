import { useParams } from "react-router-dom";
import { Button, PageHeading } from "../components/UI";
import { courts, hourlyRate, serviceFee } from "../data/bookingData";
import { useBooking } from "../hooks/useBooking";
import { localDate, rupiah, timeLabel, totalPrice } from "../utils/booking";
import { useTranslation } from "../i18n/I18nContext";

export default function ConfirmationPage() {
  const { t } = useTranslation();
  const { code } = useParams();
  const { booking: currentBooking, history, reset } = useBooking();
  const fromHistory = Boolean(code);
  const booking = fromHistory ? history.find((item) => item.code === code) : currentBooking;

  if (!booking || !booking.paid) {
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
  const rows = [
    [t("confirmationPage.customerName"), booking.customer?.name],
    [t("confirmationPage.court"), court?.name],
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
            <strong className="mt-1 block text-ink dark:text-cream">{booking.code}</strong>
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
            <dd className="font-semibold text-emerald dark:text-champagne">{rupiah(totalPrice(booking.duration))}</dd>
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
