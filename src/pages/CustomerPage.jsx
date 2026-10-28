import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingSummary, Button, Field, PageHeading } from "../components/UI";
import { useBooking } from "../hooks/useBooking";
import { useTranslation } from "../i18n/I18nContext";

const control = "w-full rounded-sm border border-[#c8c3b7] bg-[#fffefb] px-3.5 py-3 text-ink dark:border-white/15 dark:bg-[#182d25] dark:text-cream focus:outline-none focus:ring-2 focus:ring-champagne";
const card = "border border-line bg-paper p-5.5 md:p-8.5 dark:border-white/10 dark:bg-[#142620] dark:text-cream shadow-[0_8px_30px_rgba(0,0,0,0.03)]";

export default function CustomerPage() {
  const { t } = useTranslation();
  const { booking, update, ensureCode } = useBooking();
  const navigate = useNavigate();
  const [form, setForm] = useState(booking.customer);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const change = (e) => {
    const next = { ...form, [e.target.name]: e.target.value };
    setForm(next);
    update({ customer: next });
  };

  const submit = (e) => {
    e.preventDefault();
    if (busy) return;
    const next = {};
    if (form.name.trim().length < 3) next.name = t("customerPage.errName");
    if (!/^(?:\+62|62|0)8[1-9][0-9]{6,11}$/.test(form.phone.replace(/[\s-]/g, ""))) {
      next.phone = t("customerPage.errPhone");
    }
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = t("customerPage.errEmail");
    }
    setErrors(next);
    if (Object.keys(next).length) return;
    setBusy(true);
    ensureCode();
    setTimeout(() => navigate("/booking/pembayaran"), 500);
  };

  if (!booking.date || booking.startHour === null) {
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

  return (
    <div className="mx-auto w-[calc(100%-32px)] py-14 md:w-[min(1180px,calc(100%-48px))] md:py-20">
      <PageHeading
        eyebrow={t("customerPage.stepLabel")}
        title={t("customerPage.title")}
        copy={t("customerPage.copy")}
      />

      <div className="grid items-start gap-7 lg:grid-cols-[1.4fr_.65fr]">
        <form className={card} onSubmit={submit} noValidate>
          <Field label={t("customerPage.nameLabel")} error={errors.name}>
            <input
              className={control}
              autoFocus
              autoComplete="name"
              name="name"
              value={form.name}
              onChange={change}
              placeholder={t("customerPage.namePlaceholder")}
            />
          </Field>

          <Field label={t("customerPage.phoneLabel")} error={errors.phone}>
            <input
              className={control}
              inputMode="tel"
              autoComplete="tel"
              name="phone"
              value={form.phone}
              onChange={change}
              placeholder={t("customerPage.phonePlaceholder")}
            />
          </Field>

          <Field label={t("customerPage.emailLabel")} optional error={errors.email}>
            <input
              className={control}
              type="email"
              name="email"
              value={form.email}
              onChange={change}
              placeholder={t("customerPage.emailPlaceholder")}
            />
          </Field>

          <p className="border-l-2 border-champagne pl-3.5 text-xs leading-6 text-muted dark:text-cream/70">
            {t("customerPage.storageNote")}
          </p>

          <div className="mt-7.5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button to="/booking" variant="ghost">
              {t("customerPage.back")}
            </Button>
            <Button type="submit" disabled={busy}>
              {busy ? t("customerPage.preparing") : t("customerPage.nextPayment")}
            </Button>
          </div>
        </form>

        <BookingSummary booking={booking} />
      </div>
    </div>
  );
}
