import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingSummary, Button, Field, PageHeading, StateBox } from "../components/UI";
import { courts, durations, hours } from "../data/bookingData";
import { useBooking } from "../hooks/useBooking";
import { isSlotAvailable, timeLabel, today } from "../utils/booking";
import { useTranslation } from "../i18n/I18nContext";

const control = "w-full rounded-sm border border-[#c8c3b7] bg-[#fffefb] px-3.5 py-3 text-ink dark:border-white/15 dark:bg-[#182d25] dark:text-cream focus:outline-none focus:ring-2 focus:ring-champagne";
const card = "border border-line bg-paper p-5.5 md:p-8.5 dark:border-white/10 dark:bg-[#142620] dark:text-cream shadow-[0_8px_30px_rgba(0,0,0,0.03)]";

export default function BookingPage() {
  const { t } = useTranslation();
  const { booking, update } = useBooking();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(id);
  }, []);

  const availableCount = useMemo(
    () => hours.filter((hour) => isSlotAvailable(booking.courtId, hour, booking.duration)).length,
    [booking.courtId, booking.duration],
  );

  const canContinue = Boolean(
    booking.date && booking.startHour !== null && isSlotAvailable(booking.courtId, booking.startHour, booking.duration),
  );

  const proceed = () => {
    if (!canContinue) return setError(t("bookingPage.validationSelect"));
    navigate("/booking/data-pemesan");
  };

  return (
    <div className="mx-auto w-[calc(100%-32px)] py-14 md:w-[min(1180px,calc(100%-48px))] md:py-20">
      <PageHeading
        eyebrow={t("bookingPage.stepLabel")}
        title={t("bookingPage.title")}
        copy={t("bookingPage.copy")}
      />

      <div className="grid items-start gap-7 lg:grid-cols-[1.4fr_.65fr]">
        <section className={card}>
          <div className="grid gap-4.5 sm:grid-cols-2">
            <Field label={t("bookingPage.dateLabel")}>
              <input
                className={control}
                type="date"
                min={today()}
                value={booking.date}
                onChange={(event) => update({ date: event.target.value, startHour: null })}
              />
            </Field>

            <Field label={t("bookingPage.durationLabel")}>
              <select
                className={control}
                value={booking.duration}
                onChange={(event) => update({ duration: Number(event.target.value), startHour: null })}
              >
                {durations.map((duration) => (
                  <option key={duration} value={duration} className="bg-white text-ink dark:bg-[#182d25] dark:text-cream">
                    {duration} {t("bookingPage.hoursUnit")}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <fieldset className="mb-7.5">
            <legend className="mb-3.5 text-[13px] font-bold text-ink dark:text-cream">
              {t("bookingPage.courtSelect")}
            </legend>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {courts.map((court) => (
                <button
                  key={court.id}
                  type="button"
                  aria-pressed={booking.courtId === court.id}
                  className={`p-3.5 text-left transition-colors duration-150 focus-visible:outline-3 focus-visible:outline-champagne ${
                    booking.courtId === court.id
                      ? "border-2 border-emerald bg-[#edf3ef] dark:border-sage dark:bg-[#1a382c]"
                      : "border border-line bg-[#fffefb] hover:border-emerald dark:border-white/10 dark:bg-[#182d25] dark:hover:border-sage"
                  }`}
                  onClick={() => update({ courtId: court.id, startHour: null })}
                >
                  <span className="block text-[13px] font-bold text-ink dark:text-cream">{court.name}</span>
                  <small className="mt-1 block text-[10px] text-muted dark:text-cream/60">{court.note}</small>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3.5 w-full text-[13px] font-bold text-ink dark:text-cream">
              {t("bookingPage.startHour")}{" "}
              <span className="mt-2 block text-[11px] font-normal text-muted dark:text-cream/60 sm:float-right sm:mt-0">
                <i className="mr-1.5 inline-block size-1.5 rounded-full bg-emerald-soft dark:bg-sage" />{" "}
                {t("bookingPage.statusAvailable")}{" "}
                <i className="mr-1.5 ml-3 inline-block size-1.5 rounded-full bg-[#bbb9b1] dark:bg-white/30" />{" "}
                {t("bookingPage.statusBooked")}
              </span>
            </legend>

            {loading ? (
              <StateBox>{t("bookingPage.checking")}</StateBox>
            ) : availableCount === 0 ? (
              <StateBox type="empty">{t("bookingPage.noSlots")}</StateBox>
            ) : (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                {hours.map((hour) => {
                  const available = isSlotAvailable(booking.courtId, hour, booking.duration);
                  const selected = booking.startHour === hour;
                  return (
                    <button
                      type="button"
                      key={hour}
                      disabled={!available}
                      aria-pressed={selected}
                      className={`p-3.5 text-left transition focus-visible:outline-3 focus-visible:outline-champagne ${
                        !available
                          ? "border border-line bg-[#eeeae2] text-[#8e8a82] line-through dark:border-white/5 dark:bg-[#101b16] dark:text-white/30"
                          : selected
                          ? "border-2 border-emerald bg-[#edf3ef] dark:border-sage dark:bg-[#1a382c] dark:text-cream"
                          : "border border-line bg-[#fffefb] hover:border-emerald dark:border-white/10 dark:bg-[#182d25] dark:text-cream dark:hover:border-sage"
                      }`}
                      onClick={() => {
                        update({ startHour: hour });
                        setError("");
                      }}
                    >
                      <b className="block">{timeLabel(hour)}</b>
                      <span className="mt-1 block text-[10px]">
                        {!available
                          ? t("bookingPage.badgeBooked")
                          : selected
                          ? t("bookingPage.badgeSelected")
                          : t("bookingPage.badgeAvailable")}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </fieldset>

          {error && (
            <div className="mt-5">
              <StateBox type="error">{error}</StateBox>
            </div>
          )}

          <div className="mt-7.5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button to="/" variant="ghost">
              {t("bookingPage.backHome")}
            </Button>
            <Button disabled={loading || !canContinue} onClick={proceed}>
              {t("bookingPage.nextCustomer")}
            </Button>
          </div>
        </section>

        <BookingSummary booking={booking} />
      </div>
    </div>
  );
}
