import { schema } from './schema'
import { config } from './config'
import { createYoga } from 'graphql-yoga'
import { createContext, type GraphQLContext } from './context'

export function createApp() {
  const yoga = createYoga<GraphQLContext>({
    schema,
    context: async ({ request }) => createContext({ request }),
    cors: {
      origin: `http://localhost:${config.port}`,
      credentials: true,
    },
  })

  return yoga
}
