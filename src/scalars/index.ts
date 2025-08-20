import { Types } from 'mongoose'
import { GraphQLError, GraphQLScalarType, Kind } from 'graphql'

const isValid = Types.ObjectId.isValid

export const ObjectId = new GraphQLScalarType({
  name: 'ObjectId',

  description:
    'A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c',

  serialize(value) {
    if (value instanceof Types.ObjectId) {
      return value.toString()
    }

    if (typeof value === 'string' && isValid(value)) {
      return value
    }

    throw new GraphQLError(
      `Expected server to produce ObjectId, got: ${value}`,
      {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      },
    )
  },

  parseValue(value) {
    if (typeof value !== 'string') {
      throw new GraphQLError(
        `Can only validate strings as ObjectId, got a: ${typeof value} ${value}`,
      )
    }

    if (!isValid(value)) {
      throw new GraphQLError('Expected ObjectId')
    }

    return new Types.ObjectId(value)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as ObjectId, got a: ${ast.kind}`,
        {
          nodes: [ast],
        },
      )
    }

    if (!isValid(ast.value)) {
      throw new GraphQLError(`Expected ObjectId, got: ${ast.value}`, {
        nodes: ast,
      })
    }

    return new Types.ObjectId(ast.value)
  },
})

export const DateScalar = new GraphQLScalarType({
  name: 'Date',
  serialize: (value: unknown) => {
    const d = value instanceof Date ? value : new Date(String(value))
    if (Number.isNaN(d.getTime()))
      throw new TypeError('Date serialization error')
    return d.toISOString()
  },
  parseValue: (value: unknown) => {
    if (typeof value !== 'string')
      throw new TypeError('Date must be ISO string')
    return new Date(value)
  },
  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING) throw new TypeError('Date must be ISO string')
    return new Date(ast.value)
  },
})
