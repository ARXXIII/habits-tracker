import { User } from '../../models/user'
import { Habit } from '../../models/habit'
import { HabitLog } from '../../models/habit-log'
import { endOfDay, startOfDay } from '../../utils/date'
import type { MutationResolvers } from '../../__generated__/types'

export const HabitMutation: MutationResolvers = {
  createHabit: async (_p, { input }) => {
    try {
      const doc = await Habit.create({
        userId: input.userId,
        title: input?.title.trim(),
        description: input?.description?.trim(),
        regularity: input?.regularity ?? 'DAILY',
      })
      return doc.toObject()
    } catch (err) {
      throw err
    }
  },
  logHabit: async (_p, { userId, habitId, status }) => {
    try {
      const user = await User.findById(userId)
      if (!user) {
        return {
          __typename: 'NotFoundError',
          message: 'User not found',
          id: userId,
        }
      }

      const habit = await Habit.findById(habitId)
      if (!habit) {
        return {
          __typename: 'NotFoundError',
          message: 'Habit not found',
          id: habitId,
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
          logId: String(isLogAlreadyExists._id),
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
