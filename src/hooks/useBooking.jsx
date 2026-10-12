import { createContext, useContext, useEffect, useState } from 'react'
import { makeBookingCode } from '../utils/booking'

const BookingContext = createContext(null)
const initialState = { date: '', courtId: 'court-1', startHour: null, duration: 1, customer: { name: '', phone: '', email: '' }, code: '', paid: false, paymentStatus: 'pending' }

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(() => {
    try { return { ...initialState, ...JSON.parse(localStorage.getItem('badminlap-booking')) } } catch { return initialState }
  })
  useEffect(() => { localStorage.setItem('badminlap-booking', JSON.stringify(booking)) }, [booking])
  const update = (changes) => setBooking((current) => ({ ...current, ...changes }))
  const ensureCode = () => {
    if (booking.code) return booking.code
    const code = makeBookingCode(); update({ code }); return code
  }
  const reset = () => setBooking(initialState)
  return <BookingContext.Provider value={{ booking, update, ensureCode, reset }}>{children}</BookingContext.Provider>
}

export const useBooking = () => useContext(BookingContext)
