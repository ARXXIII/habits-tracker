import { isSameDay, subDays, startOfDay } from './date'

import type { HabitDoc } from '../models/habit'
import type { Status } from '../__generated__/types'

export function updateHabitStreak(
  habit: HabitDoc,
  today: Date,
  status: Status,
): void {
  if (status === 'FAILED') {
    habit.currentStreak = 0
    return
  }

  const last = habit.lastCompleted
    ? startOfDay(new Date(habit.lastCompleted))
    : null

  if (!last) {
    habit.currentStreak = 1
  } else if (isSameDay(last, subDays(today, 1))) {
    habit.currentStreak += 1
  } else if (!isSameDay(last, today)) {
    habit.currentStreak = 1
  }

  if (habit.currentStreak > habit.longestStreak) {
    habit.longestStreak = habit.currentStreak
  }

  habit.lastCompleted = today
}
