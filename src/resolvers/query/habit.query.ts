import { Habit } from '../../models/habit'
import type { QueryResolvers } from '../../__generated__/types'

export const HabitQuery: QueryResolvers = {
  health: () => 'ok',
  habits: async () => Habit.find().lean(),
  habit: async (_p, { id }) => Habit.findById(id).lean() ?? null,
}
