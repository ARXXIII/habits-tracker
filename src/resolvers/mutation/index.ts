import { AuthMutation } from './auth.mutation'
import { UserMutation } from './user.mutation'
import { HabitMutation } from './habit.mutation'

export const mutation = {
  ...AuthMutation,
  ...UserMutation,
  ...HabitMutation,
}
