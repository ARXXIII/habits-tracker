import { GraphQLError } from 'graphql'
import { getUserFromAuthHeader } from './utils/auth'
import { createLogsByHabitLoader } from './loaders/logs-by-habit'
import { createHabitsByUserLoader } from './loaders/habits-by-user'

import type DataLoader from 'dataloader'
import type { UserDoc } from './models/user'
import type { HabitDoc } from './models/habit'
import type { HabitLogDoc } from './models/habit-log'

export type Loaders = {
  habitsByUser: DataLoader<string, HabitDoc[], string>
  logsByHabit: DataLoader<string, HabitLogDoc[], string>
}

export type GraphQLContext = {
  request: Request
  user: UserDoc | null
  loaders: Loaders
}

export function requireAuth(ctx: GraphQLContext): UserDoc {
  if (!ctx.user) throw new GraphQLError('UNAUTHENTICATED')
  return ctx.user
}

export async function createContext({
  request,
}: {
  request: Request
}): Promise<GraphQLContext> {
  const user = await getUserFromAuthHeader(
    request.headers.get('authorization') ?? '',
  )

  return {
    user,
    request,
    loaders: {
      habitsByUser: createHabitsByUserLoader(),
      logsByHabit: createLogsByHabitLoader(),
    },
  }
}
