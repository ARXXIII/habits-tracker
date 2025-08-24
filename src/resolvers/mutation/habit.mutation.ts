import { User } from '../../models/user'
import { Habit } from '../../models/habit'
import { HabitLog } from '../../models/habit-log'
import { endOfDay, startOfDay } from '../../utils/date'
import type { MutationResolvers } from '../../__generated__/types'
import { requireAuth } from '../../context'

export const HabitMutation: MutationResolvers = {
  createHabit: async (_p, { input }, ctx) => {
    const authUser = requireAuth(ctx)

    const user = await User.findById(authUser._id)
    if (!user) {
      return {
        __typename: 'UserNotFoundError',
      }
    }

    const habit = await Habit.create({
      userId: user.id,
      title: input?.title.trim(),
      description: input?.description?.trim(),
      regularity: input?.regularity,
    })

    return {
      __typename: 'Habit',
      ...habit.toObject(),
    }
  },
  createHabitLog: async (_p, { habitId, status }) => {
    const habit = await Habit.findById(habitId)
    if (!habit) {
      return {
        __typename: 'HabitNotFoundError',
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
        __typename: 'HabitLogAlreadyExistsError',
      }
    }

    const habitLog = await HabitLog.create({
      habitId,
      status,
    })

    return {
      __typename: 'HabitLog',
      ...habitLog.toObject(),
    }
  },
}
