import type { HabitDoc } from '../models/habit'

export function startOfDay(date: Date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function endOfDay(date: Date) {
  const d = new Date(date)
  d.setHours(23, 59, 59, 999)
  return d
}

export function startOfWeek(date: Date) {
  const d = startOfDay(date)
  const day = d.getDay() // 0 — Sunday
  d.setDate(d.getDate() - day)
  return d
}

export function endOfWeek(date: Date) {
  const d = startOfWeek(date)
  d.setDate(d.getDate() + 6)
  return endOfDay(d)
}

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function endOfMonth(date: Date) {
  const d = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  return endOfDay(d)
}

/**
 * Возвращает период (start, end) для конкретной привычки по ее regularity
 */
export function getPeriod(habit: HabitDoc, now: Date) {
  switch (habit.regularity) {
    case 'DAILY':
      return { start: startOfDay(now), end: endOfDay(now) }
    case 'WEEKLY':
      return { start: startOfWeek(now), end: endOfWeek(now) }
    case 'MONTHLY':
      return { start: startOfMonth(now), end: endOfMonth(now) }
    default:
      throw new Error(`Unknown regularity: ${habit.regularity}`)
  }
}

export function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

export function subDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() - days)
  return startOfDay(d)
}
