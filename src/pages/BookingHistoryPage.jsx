import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCircle,
  Clock3,
  CreditCard,
  History,
  ReceiptText,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react";
import { courts } from "../data/bookingData";
import { useBooking } from "../hooks/useBooking";
import { localDate, rupiah, timeLabel, totalPrice } from "../utils/booking";
import { useTranslation } from "../i18n/I18nContext";
import { useAuth } from "../context/AuthContext";
import { apiClient } from "../services/apiClient";
import Reveal from "../components/Reveal";
import "../styles/homepage.css";
import "../styles/historypage.css";

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
      // Keep the local history intact when the legacy API is unavailable.
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.documentElement.classList.add("gb-home-active", "gb-history-active");
    return () => document.documentElement.classList.remove("gb-home-active", "gb-history-active");
  }, []);

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
        courtName: b.courtName || courts.find((c) => c.id === b.courtId)?.name || "Lapangan",
        date: b.date,
        startHour: b.startHour,
        duration: b.duration,
        endHour: Number(b.startHour) + Number(b.duration),
        totalAmount: b.totalAmount ?? totalPrice(b.duration),
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
    <div className="gb-history-page">
      <div className="gbh-container">
        <Reveal className="gbh-intro">
          <p className="gbh-eyebrow"><span />{t("historyPage.eyebrow")}</p>
          <h1>{t("historyPage.title")}</h1>
          <p className="gbh-intro-copy">{t("historyPage.copy")}</p>
        </Reveal>

        {!isAuthenticated && (
          <Reveal className="gbh-guest-notice gbh-glass">
            <span className="gbh-guest-icon"><History size={19} strokeWidth={1.7} aria-hidden="true" /></span>
            <div className="gbh-guest-copy">
              <h2><Clock3 size={16} aria-hidden="true" />Anda belum masuk ke akun</h2>
              <p>Riwayat di bawah hanya tersimpan di peramban ini. Masuk atau cari tanda bukti menggunakan Kode Booking.</p>
            </div>
            <Link to="/login?redirect=/booking/riwayat" className="gbh-button gbh-button-secondary">Masuk Akun</Link>
          </Reveal>
        )}

        <section className="gbh-tools" aria-label={t("historyPage.eyebrow")}>
          <form onSubmit={handleSearchCode} className="gbh-search-form">
            <div className="gbh-search-field">
              <Search size={17} aria-hidden="true" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Cari kode booking (mis. GB-202611...)"
                aria-label="Cari kode booking"
                className="gbh-search-input"
              />
            </div>
            <button type="submit" className="gbh-button gbh-button-search">Cek</button>
          </form>

          {isAuthenticated && (
            <div className="gbh-history-controls">
              <div className="gbh-tabs" role="group" aria-label="Kategori riwayat booking">
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
                    aria-pressed={activeTab === tab.id}
                    className={`gbh-tab ${activeTab === tab.id ? "is-active" : ""}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <button type="button" onClick={fetchMyBookings} disabled={loading} className="gbh-refresh">
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} aria-hidden="true" />
                <span>Muat Ulang</span>
              </button>
            </div>
          )}
        </section>

        {error ? (
          <section className="gbh-empty gbh-glass" role="alert">
            <span className="gbh-empty-icon"><AlertCircle size={23} strokeWidth={1.6} aria-hidden="true" /></span>
            <p className="gbh-empty-message">{error}</p>
          </section>
        ) : loading ? (
          <div className="gbh-loading-list" role="status" aria-label="Memuat riwayat booking">
            <div className="gbh-skeleton" />
            <div className="gbh-skeleton" />
          </div>
        ) : displayBookings.length === 0 ? (
          <section className="gbh-empty gbh-glass" aria-live="polite">
            <span className="gbh-empty-icon"><ReceiptText size={23} strokeWidth={1.6} aria-hidden="true" /></span>
            <p className="gbh-empty-message">Belum ada riwayat booking pada kategori ini.</p>
            <Link to="/booking" className="gbh-button gbh-button-primary">
              {t("historyPage.startBooking")}<ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </section>
        ) : (
          <div className="gbh-record-list">
            {displayBookings.map((b) => {
              const isPending = b.status === "PENDING_PAYMENT";
              const isConfirmed = b.status === "CONFIRMED" || b.status === "COMPLETED";
              const isCancelled = b.status === "CANCELLED" || b.status === "EXPIRED";

              return (
                <Reveal key={b.bookingCode} className="gbh-record-reveal">
                  <article className="gbh-record gbh-glass">
                    <header className="gbh-record-header">
                      <span className="gbh-code-label">Kode booking</span>
                      <span className="gbh-record-code">{b.bookingCode}</span>
                      {isConfirmed && <span className="gbh-status gbh-status-confirmed"><CheckCircle size={14} aria-hidden="true" />Terkonfirmasi</span>}
                      {isPending && <span className="gbh-status gbh-status-pending"><AlertCircle size={14} aria-hidden="true" />Menunggu Pembayaran</span>}
                      {isCancelled && <span className="gbh-status gbh-status-cancelled"><XCircle size={14} aria-hidden="true" />{b.status === "EXPIRED" ? "Kadaluarsa" : "Dibatalkan"}</span>}
                      {!isConfirmed && !isPending && !isCancelled && b.status && <span className="gbh-status gbh-status-neutral">{b.status}</span>}
                    </header>

                    <div className="gbh-record-body">
                      <div className="gbh-record-summary">
                        <h2>{b.courtName || "Lapangan"}</h2>
                        <div className="gbh-record-facts">
                          <div className="gbh-record-fact">
                            <span className="gbh-fact-icon"><CalendarDays size={16} aria-hidden="true" /></span>
                            <span><small>{t("bookingPage.summaryDate")}</small><strong>{localDate(b.date)}</strong></span>
                          </div>
                          <div className="gbh-record-fact">
                            <span className="gbh-fact-icon"><Clock3 size={16} aria-hidden="true" /></span>
                            <span><small>{t("bookingPage.summaryTime")}</small><strong>{timeLabel(b.startHour)} – {timeLabel(b.endHour)}</strong></span>
                          </div>
                          <div className="gbh-record-fact">
                            <span className="gbh-fact-icon"><History size={16} aria-hidden="true" /></span>
                            <span><small>{t("bookingPage.summaryDuration")}</small><strong>{b.duration} {t("historyPage.durationUnit")}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="gbh-record-total">
                        <span>Total</span>
                        <strong>{rupiah(b.totalAmount || totalPrice(b.duration))}</strong>
                      </div>
                    </div>

                    <footer className="gbh-record-actions">
                      {isPending && (
                        <>
                          <Link to="/booking/pembayaran" className="gbh-button gbh-button-primary">
                            <CreditCard size={15} aria-hidden="true" />Bayar Sekarang
                          </Link>
                          <button type="button" onClick={() => setCancelModal(b.bookingCode)} className="gbh-button gbh-button-danger">
                            <XCircle size={14} aria-hidden="true" />Batalkan
                          </button>
                        </>
                      )}
                      <Link to={`/booking/riwayat/${encodeURIComponent(b.bookingCode)}`} className="gbh-button gbh-button-secondary">
                        <ReceiptText size={15} aria-hidden="true" />{t("historyPage.viewReceipt")}<ArrowUpRight size={13} aria-hidden="true" />
                      </Link>
                    </footer>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>

      {cancelModal && (
        <div className="gbh-modal-backdrop">
          <div className="gbh-cancel-modal gbh-glass" role="dialog" aria-modal="true" aria-labelledby="gbh-cancel-title">
            <span className="gbh-modal-icon"><XCircle size={28} aria-hidden="true" /></span>
            <h2 id="gbh-cancel-title">Batalkan Pemesanan?</h2>
            <p>Pemesanan <strong>{cancelModal}</strong> akan dibatalkan dan slot waktu akan dibuka kembali untuk pemain lain.</p>
            <div className="gbh-modal-actions">
              <button type="button" onClick={() => setCancelModal(null)} disabled={actionBusy} className="gbh-button gbh-button-secondary">Kembali</button>
              <button type="button" onClick={() => handleCancelBooking(cancelModal)} disabled={actionBusy} className="gbh-button gbh-button-danger-solid">
                {actionBusy ? "Membatalkan..." : <><Check size={14} aria-hidden="true" />Ya, Batalkan</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
