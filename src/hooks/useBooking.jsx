import { createContext, useContext, useEffect, useState } from 'react'
import { makeBookingCode } from '../utils/booking'
import { courts } from '../data/venues'

const BookingContext = createContext(null)
const historyStorageKey = 'gajahberlian-booking-history'
const initialState = { date: '', courtId: 'court-1', startHour: null, duration: 1, customer: { name: '', phone: '', email: '' }, code: '', paid: false, paymentStatus: 'pending' }

export function BookingProvider({ children }) {
  const [history, setHistory] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(historyStorageKey))
      return Array.isArray(saved) ? saved : []
    } catch { return [] }
  })
  const [booking, setBooking] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('badminlap-booking'))
      const courtId = courts.some((court) => court.id === saved?.courtId) ? saved.courtId : initialState.courtId
      return { ...initialState, ...saved, courtId }
    } catch { return initialState }
  })
  useEffect(() => { localStorage.setItem('badminlap-booking', JSON.stringify(booking)) }, [booking])
  const update = (changes) => setBooking((current) => ({ ...current, ...changes }))
  const completeBooking = (paidAt = new Date().toISOString()) => {
    const code = booking.code || makeBookingCode()
    const completed = { ...booking, code, paid: true, paymentStatus: 'paid', paidAt }
    const nextHistory = [completed, ...history.filter((item) => item.code !== code)]
    try { localStorage.setItem(historyStorageKey, JSON.stringify(nextHistory)) } catch { /* Keep the in-memory receipt available for this session. */ }
    setHistory(nextHistory)
    setBooking(completed)
    return completed
  }
  const ensureCode = () => {
    if (booking.code) return booking.code
    const code = makeBookingCode(); update({ code }); return code
  }
  const reset = () => setBooking(initialState)
  return <BookingContext.Provider value={{ booking, history, update, ensureCode, completeBooking, reset }}>{children}</BookingContext.Provider>
}

export const useBooking = () => useContext(BookingContext)
