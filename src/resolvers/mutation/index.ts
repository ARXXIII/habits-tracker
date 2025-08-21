import { UserMutation } from './user.mutation'
import { HabitMutation } from './habit.mutation'

export const mutation = {
  ...UserMutation,
  ...HabitMutation,
}
