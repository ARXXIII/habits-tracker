import DataLoader from 'dataloader'
import { Habit, type HabitDoc } from '../models/habit'

import type { Types } from 'mongoose'

export function createHabitsByUserLoader() {
  return new DataLoader<string, HabitDoc[], string>(async (userIds) => {
    const objectIds = userIds.map((id) => id as unknown as Types.ObjectId)
    const habits = await Habit.find({ userId: { $in: objectIds } })
      .sort({ createdAt: 1 })
      .lean()

    const map = new Map<string, HabitDoc[]>()
    for (const id of userIds) map.set(id, [])
    for (const habit of habits) {
      const key = String(habit.userId)
      map.get(key)?.push(habit as HabitDoc)
    }

    return userIds.map((id) => map.get(id)!)
  })
}
