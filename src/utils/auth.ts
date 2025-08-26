import { verifyToken } from './jwt'
import { User } from '../models/user'

export function extractAuthToken(authHeader: string) {
  const match = /^\s*(?:Bearer\s+)?(.+?)\s*$/.exec(authHeader)
  return match ? match[1] : null
}

async function getUserByJwt(token: string) {
  try {
    const payload = verifyToken(token)
    return await User.findById(payload.userId)
  } catch (error) {
    console.error('Invalid JWT token', error)
    return null
  }
}

export async function getUserFromAuthHeader(authHeader: string) {
  const token = extractAuthToken(authHeader)
  if (!token) return null
  return await getUserByJwt(token)
}
