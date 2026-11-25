import { Outlet, useLocation } from "react-router-dom";
import ScrollToHash from "../components/ScrollToHash";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";

export default function SiteLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isAbout = pathname === "/tentang";
  const isPricelist = pathname === "/daftar-harga";
  const isFacilities = pathname === "/fasilitas";
  const isLocation = pathname === "/lokasi";
  const isHistory = pathname === "/booking/riwayat";

  return (
    <div className="flex min-h-screen flex-col bg-ivory text-ink transition-colors duration-200 dark:bg-[#0c1613] dark:text-cream">
      <ScrollToHash />
      <Navbar />
      <main className={`flex-1 ${isHome || isAbout || isFacilities || isLocation || isHistory ? "" : "pt-18 md:pt-20"} ${isPricelist ? "gb-pricelist-main" : ""}`}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
