import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, CalendarDays, Check, Plus, Trash2, X, Activity, DollarSign, BookmarkCheck, Clock, Shield } from "lucide-react";
import { courts as fallbackCourts, openingHour, closingHour } from "../data/bookingData";
import { createDemoSchedules } from "../data/adminDemoSchedules";
import { useTranslation } from "../i18n/I18nContext";
import { apiClient } from "../services/apiClient";
import { rupiah } from "../utils/booking";

const blankForm = { courtId: "", date: "", startTime: "08:00", endTime: "10:00", reason: "Perawatan rutin lapangan" };

const isValidDate = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
};

const toMinutes = (value) => {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) return null;
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
};

export default function AdminDashboardPage() {
  const { t, lang } = useTranslation();
  const tr = (key, params = {}) =>
    Object.entries(params).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, String(value)), t(`admin.${key}`));
  const reduceMotion = useReducedMotion();

  // Metrics from Backend
  const [metrics, setMetrics] = useState(null);
  const [metricsLoading, setMetricsLoading] = useState(true);

  // Courts from Backend
  const [courtsList, setCourtsList] = useState(fallbackCourts);

  // Schedules / Maintenance Blocks
  const [schedules, setSchedules] = useState(createDemoSchedules);
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch metrics & courts from BE
  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        const [statsData, courtsData] = await Promise.allSettled([
          apiClient.getAdminMetrics(),
          apiClient.getCourts(),
        ]);

        if (mounted) {
          if (statsData.status === "fulfilled" && statsData.value) {
            setMetrics(statsData.value);
          }
          if (courtsData.status === "fulfilled" && Array.isArray(courtsData.value) && courtsData.value.length > 0) {
            setCourtsList(courtsData.value);
            setForm((prev) => ({ ...prev, courtId: courtsData.value[0].id }));
          } else {
            setForm((prev) => ({ ...prev, courtId: fallbackCourts[0].id }));
          }
        }
      } catch (e) {
        console.warn("Failed to load admin metrics:", e);
      } finally {
        if (mounted) setMetricsLoading(false);
      }
    }

    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isOpen && !deleteTarget) return undefined;
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      if (deleteTarget) setDeleteTarget(null);
      else closeForm();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, deleteTarget]);

  const sortedSchedules = useMemo(
    () =>
      Array.isArray(schedules)
        ? [...schedules].sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`))
        : [],
    [schedules]
  );
  const scheduleCount = Array.isArray(schedules) ? schedules.length : 0;

  const courtName = (id) => {
    const court = courtsList.find((c) => c.id === id);
    if (court) return court.name;
    const fallback = fallbackCourts.find((c) => c.id === id);
    return fallback ? fallback.name : t("admin.unknownCourt");
  };

  const updateForm = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "", form: "" }));
  };

  const closeForm = () => {
    setIsOpen(false);
    setErrors({});
    setForm({
      courtId: courtsList[0]?.id || "",
      date: "",
      startTime: "08:00",
      endTime: "10:00",
      reason: "Perawatan rutin lapangan",
    });
  };

  function validate() {
    const next = {};
    if (!form.courtId) next.courtId = t("admin.required");
    if (!form.date) next.date = t("admin.required");
    else if (!isValidDate(form.date) || form.date < localToday()) next.date = t("admin.invalidDate");

    const start = toMinutes(form.startTime);
    const end = toMinutes(form.endTime);
    if (!form.startTime) next.startTime = t("admin.required");
    else if (start === null) next.startTime = t("admin.invalidTime");
    else if (start < openingHour * 60 || start >= closingHour * 60)
      next.startTime = tr("openingHours", { open: openingHour, close: closingHour });

    if (!form.endTime) next.endTime = t("admin.required");
    else if (end === null) next.endTime = t("admin.invalidTime");
    else if (end > closingHour * 60 || end <= openingHour * 60)
      next.endTime = tr("openingHours", { open: openingHour, close: closingHour });

    if (start !== null && end !== null && end <= start) next.endTime = t("admin.endAfterStart");

    if (start !== null && end !== null && end > start && isValidDate(form.date)) {
      const overlaps = schedules.some(
        (item) =>
          item.courtId === form.courtId &&
          item.date === form.date &&
          start < toMinutes(item.endTime) &&
          end > toMinutes(item.startTime)
      );
      if (overlaps) next.form = t("admin.slotOverlap");
    }
    return next;
  }

  async function addSchedule(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    const startHour = parseInt(form.startTime.split(":")[0], 10);
    const endHour = parseInt(form.endTime.split(":")[0], 10);

    try {
      // Attempt backend maintenance block API
      const result = await apiClient.createMaintenanceBlock({
        courtId: form.courtId,
        date: form.date,
        startHour,
        endHour,
        reason: form.reason || "Perawatan lapangan",
      }).catch((err) => {
        console.warn("Backend maintenance block sync fallback:", err);
        return null;
      });

      const newId = result?.id || `block-${Date.now()}`;
      setSchedules((current) => [...current, { ...form, id: newId }]);
      setNotice("Jadwal perawatan lapangan berhasil dibuat dan slot waktu diblokir.");
      closeForm();
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteSchedule() {
    if (!deleteTarget) return;
    try {
      if (deleteTarget.id && !deleteTarget.id.startsWith("demo-")) {
        await apiClient.deleteMaintenanceBlock(deleteTarget.id).catch((err) => {
          console.warn("Backend delete maintenance error:", err);
        });
      }
      setSchedules((current) => current.filter((item) => item.id !== deleteTarget.id));
      setDeleteTarget(null);
      setNotice(t("admin.deletedNotice"));
    } catch {
      setDeleteTarget(null);
    }
  }

  const dateLabel = (value) =>
    isValidDate(value)
      ? new Intl.DateTimeFormat(lang === "en" ? "en-US" : "id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
          timeZone: "UTC",
        }).format(new Date(`${value}T00:00:00Z`))
      : value;

  return (
    <>
      <header className="mb-8 grid gap-6 border-b border-[#cfcabd] pb-7 dark:border-white/15 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10 lg:pb-9">
        <div className="max-w-3xl">
          <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-emerald-soft dark:text-sage">
            <span className="text-[#a88d56]">01</span>
            <span className="h-px w-7 bg-[#a88d56]/70" />
            {t("admin.dashboardEyebrow")}
          </p>
          <h1 className="font-sans text-[clamp(2.6rem,6.5vw,5.25rem)] font-semibold leading-[.91] tracking-[-.075em] text-ink dark:text-cream">
            {t("admin.dashboardTitle")}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted dark:text-cream/60 md:text-[15px]">
            {t("admin.dashboardCopy")}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setNotice("");
            setIsOpen(true);
          }}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 bg-[#123d32] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1d5b47] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#b49a65] dark:bg-sage dark:text-[#102a22] dark:hover:bg-[#c1d1ba] sm:w-fit"
        >
          <Plus size={17} strokeWidth={2.4} />
          {t("admin.addSchedule")}
        </button>
      </header>

      {/* LIVE METRICS CARDS */}
      <section className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 md:mb-10" aria-label="Metrik Bisnis">
        <div className="border border-line bg-paper p-4 dark:border-white/10 dark:bg-[#142620]">
          <div className="flex items-center justify-between text-muted dark:text-cream/60">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Pendapatan</span>
            <DollarSign size={16} className="text-[#c8ae78]" />
          </div>
          <p className="mt-2 font-sans text-xl font-bold tracking-tight text-ink dark:text-cream sm:text-2xl">
            {metricsLoading ? "..." : rupiah(metrics?.totalRevenue ?? 0)}
          </p>
          <p className="mt-1 text-[10px] text-muted dark:text-cream/50">Dari pemesanan terkonfirmasi</p>
        </div>

        <div className="border border-line bg-paper p-4 dark:border-white/10 dark:bg-[#142620]">
          <div className="flex items-center justify-between text-muted dark:text-cream/60">
            <span className="text-[10px] font-bold uppercase tracking-wider">Booking Selesai</span>
            <BookmarkCheck size={16} className="text-emerald dark:text-sage" />
          </div>
          <p className="mt-2 font-sans text-xl font-bold tracking-tight text-ink dark:text-cream sm:text-2xl">
            {metricsLoading ? "..." : metrics?.confirmedBookings ?? 0}
          </p>
          <p className="mt-1 text-[10px] text-muted dark:text-cream/50">Terkonfirmasi & selesai</p>
        </div>

        <div className="border border-line bg-paper p-4 dark:border-white/10 dark:bg-[#142620]">
          <div className="flex items-center justify-between text-muted dark:text-cream/60">
            <span className="text-[10px] font-bold uppercase tracking-wider">Menunggu Bayar</span>
            <Clock size={16} className="text-amber-500" />
          </div>
          <p className="mt-2 font-sans text-xl font-bold tracking-tight text-ink dark:text-cream sm:text-2xl">
            {metricsLoading ? "..." : metrics?.pendingBookings ?? 0}
          </p>
          <p className="mt-1 text-[10px] text-muted dark:text-cream/50">Jendela hold 15 menit</p>
        </div>

        <div className="border border-line bg-paper p-4 dark:border-white/10 dark:bg-[#142620]">
          <div className="flex items-center justify-between text-muted dark:text-cream/60">
            <span className="text-[10px] font-bold uppercase tracking-wider">Lapangan Aktif</span>
            <Shield size={16} className="text-emerald dark:text-sage" />
          </div>
          <p className="mt-2 font-sans text-xl font-bold tracking-tight text-ink dark:text-cream sm:text-2xl">
            {metricsLoading ? "..." : metrics?.activeCourtsCount ?? courtsList.length}
          </p>
          <p className="mt-1 text-[10px] text-muted dark:text-cream/50">Siap digunakan</p>
        </div>
      </section>

      {notice && (
        <p
          role="status"
          className="mb-4 flex items-center gap-2 border border-emerald/15 bg-emerald/[.04] px-3.5 py-3 text-xs text-emerald dark:border-sage/20 dark:bg-sage/[.06] dark:text-sage"
        >
          <Check size={15} />
          {notice}
        </p>
      )}

      {/* SCHEDULES & MAINTENANCE LIST */}
      <section aria-labelledby="schedule-list-title">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-x-5 gap-y-3">
          <div>
            <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[.18em] text-muted dark:text-cream/45">
              {tr("scheduleCount", { count: scheduleCount })}
            </p>
            <h2 id="schedule-list-title" className="font-sans text-xl font-semibold tracking-[-.04em] text-ink dark:text-cream md:text-2xl">
              {t("admin.scheduleList")}
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.15em] text-emerald-soft dark:text-sage">
            <span className="size-1.5 rounded-full bg-[#b49a65]" />
            Blokir Perawatan Aktif
          </span>
        </div>

        {schedules.length === 0 ? (
          <FeedbackState
            title={t("admin.noSchedules")}
            copy={t("admin.noSchedulesCopy")}
            action={t("admin.addFirstSchedule")}
            onAction={() => setIsOpen(true)}
          />
        ) : (
          <>
            <div className="hidden grid-cols-[minmax(130px,1fr)_minmax(135px,1.1fr)_minmax(170px,1.25fr)_minmax(125px,.8fr)_64px] gap-5 border-y border-[#bbb7a9] bg-[#e9e7de] px-5 py-3 text-[9px] font-bold uppercase tracking-[.16em] text-[#647069] dark:border-white/15 dark:bg-white/[.04] dark:text-cream/50 lg:grid lg:px-6">
              {[t("admin.court"), t("admin.date"), t("admin.time"), t("admin.status"), t("admin.actions")].map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
            <div className="border-b border-[#bbb7a9] dark:border-white/15">
              {sortedSchedules.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-x-5 gap-y-3 border-t border-[#d8d4c8] py-4 first:border-0 dark:border-white/10 sm:py-5 lg:grid-cols-[minmax(130px,1fr)_minmax(135px,1.1fr)_minmax(170px,1.25fr)_minmax(125px,.8fr)_64px] lg:items-center lg:px-5 lg:py-5 xl:px-6"
                >
                  <div className="flex items-baseline justify-between gap-3 lg:block">
                    <p className="mb-1 hidden text-[9px] font-bold uppercase tracking-[.13em] text-muted dark:text-cream/45 lg:block">
                      {t("admin.court")}
                    </p>
                    <p className="text-[15px] font-bold tracking-[-.025em] text-ink dark:text-cream">
                      {courtName(item.courtId)}
                    </p>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 lg:block">
                    <p className="mb-1 hidden text-[9px] font-bold uppercase tracking-[.13em] text-muted dark:text-cream/45 lg:block">
                      {t("admin.date")}
                    </p>
                    <p className="text-sm text-ink/80 dark:text-cream/80">{dateLabel(item.date)}</p>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 lg:block">
                    <p className="mb-1 hidden text-[9px] font-bold uppercase tracking-[.13em] text-muted dark:text-cream/45 lg:block">
                      {t("admin.time")}
                    </p>
                    <p className="text-[15px] font-bold tabular-nums tracking-[-.025em] text-ink dark:text-cream">
                      {item.startTime}
                      <span className="mx-2 text-[#b49a65]">—</span>
                      {item.endTime}
                    </p>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 lg:block">
                    <p className="mb-1 hidden text-[9px] font-bold uppercase tracking-[.13em] text-muted dark:text-cream/45 lg:block">
                      {t("admin.status")}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-amber-600 dark:text-amber-300">
                      <span className="size-1.5 rounded-full bg-amber-500" />
                      Perawatan
                    </span>
                  </div>
                  <div className="flex justify-end lg:justify-center">
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(item)}
                      aria-label={`${t("admin.deleteSchedule")}: ${courtName(item.courtId)}`}
                      className="group inline-flex min-h-10 items-center justify-center gap-2 border border-transparent px-2.5 text-[10px] font-bold uppercase tracking-[.1em] text-muted transition hover:border-danger/25 hover:bg-red-50 hover:text-danger focus-visible:outline-danger dark:text-cream/55 dark:hover:border-red-400/20 dark:hover:bg-red-950/25 dark:hover:text-red-300 lg:size-10 lg:px-0"
                    >
                      <Trash2 size={14} />
                      <span className="lg:hidden">{t("admin.delete")}</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      {/* CREATE MAINTENANCE MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-[#08120e]/55 p-0 sm:items-center sm:p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeForm();
            }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="add-schedule-title"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? {} : { opacity: 0, y: 10 }}
              className="grid max-h-[92dvh] w-full max-w-4xl overflow-y-auto border border-line bg-paper shadow-2xl dark:border-white/10 dark:bg-[#12211b] md:grid-cols-[1.2fr_.8fr]"
            >
              <div className="p-5 sm:p-7">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[.17em] text-emerald-soft dark:text-sage">
                      Manajemen Pemeliharaan
                    </p>
                    <h2 id="add-schedule-title" className="font-display text-3xl text-ink dark:text-cream">
                      {t("admin.addModalTitle")}
                    </h2>
                    <p className="mt-2 text-xs leading-5 text-muted dark:text-cream/55">
                      Blokir slot waktu lapangan agar tidak dapat dipesan oleh pelanggan saat berlangsung perawatan.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeForm}
                    aria-label={t("admin.close")}
                    className="grid size-10 shrink-0 place-items-center border border-line text-muted hover:text-ink dark:border-white/10 dark:text-cream/60 dark:hover:text-cream"
                  >
                    <X size={17} />
                  </button>
                </div>

                <form onSubmit={addSchedule} noValidate className="grid gap-4">
                  <FormField id="schedule-court" label={t("admin.court")} error={errors.courtId}>
                    <select
                      id="schedule-court"
                      name="courtId"
                      value={form.courtId}
                      onChange={updateForm}
                      required
                      className={inputClass(Boolean(errors.courtId))}
                    >
                      {courtsList.map((court) => (
                        <option key={court.id} value={court.id}>
                          {court.name}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField id="schedule-date" label={t("admin.date")} error={errors.date}>
                    <input
                      id="schedule-date"
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={updateForm}
                      required
                      className={inputClass(Boolean(errors.date))}
                    />
                  </FormField>

                  <div className="grid grid-cols-2 gap-3">
                    <FormField id="schedule-start" label={t("admin.startTime")} error={errors.startTime}>
                      <input
                        id="schedule-start"
                        type="time"
                        step="3600"
                        name="startTime"
                        value={form.startTime}
                        onChange={updateForm}
                        required
                        className={inputClass(Boolean(errors.startTime))}
                      />
                    </FormField>
                    <FormField id="schedule-end" label={t("admin.endTime")} error={errors.endTime}>
                      <input
                        id="schedule-end"
                        type="time"
                        step="3600"
                        name="endTime"
                        value={form.endTime}
                        onChange={updateForm}
                        required
                        className={inputClass(Boolean(errors.endTime))}
                      />
                    </FormField>
                  </div>

                  <FormField id="schedule-reason" label="Keterangan / Alasan Perawatan">
                    <input
                      id="schedule-reason"
                      type="text"
                      name="reason"
                      value={form.reason}
                      onChange={updateForm}
                      placeholder="mis. Pembersihan vinyl karpet, perbaikan lampu"
                      className={inputClass(false)}
                    />
                  </FormField>

                  <p className="text-[11px] leading-5 text-muted dark:text-cream/50">
                    {tr("openingHours", { open: openingHour, close: closingHour })}
                  </p>

                  {errors.form && (
                    <p
                      role="alert"
                      className="flex items-start gap-2 border border-danger/20 bg-red-50 px-3 py-2.5 text-xs leading-5 text-danger dark:border-red-400/20 dark:bg-red-950/20 dark:text-red-300"
                    >
                      <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                      {errors.form}
                    </p>
                  )}

                  <div className="mt-2 flex flex-col-reverse gap-2 border-t border-line pt-4 dark:border-white/10 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={closeForm}
                      className="min-h-11 border border-line px-4 text-sm font-semibold text-muted transition hover:bg-emerald/[.04] dark:border-white/15 dark:text-cream/70 dark:hover:bg-white/[.04]"
                    >
                      {t("admin.cancel")}
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex min-h-11 items-center justify-center gap-2 bg-emerald px-4 text-sm font-bold text-white transition hover:bg-emerald-soft disabled:opacity-50 dark:bg-sage dark:text-[#102a22] dark:hover:bg-[#c1d1ba]"
                    >
                      <Plus size={15} />
                      {submitting ? "Menyimpan..." : t("admin.saveSchedule")}
                    </button>
                  </div>
                </form>
              </div>

              <aside className="hidden flex-col justify-between bg-[#102a22] p-7 text-[#f7f3ea] md:flex lg:p-9">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#d8c38f]">
                    Informasi Operasional
                  </p>
                  <h3 className="mt-7 max-w-xs text-3xl font-semibold leading-[1.04] tracking-[-.055em]">
                    Perawatan Lapangan
                  </h3>
                  <p className="mt-3 max-w-xs text-xs leading-5 text-white/55">
                    Slot yang diblokir akan langsung tampak sebagai tidak tersedia di halaman booking publik.
                  </p>
                </div>
                <div className="border-t border-white/15 pt-5">
                  <p className="text-[9px] font-bold uppercase tracking-[.17em] text-white/45">
                    {t("admin.availableNow")}
                  </p>
                  <p className="mt-2 text-3xl font-semibold tabular-nums tracking-[-.05em] text-[#e2d2a9]">
                    {openingHour}:00 <span className="text-white/35">—</span> {closingHour}:00
                  </p>
                </div>
              </aside>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-[#08120e]/60 p-0 sm:items-center sm:p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setDeleteTarget(null);
            }}
          >
            <motion.section
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-schedule-title"
              aria-describedby="delete-schedule-copy"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? {} : { opacity: 0 }}
              className="w-full max-w-md border border-line bg-paper p-5 shadow-2xl dark:border-white/10 dark:bg-[#12211b] sm:p-6"
            >
              <span className="mb-4 grid size-10 place-items-center border border-danger/20 bg-red-50 text-danger dark:border-red-400/20 dark:bg-red-950/25 dark:text-red-300">
                <Trash2 size={17} />
              </span>
              <h2 id="delete-schedule-title" className="font-display text-2xl text-ink dark:text-cream">
                {t("admin.deleteTitle")}
              </h2>
              <p id="delete-schedule-copy" className="mt-2 text-sm leading-6 text-muted dark:text-cream/60">
                {tr("deleteCopy", {
                  court: courtName(deleteTarget.courtId),
                  date: dateLabel(deleteTarget.date),
                  start: deleteTarget.startTime,
                  end: deleteTarget.endTime,
                })}
              </p>
              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  autoFocus
                  onClick={() => setDeleteTarget(null)}
                  className="min-h-11 border border-line px-4 text-sm font-semibold text-muted dark:border-white/15 dark:text-cream/70"
                >
                  {t("admin.cancel")}
                </button>
                <button
                  type="button"
                  onClick={deleteSchedule}
                  className="inline-flex min-h-11 items-center justify-center gap-2 bg-danger px-4 text-sm font-bold text-white transition hover:bg-[#84332c]"
                >
                  <Trash2 size={14} />
                  {t("admin.confirmDelete")}
                </button>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const localToday = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

const inputClass = (invalid) =>
  `min-h-11 w-full border bg-paper px-3 text-sm text-ink outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/10 dark:bg-[#0e1b16] dark:text-cream dark:focus:border-sage dark:focus:ring-sage/10 ${
    invalid ? "border-danger dark:border-red-400" : "border-line dark:border-white/15"
  }`;

function FormField({ id, label, error, children }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-xs font-semibold text-ink dark:text-cream">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[11px] text-danger dark:text-red-300" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function FeedbackState({ type, title, copy, action, onAction }) {
  return (
    <div className="px-5 py-12 text-center">
      <span className="mx-auto grid size-11 place-items-center border border-line text-muted dark:border-white/10 dark:text-cream/50">
        {type === "error" ? <AlertTriangle size={18} /> : <CalendarDays size={18} />}
      </span>
      <h3 className="mt-4 text-sm font-bold text-ink dark:text-cream">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-muted dark:text-cream/55">{copy}</p>
      <button
        type="button"
        onClick={onAction}
        className="mt-5 min-h-10 border border-line px-3.5 text-xs font-bold text-emerald transition hover:bg-emerald/[.04] dark:border-white/15 dark:text-sage dark:hover:bg-white/[.04]"
      >
        {action}
      </button>
    </div>
  );
}
