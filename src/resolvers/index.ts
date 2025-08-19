import { GraphQLScalarType, Kind } from 'graphql'
import type { Resolvers } from '../__generated__/types'
import { Habit } from '../models/habit'
import { HabitLog } from '../models/habitLog'
import { toUtc } from '../utils/date'

const normalize = (date: string) => {
  return toUtc(String(date))
}

export const DateScalar = new GraphQLScalarType({
  name: 'Date',
  serialize: (value: unknown) => {
    const d = value instanceof Date ? value : new Date(String(value))
    if (Number.isNaN(d.getTime()))
      throw new TypeError('Date serialization error')
    return d.toISOString()
  },
  parseValue: (value: unknown) => {
    if (typeof value !== 'string')
      throw new TypeError('Date must be ISO string')
    return new Date(value)
  },
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) throw new TypeError('Date must be ISO string')
    return new Date(ast.value)
  },
})

export const resolvers: Resolvers = {
  Date: DateScalar,
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
      })
      return { id: String(doc.id), ...doc.toObject() }
    },
    markHabitCompleted: async (_p, { habitId, date }) => {
      try {
        const log = await HabitLog.create({
          habitId,
          date: date ? normalize(date) : new Date(),
          completed: true,
        })
        return { id: String(log.id), ...log.toObject() }
      } catch (err: any) {
        if (err?.code === 11000) {
          throw new Error('LOG_ALREADY_EXIST_FOR_THIS_DAY')
        }
        throw err
      }
    },
    markHabitUncompleted: async (_p, { habitId, date }) => {
      try {
        const log = await HabitLog.create({
          habitId,
          date: date ? normalize(date) : new Date(),
          completed: false,
        })
        return { id: String(log.id), ...log.toObject() }
      } catch (err: any) {
        if (err?.code === 11000) {
          throw new Error('LOG_ALREADY_EXIST_FOR_THIS_DAY')
        }
        throw err
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
