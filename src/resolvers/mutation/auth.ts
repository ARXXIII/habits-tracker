import { GraphQLError } from 'graphql'
import { User } from '../../models/user'
import type { MutationResolvers } from '../../__generated__/types'
import { hashPassword, verifyPassword } from '../../utils/password'
import {
  signRefreshToken,
  signToken,
  verifyRefreshToken,
} from '../../utils/jwt'
import type { GraphQLContext } from '../../context'

function setRefreshCookie(res: Response, token: string) {
  res.headers.append(
    'Set-Cookie',
    `refreshToken=${token}; HttpOnly; Path=/; Max-Age=${
      60 * 60 * 24 * 7
    }; Secure; SameSite=Strict`,
  )
}

export const AuthMutation: MutationResolvers = {
  register: async (_p, { input }) => {
    try {
      const { password, ...rest } = input
      const hashedPassword = await hashPassword(password)

      const user = await User.create({
        ...rest,
        password: hashedPassword,
      })
      const token = signToken(user.id)

      return {
        __typename: 'AuthPayload',
        user: user.toObject(),
        token: token,
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
  login: async (_p, { input }) => {
    const { email, password } = input

    const user = await User.findOne({ email: email.trim().toLowerCase() })
    if (!user) {
      return {
        __typename: 'UserNotFoundError',
      }
    }

    const isValid = verifyPassword(user.password, password)
    if (!isValid) throw new Error('Invalid password')

    const token = signToken(user.id)

    return {
      __typename: 'AuthPayload',
      user: user.toObject(),
      token: token,
    }
  },
  refreshToken: async (_p, _args, ctx) => {
    const req: Request = ctx.request
    const res: Response = ctx.response
    const cookie = req.headers.get('cookie') ?? ''
    const refreshToken = cookie
      .split('; ')
      .find((c) => c.startsWith('refreshToken='))
      ?.split('=')[1]

    if (!refreshToken) {
      return {
        __typename: 'NoRefreshTokenError',
      }
    }

    try {
      const payload = verifyRefreshToken(refreshToken)
      const token = signToken(payload.userId)
      const newRefresh = signRefreshToken(payload.userId)
      setRefreshCookie(res, newRefresh)
      return { token }
    } catch {
      throw new GraphQLError('INVALID_REFRESH_TOKEN')
    }
  },
  logout: async (_p, _args, ctx) => {
    const res: Response = ctx.response
    res.headers.append(
      'Set-Cookie',
      'refreshToken=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Strict',
    )
    return true
  },
}
