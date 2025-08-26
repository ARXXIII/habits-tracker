import { User } from '../../models/user'
import { RefreshToken } from '../../models/refresh-token'

import { requireAuth } from '../../context'
import { hashPassword, verifyPassword } from '../../utils/password'
import {
  generateTokens,
  getOrCreateTokens,
  rotateRefreshToken,
} from '../service/auth.service'

import type { MutationResolvers } from '../../__generated__/types'

export const AuthMutation: MutationResolvers = {
  register: async (_p, { input }) => {
    try {
      const { password, ...rest } = input
      const hashedPassword = await hashPassword(password)

      const user = await User.create({
        ...rest,
        password: hashedPassword,
      })
      const { accessToken, refreshToken } = await generateTokens(user.id)

      return {
        __typename: 'AuthPayload',
        user: user.toObject(),
        accessToken,
        refreshToken,
      }
    } catch (err: any) {
      if (err.code === 11000) {
        return { __typename: 'UserAlreadyExistsError' }
      }
      throw err
    }
  },

  login: async (_p, { email, password }) => {
    const user = await User.findOne({ email: email.trim().toLowerCase() })
    if (!user) {
      return { __typename: 'UserNotFoundError' }
    }

    const isValid = verifyPassword(user.password, password)
    if (!isValid) {
      return { __typename: 'InvalidInputError' }
    }

    const { accessToken, refreshToken } = await getOrCreateTokens(user.id)

    return {
      __typename: 'AuthPayload',
      user: user.toObject(),
      accessToken,
      refreshToken,
    }
  },

  refresh: async (_p, { token }) => {
    if (!token) {
      return { __typename: 'InvalidRefreshTokenError' }
    }

    const { accessToken, refreshToken } = await rotateRefreshToken(token)

    return {
      __typename: 'RefreshPayload',
      accessToken,
      refreshToken,
    }
  },

  logout: async (_p, _args, ctx) => {
    const authUser = requireAuth(ctx)
    await RefreshToken.deleteMany({ userId: authUser._id })
    return true
  },
}
