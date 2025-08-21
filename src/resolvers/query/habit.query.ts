import { Habit } from '../../models/habit'
import type { QueryResolvers } from '../../__generated__/types'

export const HabitQuery: QueryResolvers = {
  health: () => 'ok',
  habit: async (_p, { id }) => Habit.findById(id).lean() ?? null,
  habits: async () => Habit.find().lean(),
  habitsByUser: async (_p, { userId }) => Habit.find({ userId }).lean(),
}
