import { Habit } from '../../models/habit'
import { HabitLog } from '../../models/habit-log'
import { endOfDay, startOfDay } from '../../utils/date'
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
      const habit = await Habit.findById(habitId)
      if (!habit) {
        return {
          __typename: 'HabitNotFoundError',
          message: 'Habit not found',
          habitId: habitId,
        }
      }

      const start = startOfDay(new Date())
      const end = endOfDay(new Date())

      const isLogAlreadyExists = await HabitLog.findOne({
        habitId,
        createdAt: { $gte: start, $lte: end },
      })

      if (isLogAlreadyExists) {
        return {
          __typename: 'HabitLogAlreadyExists',
          message: 'Log already exists',
          logId: isLogAlreadyExists._id,
        }
      }

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
