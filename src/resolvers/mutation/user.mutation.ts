import { User } from '../../models/user'
import type { MutationResolvers } from '../../__generated__/types'

export const UserMutation: MutationResolvers = {
  createUser: async (_p, { input }) => {
    try {
      const user = await User.create({
        username: input.username.trim(),
        email: input.email.trim().toLowerCase(),
        firstName: input.firstName?.trim(),
        lastName: input.lastName?.trim(),
      })
      return {
        __typename: 'User',
        ...user.toObject(),
      }
    } catch (err: any) {
      if (err.code === 11000) {
        return {
          __typename: 'UserAlreadyExistsError',
        }
      }
      throw err
    }
  },
  deleteUser: async (_p, { id }) => {
    const user = await User.findByIdAndDelete(id)
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
  updateUser: async (_p, { id, username, firstName, lastName }) => {
    const user = await User.findByIdAndUpdate(id, {
      username: username?.trim(),
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      updatedAt: new Date(),
    })

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
