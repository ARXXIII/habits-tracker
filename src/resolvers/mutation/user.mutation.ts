import { User } from '../../models/user'
import { requireAuth } from '../../context'
import type { MutationResolvers } from '../../__generated__/types'

export const UserMutation: MutationResolvers = {
  deleteUser: async (_p, _args, ctx) => {
    const authUser = requireAuth(ctx)

    const user = await User.findByIdAndDelete(authUser._id)
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
  updateUser: async (_p, { username, firstName, lastName }, ctx) => {
    const authUser = requireAuth(ctx)

    const user = await User.findByIdAndUpdate(
      authUser._id,
      {
        username: username?.trim(),
        firstName: firstName?.trim(),
        lastName: lastName?.trim(),
      },
      { new: true },
    )

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
}
