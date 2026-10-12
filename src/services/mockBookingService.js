import { bookedByCourt, closingHour } from '../data/schedules'
export function isSlotAvailable(courtId, start, duration) {
  const occupied = bookedByCourt[courtId] || []
  return start + Number(duration) <= closingHour && Array.from({ length: Number(duration) }, (_, i) => start + i).every((hour) => !occupied.includes(hour))
}
export const mockBookingService = { isSlotAvailable }
