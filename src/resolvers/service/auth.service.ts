import { randomUUIDv7 } from 'bun'
import { signToken } from '../../utils/jwt'
import { RefreshToken } from '../../models/refresh-token'
import { GraphQLError } from 'graphql'

const REFRESH_TTL = 1000 * 60 * 60 * 24 * 30 // 30 days

export const generateTokens = async (userId: string) => {
  const accessToken = signToken(userId)
  const token = randomUUIDv7()
  const expiresIn = new Date(Date.now() + REFRESH_TTL)

  await RefreshToken.create({ userId, token, expiresIn })

  return { accessToken, refreshToken: token }
}

export const getOrCreateTokens = async (userId: string) => {
  const existingToken = await RefreshToken.findOne({
    userId,
    expiresIn: { $gt: new Date() },
  })

  if (existingToken) {
    const accessToken = signToken(userId)
    return { accessToken, refreshToken: existingToken.token }
  }

  return generateTokens(userId)
}

export const rotateRefreshToken = async (token: string) => {
  const existing = await RefreshToken.findOne({ token })
  if (!existing) throw new GraphQLError('Invalid refresh token')
  if (existing.expiresIn < new Date()) {
    await existing.deleteOne()
    throw new GraphQLError('Refresh token expired')
  }

  await existing.deleteOne()
  return generateTokens(existing.userId.toString())
}
