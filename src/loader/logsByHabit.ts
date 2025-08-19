import DataLoader from 'dataloader'
import { HabitLog, type HabitLogDoc } from '../models/habitLog'

import type { Types } from 'mongoose'

export function createLogsByHabitLoader() {
  return new DataLoader<string, HabitLogDoc[]>(async (habitIds) => {
    const objectIds = habitIds.map((id) => id as unknown as Types.ObjectId)
    const logs = await HabitLog.find({ habitId: { $in: objectIds } })
      .sort({ date: 1 })
      .lean()

    const map = new Map<string, HabitLogDoc[]>()
    for (const id of habitIds) map.set(id, [])
    for (const log of logs) {
      const key = String(log.habitId)
      map.get(key)!.push(log as HabitLogDoc)
    }
    return habitIds.map((id) => map.get(id)!)
  })
}
