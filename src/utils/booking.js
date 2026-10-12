import { formatCurrency } from './formatCurrency'
import { calculateTotal } from './bookingCalculation'
import { isSlotAvailable } from '../services/mockBookingService'

export const rupiah = formatCurrency
export const totalPrice = (duration = 1) => calculateTotal(duration)
export { isSlotAvailable }

export const localDate = (date) => date
  ? new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${date}T12:00:00`))
  : 'Belum dipilih'

export const timeLabel = (hour) => `${String(hour).padStart(2, '0')}.00`
export const today = () => {
  const value = new Date()
  value.setMinutes(value.getMinutes() - value.getTimezoneOffset())
  return value.toISOString().slice(0, 10)
}
export const makeBookingCode = () => `BL-${new Date().toISOString().slice(2, 10).replaceAll('-', '')}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
