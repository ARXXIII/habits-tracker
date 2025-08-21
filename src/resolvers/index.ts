import { query } from './query'
import { mutation } from './mutation'
import { DateScalar, ObjectId } from '../scalars'
import type { Resolvers } from '../__generated__/types'

export const resolvers: Resolvers = {
  Date: DateScalar,
  ObjectId: ObjectId,
  Query: query,
  Mutation: mutation,

  Habit: {
    id: (h) => String((h as any)._id ?? (h as any).id),
    logs: (src, _args, ctx) => ctx.loaders.logsByHabit.load(String(src._id)),
  },

  HabitLog: {
    id: (l) => String((l as any)._id ?? (l as any).id),
    habitId: (l) => String((l as any).habitId),
  },
}
