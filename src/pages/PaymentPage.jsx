import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingSummary, Button, PageHeading, StateBox } from "../components/UI";
import { useBooking } from "../hooks/useBooking";
import { paymentService } from "../services/paymentService";
import { rupiah, totalPrice } from "../utils/booking";
import { useTranslation } from "../i18n/I18nContext";

export default function PaymentPage() {
  const { t } = useTranslation();
  const { booking, update, ensureCode, completeBooking } = useBooking();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (booking.customer.name) ensureCode();
  }, []);

  if (!booking.customer.name || !booking.date || booking.startHour === null) {
    return (
      <div className="mx-auto w-[min(700px,calc(100%-48px))] py-[15vh] text-center">
        <PageHeading
          eyebrow={t("customerPage.incompleteEyebrow")}
          title={t("customerPage.incompleteTitle")}
        />
        <Button to="/booking">{t("customerPage.incompleteButton")}</Button>
      </div>
    );
  }

  const simulate = async (status) => {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const result = await paymentService.simulate(status);
      if (status === "success") {
        completeBooking(result?.paidAt);
        navigate("/booking/konfirmasi");
      } else {
        update({ paid: false, paymentStatus: status });
        setError(status === "expired" ? t("paymentPage.errExpired") : t("paymentPage.errFailed"));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const checkStatus = async () => {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const result = await paymentService.checkStatus();
      update({ paymentStatus: result.status, paid: false });
      setError(t("paymentPage.errPendingCheck"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto w-[calc(100%-32px)] py-14 md:w-[min(1180px,calc(100%-48px))] md:py-20">
      <PageHeading
        eyebrow={t("paymentPage.stepLabel")}
        title={t("paymentPage.title")}
        copy={t("paymentPage.copy")}
      />

      <div className="grid items-start gap-7 lg:grid-cols-[1.4fr_.65fr]">
        <section className="flex flex-col items-center border border-line bg-paper p-5.5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:border-white/10 dark:bg-[#142620] dark:text-cream md:p-8.5">
          <div className="self-start rounded-sm bg-[#fff4d8] px-3 py-2 text-[11px] font-bold uppercase tracking-[.08em] text-[#795e24] dark:bg-[#342711] dark:text-champagne">
            <i className="mr-1.5 inline-block size-1.5 rounded-full bg-[#c28d24]" />
            {booking.paymentStatus === "expired"
              ? t("paymentPage.statusExpired")
              : booking.paymentStatus === "failed"
              ? t("paymentPage.statusFailed")
              : t("paymentPage.statusPending")}
          </div>

          <div className="my-6 flex w-full justify-between text-xs text-muted dark:text-cream/70">
            <span>{t("paymentPage.bookingCode")}</span>
            <strong className="tracking-[.08em] text-ink dark:text-cream">{booking.code}</strong>
          </div>

          <div className="mb-7 w-full border-y border-line dark:border-white/10 py-5 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[.16em] text-muted dark:text-cream/60">
              {t("paymentPage.totalPayment")}
            </span>
            <strong className="mt-2 block font-display text-4xl text-emerald dark:text-champagne">
              {rupiah(totalPrice(booking.duration))}
            </strong>
          </div>

          {/* QRIS demo box stays high-contrast white card for real QR aesthetic */}
          <div className="w-70 max-w-full rounded-sm border border-[#bbb] dark:border-white/20 bg-white p-4.5 text-center text-ink shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <b className="text-xl italic text-ink">QRIS</b>
              <span className="bg-ink px-1.5 py-0.5 text-[9px] text-white">DEMO</span>
            </div>
            <div className="grid aspect-square grid-cols-9 gap-0.5 border-2 border-ink bg-white p-1">
              {Array.from({ length: 81 }, (_, i) => (
                <i
                  key={i}
                  className={
                    (i * 7 + i * i) % 5 < 2 ||
                    [0, 1, 2, 9, 10, 11, 18, 19, 20, 6, 7, 8, 15, 16, 17, 24, 25, 26].includes(i)
                      ? "bg-ink"
                      : "bg-white"
                  }
                />
              ))}
            </div>
            <b className="mt-3 block text-ink">GajahBerlianSportsHall</b>
            <small className="text-muted">{t("paymentPage.qrisNote")}</small>
          </div>

          <ol className="my-7 self-stretch pl-7 text-[13px] leading-7 text-muted dark:text-cream/70 list-decimal">
            <li>{t("paymentPage.step1")}</li>
            <li>{t("paymentPage.step2")}</li>
            <li>{t("paymentPage.step3")}</li>
          </ol>

          {error && (
            <div className="mb-4 w-full">
              <StateBox type="error">{error}</StateBox>
            </div>
          )}

          <div className="grid w-full gap-2.5">
            <Button disabled={busy} variant="secondary" onClick={checkStatus}>
              {t("paymentPage.btnCheckStatus")}
            </Button>
            <Button disabled={busy} onClick={() => simulate("success")}>
              {busy ? t("customerPage.preparing") : t("paymentPage.btnSimulateSuccess")}
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button disabled={busy} variant="danger" onClick={() => simulate("failed")}>
                {t("paymentPage.btnSimulateFailed")}
              </Button>
              <Button disabled={busy} variant="secondary" onClick={() => simulate("expired")}>
                {t("paymentPage.btnSimulateExpired")}
              </Button>
            </div>
            <Button to="/booking/data-pemesan" variant="ghost">
              {t("paymentPage.back")}
            </Button>
          </div>
        </section>

        <BookingSummary booking={booking} />
      </div>
    </div>
  );
}
