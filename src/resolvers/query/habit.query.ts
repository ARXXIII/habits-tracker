import { Habit } from '../../models/habit'
import { HabitLog } from '../../models/habit-log'

import { requireAuth } from '../../context'
import type { QueryResolvers } from '../../__generated__/types'

export const HabitQuery: QueryResolvers = {
  habit: async (_p, { id }) => {
    const habit = await Habit.findById(id)
    if (!habit) {
      return {
        __typename: 'HabitNotFoundError',
      }
    }
    return {
      __typename: 'Habit',
      ...habit.toObject(),
    }
  },
  habits: async (_p, { userId }, ctx) => {
    const authUser = requireAuth(ctx)

    if (userId) {
      return Habit.find({ userId }).lean()
    }

    return await Habit.find({ userId: authUser._id }).lean()
  },
  habitLogs: async (_p, { habitId }) => HabitLog.find({ habitId }).lean(),
}
