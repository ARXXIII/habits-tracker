import { query } from './query'
import { mutation } from './mutation'
import { DateScalar, ObjectId } from '../scalars'
import type { Resolvers } from '../__generated__/types'

export const resolvers: Resolvers = {
  Date: DateScalar,
  ObjectId: ObjectId,
  Query: query,
  Mutation: mutation,

  User: {
    id: (h) => String(h._id),
    habits: (src, _args, ctx) => ctx.loaders.habitsByUser.load(String(src._id)),
  },
  Habit: {
    id: (h) => String(h._id),
    userId: (h) => String(h.userId),
    habitLogs: (src, _args, ctx) =>
      ctx.loaders.logsByHabit.load(String(src._id)),
  },
  HabitLog: {
    id: (l) => String(l._id),
    habitId: (l) => String(l.habitId),
  },
}
