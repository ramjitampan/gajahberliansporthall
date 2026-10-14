export const openingHour = 8
export const closingHour = 22
export const hours = Array.from({ length: closingHour - openingHour }, (_, index) => openingHour + index)
export const durations = [1, 2, 3, 4]
export const bookedByCourt = {
  'court-1': [9, 10, 18],
  'court-2': [12, 15, 16],
}
