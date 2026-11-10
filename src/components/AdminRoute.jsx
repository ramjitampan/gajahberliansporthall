import { Navigate, Outlet, useLocation, Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../i18n/I18nContext";

export default function AdminRoute() {
  const { user, isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#102a22] text-[#f7f3ea]">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="size-10 animate-spin rounded-full border-2 border-[#c8ae78]/20 border-t-[#c8ae78]" />
          <p className="text-xs uppercase tracking-widest text-[#c8ae78]/70">Memverifikasi Sesi...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f4f2eb] px-4 py-12 text-ink dark:bg-[#0b1512] dark:text-cream">
        <div className="mx-auto max-w-md border border-line bg-paper p-8 text-center shadow-lg dark:border-white/10 dark:bg-[#142620]">
          <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-danger/10 text-danger dark:bg-red-400/10 dark:text-red-300">
            <ShieldAlert size={24} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-danger dark:text-red-300">
            403 - Akses Ditolak
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">Halaman Khusus Administrator</h1>
          <p className="mt-3 text-sm leading-6 text-muted dark:text-cream/65">
            Akun Anda ({user?.email}) terdaftar sebagai pelanggan dan tidak memiliki izin untuk mengakses area manajemen venue.
          </p>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-line bg-paper px-4 text-xs font-bold text-ink transition hover:border-emerald dark:border-white/20 dark:bg-[#102a22] dark:text-cream dark:hover:border-sage"
            >
              <ArrowLeft size={14} /> Kembali ke Beranda
            </Link>
            <Link
              to="/booking"
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-emerald px-4 text-xs font-bold text-white transition hover:bg-emerald-soft dark:bg-sage dark:text-[#102a22]"
            >
              Pesan Lapangan
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
