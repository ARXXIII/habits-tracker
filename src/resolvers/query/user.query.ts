import { User } from '../../models/user'
import type { QueryResolvers } from '../../__generated__/types'
import { requireAuth } from '../../context'

export const UserQuery: QueryResolvers = {
  user: async (_p, _args, ctx) => {
    const authUser = requireAuth(ctx)

    const user = await User.findById(authUser._id)
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
