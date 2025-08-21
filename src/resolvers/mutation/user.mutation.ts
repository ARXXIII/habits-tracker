import { User } from '../../models/user'
import type { MutationResolvers } from '../../__generated__/types'

export const UserMutation: MutationResolvers = {
  createUser: async (_p, { input }) => {
    try {
      const doc = await User.create({
        username: input.username.trim(),
        email: input.email.trim(),
        firstName: input.firstName?.trim(),
        lastName: input.lastName?.trim(),
      })
      return doc.toObject()
    } catch (err) {
      throw err
    }
  },
  deleteUser: async (_p, { id }) => {
    try {
      const user = await User.findByIdAndDelete(id)
      if (!user) {
        return {
          __typename: 'NotFoundError',
          message: 'User not found',
          id,
        }
      }

      return {
        __typename: 'User',
        ...user.toObject(),
      }
    } catch (err) {
      throw err
    }
  },
  updateUser: async (_p, { id, username, firstName, lastName }) => {
    try {
      const user = await User.findByIdAndUpdate(id, {
        username: username?.trim(),
        firstName: firstName?.trim(),
        lastName: lastName?.trim(),
      })

      if (!user) {
        return {
          __typename: 'NotFoundError',
          message: 'User not found',
          id,
        }
      }

      return {
        __typename: 'User',
        ...user.toObject(),
      }
    } catch (err) {
      throw err
    }
  },
}
