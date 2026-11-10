import { Route, Routes } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import HomePage from "./pages/HomePage";
import PricePage from "./pages/PricePage";
import BookingPage from "./pages/BookingPage";
import CustomerPage from "./pages/CustomerPage";
import PaymentPage from "./pages/PaymentPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import FacilitiesPage from "./pages/FacilitiesPage";
import BookingHistoryPage from "./pages/BookingHistoryPage";
import LocationPage from "./pages/LocationPage";
import AuthLayout from "./layouts/AuthLayout";
import AuthPage from "./pages/AuthPage";
import AdminLayout from "./layouts/AdminLayout";
import AdminRoute from "./components/AdminRoute";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminHistoryPage from "./pages/AdminHistoryPage";
import ErrorPreviewPage from "./pages/ErrorPreviewPage";

export default function App() {
  return (
    <Routes>
      {import.meta.env.DEV && <Route path="/__error-preview/:type" element={<ErrorPreviewPage />} />}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
      </Route>
      <Route path="admin" element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="history" element={<AdminHistoryPage />} />
        </Route>
      </Route>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="tentang" element={<AboutPage />} />
        <Route path="fasilitas" element={<FacilitiesPage />} />
        <Route path="daftar-harga" element={<PricePage />} />
        <Route path="lokasi" element={<LocationPage />} />
        <Route path="booking" element={<BookingPage />} />
        <Route path="booking/data-pemesan" element={<CustomerPage />} />
        <Route path="booking/pembayaran" element={<PaymentPage />} />
        <Route path="booking/konfirmasi" element={<ConfirmationPage />} />
        <Route path="booking/riwayat" element={<BookingHistoryPage />} />
        <Route path="booking/riwayat/:code" element={<ConfirmationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
