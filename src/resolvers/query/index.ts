import { UserQuery } from './user.query'
import { HabitQuery } from './habit.query'

export const query = {
  ...UserQuery,
  ...HabitQuery,
}
