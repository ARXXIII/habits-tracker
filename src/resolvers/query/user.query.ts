import { User } from '../../models/user'
import type { QueryResolvers } from '../../__generated__/types'

export const UserQuery: QueryResolvers = {
  user: async (_p, { id }) => User.findById(id).lean() ?? null,
  users: async () => User.find().lean(),
}
