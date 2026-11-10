import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, Clock3, ReceiptText, Search, CreditCard, XCircle, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { Button, PageHeading, StateBox } from "../components/UI";
import { courts } from "../data/bookingData";
import { useBooking } from "../hooks/useBooking";
import { localDate, rupiah, timeLabel, totalPrice } from "../utils/booking";
import { useTranslation } from "../i18n/I18nContext";
import { useAuth } from "../context/AuthContext";
import { apiClient } from "../services/apiClient";

export default function BookingHistoryPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { history: localHistory } = useBooking();
  const { user, isAuthenticated } = useAuth();

  const [remoteBookings, setRemoteBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'pending' | 'confirmed' | 'cancelled'
  const [actionBusy, setActionBusy] = useState(false);
  const [cancelModal, setCancelModal] = useState(null); // booking code to cancel

  // Fetch server bookings for authenticated customer
  const fetchMyBookings = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError("");
    try {
      const data = await apiClient.getMyBookings();
      setRemoteBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn("Failed to fetch customer bookings from API, fallback to local:", err);
      // Fallback: local history
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMyBookings();
    }
  }, [isAuthenticated]);

  // Handle self-service cancellation for pending bookings
  const handleCancelBooking = async (bookingCode) => {
    setActionBusy(true);
    try {
      await apiClient.cancelBooking(bookingCode, "Dibatalkan oleh pelanggan");
      setCancelModal(null);
      await fetchMyBookings();
    } catch (err) {
      alert(err.message || "Gagal membatalkan pemesanan.");
    } finally {
      setActionBusy(false);
    }
  };

  const handleSearchCode = (e) => {
    e.preventDefault();
    const clean = searchCode.trim().toUpperCase();
    if (!clean) return;
    navigate(`/booking/riwayat/${encodeURIComponent(clean)}`);
  };

  // Filter bookings based on active tab
  const displayBookings = useMemo(() => {
    if (!isAuthenticated) {
      // Guest mode: show local history
      return localHistory.map((b) => ({
        bookingCode: b.code,
        courtId: b.courtId,
        courtName: courts.find((c) => c.id === b.courtId)?.name || "Lapangan",
        date: b.date,
        startHour: b.startHour,
        duration: b.duration,
        endHour: Number(b.startHour) + Number(b.duration),
        totalAmount: totalPrice(b.duration),
        status: b.paid ? "CONFIRMED" : "PENDING_PAYMENT",
        customerName: b.customer?.name,
      }));
    }

    if (remoteBookings.length > 0) {
      if (activeTab === "all") return remoteBookings;
      if (activeTab === "pending") return remoteBookings.filter((b) => b.status === "PENDING_PAYMENT");
      if (activeTab === "confirmed") return remoteBookings.filter((b) => b.status === "CONFIRMED" || b.status === "COMPLETED");
      if (activeTab === "cancelled") return remoteBookings.filter((b) => b.status === "CANCELLED" || b.status === "EXPIRED");
      return remoteBookings;
    }

    // Fallback if remote returned empty
    return [];
  }, [isAuthenticated, remoteBookings, localHistory, activeTab]);

  return (
    <main className="mx-auto min-h-[70vh] w-[calc(100%-32px)] py-14 md:w-[min(1060px,calc(100%-48px))] md:py-20">
      <PageHeading
        eyebrow={t("historyPage.eyebrow")}
        title={t("historyPage.title")}
        copy={t("historyPage.copy")}
      />

      {/* GUEST NOTICE & LOOKUP TOOL */}
      {!isAuthenticated && (
        <div className="mb-8 grid gap-4 border border-[#d8d0c0] bg-[#f7f3ea] p-5 dark:border-white/10 dark:bg-[#142620] sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <div className="flex items-center gap-2 font-bold text-ink dark:text-cream">
              <Clock3 size={17} className="text-emerald dark:text-sage" />
              <span>Anda belum masuk ke akun</span>
            </div>
            <p className="mt-1 text-xs text-muted dark:text-cream/70">
              Riwayat di bawah hanya tersimpan di peramban ini. Masuk atau cari tanda bukti menggunakan Kode Booking.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/login?redirect=/booking/riwayat"
              className="inline-flex min-h-10 items-center justify-center rounded-lg bg-emerald px-4 text-xs font-bold text-white hover:bg-emerald-soft dark:bg-sage dark:text-[#102a22]"
            >
              Masuk Akun
            </Link>
          </div>
        </div>
      )}

      {/* SEARCH RECEIPT BY BOOKING CODE */}
      <form onSubmit={handleSearchCode} className="mb-7 flex max-w-md gap-2">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted dark:text-cream/40" />
          <input
            type="text"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            placeholder="Cari kode booking (mis. GB-202611...)"
            className="w-full rounded-lg border border-line bg-paper py-2.5 pl-10 pr-3 text-xs uppercase tracking-wider text-ink outline-none transition focus:border-emerald dark:border-white/15 dark:bg-[#182d25] dark:text-cream dark:focus:border-sage"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg border border-line px-4 text-xs font-bold text-ink transition hover:border-emerald hover:bg-paper dark:border-white/20 dark:text-cream dark:hover:border-sage"
        >
          Cek
        </button>
      </form>

      {/* TABS FOR LOGGED-IN USERS */}
      {isAuthenticated && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3 dark:border-white/10">
          <div className="flex gap-2">
            {[
              { id: "all", label: "Semua" },
              { id: "pending", label: "Menunggu Bayar" },
              { id: "confirmed", label: "Terkonfirmasi" },
              { id: "cancelled", label: "Dibatalkan" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  activeTab === tab.id
                    ? "bg-emerald text-white dark:bg-sage dark:text-[#102a22]"
                    : "text-muted hover:bg-black/5 dark:text-cream/60 dark:hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={fetchMyBookings}
            disabled={loading}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-emerald dark:text-cream/60 dark:hover:text-sage"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            <span>Muat Ulang</span>
          </button>
        </div>
      )}

      {loading ? (
        <div className="grid gap-3 py-10">
          <div className="h-24 animate-pulse rounded-lg bg-emerald/5 dark:bg-white/5" />
          <div className="h-24 animate-pulse rounded-lg bg-emerald/5 dark:bg-white/5" />
        </div>
      ) : displayBookings.length === 0 ? (
        <div className="border border-line bg-paper px-5 py-14 text-center dark:border-white/10 dark:bg-[#142620] md:px-10">
          <StateBox type="empty">Belum ada riwayat booking pada kategori ini.</StateBox>
          <Button to="/booking" className="mt-6">
            {t("historyPage.startBooking")}
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {displayBookings.map((b) => {
            const isPending = b.status === "PENDING_PAYMENT";
            const isConfirmed = b.status === "CONFIRMED" || b.status === "COMPLETED";
            const isCancelled = b.status === "CANCELLED" || b.status === "EXPIRED";

            return (
              <article
                key={b.bookingCode}
                className="grid gap-5 border border-line bg-paper p-5 shadow-[0_8px_24px_rgba(40,45,35,.04)] dark:border-white/10 dark:bg-[#142620] dark:text-cream md:grid-cols-[1fr_auto] md:items-center md:p-6"
              >
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-2.5">
                    {isConfirmed && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f0e9] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald dark:bg-[#1b362a] dark:text-sage">
                        <CheckCircle size={12} /> Terkonfirmasi
                      </span>
                    )}
                    {isPending && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:bg-amber-400/15 dark:text-amber-300">
                        <AlertCircle size={12} /> Menunggu Pembayaran
                      </span>
                    )}
                    {isCancelled && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600 dark:bg-red-400/15 dark:text-red-300">
                        <XCircle size={12} /> {b.status === "EXPIRED" ? "Kadaluarsa" : "Dibatalkan"}
                      </span>
                    )}
                    <span className="text-xs font-bold tracking-[.08em] text-[#5e655f] dark:text-cream/60">
                      {b.bookingCode}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold tracking-tight text-ink dark:text-cream">
                    {b.courtName || "Lapangan"}{" "}
                    <span className="px-1 text-muted dark:text-cream/50">·</span>{" "}
                    {localDate(b.date)}
                  </h2>

                  <p className="mt-1 text-xs text-muted dark:text-cream/70">
                    {timeLabel(b.startHour)} – {timeLabel(b.endHour)}{" "}
                    <span className="px-1">·</span> {b.duration} {t("historyPage.durationUnit")}
                  </p>

                  <p className="mt-3 text-sm font-bold text-emerald dark:text-champagne">
                    Total {rupiah(b.totalAmount || totalPrice(b.duration))}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 md:justify-end">
                  {isPending && (
                    <>
                      <Button
                        to={`/booking/pembayaran`}
                        className="gap-1.5 text-xs"
                      >
                        <CreditCard size={14} /> Bayar Sekarang
                      </Button>
                      <button
                        type="button"
                        onClick={() => setCancelModal(b.bookingCode)}
                        className="rounded-lg border border-red-500/30 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-500/10 dark:text-red-300"
                      >
                        Batalkan
                      </button>
                    </>
                  )}

                  <Button
                    to={`/booking/riwayat/${encodeURIComponent(b.bookingCode)}`}
                    variant="secondary"
                    className="gap-2 text-xs"
                  >
                    <ReceiptText size={15} /> {t("historyPage.viewReceipt")} <ArrowUpRight size={13} />
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* CANCEL MODAL CONFIRMATION */}
      {cancelModal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-lg border border-line bg-paper p-6 text-center shadow-xl dark:border-white/15 dark:bg-[#142620]">
            <XCircle size={32} className="mx-auto text-danger dark:text-red-300" />
            <h3 className="mt-3 text-base font-bold text-ink dark:text-cream">Batalkan Pemesanan?</h3>
            <p className="mt-2 text-xs text-muted dark:text-cream/70">
              Pemesanan <span className="font-mono font-bold text-ink dark:text-cream">{cancelModal}</span> akan dibatalkan dan slot waktu akan dibuka kembali untuk pemain lain.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setCancelModal(null)}
                disabled={actionBusy}
                className="rounded-lg border border-line px-4 py-2 text-xs font-semibold text-ink dark:border-white/20 dark:text-cream"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={() => handleCancelBooking(cancelModal)}
                disabled={actionBusy}
                className="rounded-lg bg-danger px-4 py-2 text-xs font-bold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {actionBusy ? "Membatalkan..." : "Ya, Batalkan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
