import { Habit } from '../models/habit'
import { HabitLog } from '../models/habit-log'
import { getPeriod } from '../utils/date'

export async function expireHabitLogs() {
  const now = new Date()
  const habits = await Habit.find().lean()

  for (const habit of habits) {
    const { start, end } = getPeriod(habit, now)
    if (now < end) continue
    if (habit.createdAt >= end) continue

    const logs = await HabitLog.find({
      habitId: habit._id,
      createdAt: { $gte: start, $lte: end },
    })

    const anyCompleted = logs.some((log) => log.status === 'COMPLETED')

    if (!anyCompleted) {
      await HabitLog.create({
        habitId: habit._id,
        status: 'FAILED',
      })
    }
  }
}
