import type DataLoader from 'dataloader'
import type { HabitDoc } from './models/habit'
import { User, type UserDoc } from './models/user'
import type { HabitLogDoc } from './models/habit-log'
import { GraphQLError } from 'graphql'
import { verifyToken } from './utils/jwt'
import { createLogsByHabitLoader } from './loaders/logs-by-habit'
import { createHabitsByUserLoader } from './loaders/habits-by-user'

export type Loaders = {
  habitsByUser: DataLoader<string, HabitDoc[], string>
  logsByHabit: DataLoader<string, HabitLogDoc[], string>
}

export type GraphQLContext = {
  request: Request
  response: Response
  user: UserDoc | null
  loaders: Loaders
}

export function requireAuth(ctx: GraphQLContext): UserDoc {
  if (!ctx.user) throw new GraphQLError('UNAUTHENTICATED')
  return ctx.user
}

export async function createContext({
  request,
  response,
}: {
  request: Request
  response: Response
}): Promise<GraphQLContext> {
  const authHeader = request.headers.get('authorization') ?? ''
  let user: UserDoc | null = null

  if (authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.slice(7)
      const payload = verifyToken(token)
      user = (await User.findById(payload.userId).lean()) as any
    } catch {
      user = null
    }
  }

  return {
    user,
    request,
    response,
    loaders: {
      habitsByUser: createHabitsByUserLoader(),
      logsByHabit: createLogsByHabitLoader(),
    },
  }
}
