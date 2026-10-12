import { hourlyRate, serviceFee } from '../data/prices'
export const calculateRental = (duration) => hourlyRate * Number(duration)
export const calculateTotal = (duration) => calculateRental(duration) + serviceFee
