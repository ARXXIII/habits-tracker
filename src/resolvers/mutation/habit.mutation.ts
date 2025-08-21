import { Habit } from '../../models/habit'
import { HabitLog } from '../../models/habit-log'
import { HabitService } from '../service/habit.service'
import type { MutationResolvers } from '../../__generated__/types'

export const HabitMutation: MutationResolvers = {
  createHabit: async (_p, { input }) => {
    const doc = await Habit.create({
      title: input?.title.trim(),
      description: input?.description?.trim(),
      regularity: input?.regularity ?? 'DAILY',
    })
    return doc.toObject()
  },

  logHabit: async (_p, { habitId, status }) => {
    try {
      const res = await HabitService.logHabit(habitId, status)
      if (!res.ok) return res

      const log = await HabitLog.create({
        habitId,
        status,
      })

      return {
        __typename: 'HabitLog',
        ...log.toObject(),
      }
    } catch (err) {
      throw err
    }
  },
}
