import jwt from 'jsonwebtoken'
import { config } from '../config'

type JwtPayload = {
  userId: string
  iat?: number
  exp?: number
}

export const signToken = (userId: string) => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '15m' })
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwtSecret) as JwtPayload
}
