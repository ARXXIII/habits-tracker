import type { Resolvers } from '../__generated__/types'
import { Habit } from '../models/habit'
import { HabitLog } from '../models/habitLog'
import { DateScalar, ObjectId } from '../scalars'

export const resolvers: Resolvers = {
  Date: DateScalar,
  ObjectId: ObjectId,
  Query: {
    health: () => 'ok',
    habits: async () => Habit.find().lean(),
    habit: async (_parent, { id }) => Habit.findById(id).lean() ?? null,
  },

  Mutation: {
    createHabit: async (_p, { input }) => {
      const doc = await Habit.create({
        title: input?.title.trim(),
        description: input?.description?.trim(),
        regularity: input?.regularity ?? 'DAILY',
      })
      return doc.toObject()
    },
    updateHabitStatus: async (_p, { habitId, status }) => {
      const existing = await HabitLog.findOne({ habitId, status })
      if (existing) {
        return {
          __typename: 'HabitLogAlreadyExists',
          message: 'Log already exists for this habit',
          existingLogId: existing._id,
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
    },
  },

  Habit: {
    id: (h) => String((h as any)._id ?? (h as any).id),
    logs: (src, _args, ctx) => ctx.loaders.logsByHabit.load(String(src._id)),
  },

  HabitLog: {
    id: (l) => String((l as any)._id ?? (l as any).id),
    habitId: (l) => String((l as any).habitId),
  },
}
