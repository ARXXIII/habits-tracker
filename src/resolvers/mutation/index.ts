import { AuthMutation } from './auth'
import { UserMutation } from './user.mutation'
import { HabitMutation } from './habit.mutation'

export const mutation = {
  ...AuthMutation,
  ...UserMutation,
  ...HabitMutation,
}
