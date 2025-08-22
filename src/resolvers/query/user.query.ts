import { User } from '../../models/user'
import type { QueryResolvers } from '../../__generated__/types'

export const UserQuery: QueryResolvers = {
  user: async (_p, { id }) => {
    const user = await User.findById(id)
    if (!user) {
      return {
        __typename: 'UserNotFoundError',
      }
    }
    return {
      __typename: 'User',
      ...user.toObject(),
    }
  },
  users: async () => User.find().lean(),
}
