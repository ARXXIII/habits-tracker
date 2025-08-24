import { schema } from './schema'
import { createYoga } from 'graphql-yoga'
import { createContext, type GraphQLContext } from './context'

export function createApp() {
  const yoga = createYoga<GraphQLContext>({
    schema,
    context: createContext,
  })

  return yoga
}
