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

function extractAuthToken(authHeader: string | null): string | null {
  if (!authHeader) return null
  const header = authHeader.trim()
  if (!header) return null
  const match = /^Bearer\s+(.+)$/i.exec(header)
  return match ? match[1].trim() : header
}

export async function createContext({
  request,
  response,
}: {
  request: Request
  response: Response
}): Promise<GraphQLContext> {
  const authHeader = request.headers.get('authorization')
  let user: UserDoc | null = null

  const token = extractAuthToken(authHeader)
  if (token) {
    try {
      const payload = verifyToken(token)
      user = await User.findById(payload.userId).lean()
    } catch (err) {
      throw new GraphQLError(`${err}`)
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
