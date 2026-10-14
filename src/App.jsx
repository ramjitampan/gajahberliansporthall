import { Route, Routes } from 'react-router-dom'
import SiteLayout from './layouts/SiteLayout'
import HomePage from './pages/HomePage'
import PricePage from './pages/PricePage'
import BookingPage from './pages/BookingPage'
import CustomerPage from './pages/CustomerPage'
import PaymentPage from './pages/PaymentPage'
import ConfirmationPage from './pages/ConfirmationPage'
import NotFoundPage from './pages/NotFoundPage'
import AboutPage from './pages/AboutPage'
import FacilitiesPage from './pages/FacilitiesPage'
import PageTransition from './components/PageTransition'
import BookingHistoryPage from './pages/BookingHistoryPage'

export default function App() {
  return <PageTransition><Routes location={location}>
    <Route element={<SiteLayout/>}><Route index element={<HomePage/>}/><Route path="tentang" element={<AboutPage/>}/><Route path="fasilitas" element={<FacilitiesPage/>}/><Route path="daftar-harga" element={<PricePage/>}/><Route path="booking" element={<BookingPage/>}/><Route path="booking/data-pemesan" element={<CustomerPage/>}/><Route path="booking/pembayaran" element={<PaymentPage/>}/><Route path="booking/konfirmasi" element={<ConfirmationPage/>}/><Route path="booking/riwayat" element={<BookingHistoryPage/>}/><Route path="booking/riwayat/:code" element={<ConfirmationPage/>}/><Route path="*" element={<NotFoundPage/>}/></Route>
  </Routes></PageTransition>
}
