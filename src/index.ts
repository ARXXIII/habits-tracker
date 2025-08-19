import { join } from 'node:path'
import { createServer } from 'node:http'
import { readFileSync, readdirSync } from 'node:fs'
import { config } from './config'
import { connectDB } from './db'
import { resolvers } from './resolvers'
import { createYoga, createSchema } from 'graphql-yoga'
import { createLogsByHabitLoader } from './loaders/logsByHabit'
import type { GraphQLContext } from './types'

const schemaDir = join(process.cwd(), 'src', 'graphql')
const typeDefs = readdirSync(schemaDir)
  .filter((f) => f.endsWith('.graphql'))
  .map((f) => readFileSync(join(schemaDir, f), 'utf-8'))
  .join('\n')

const schema = createSchema<GraphQLContext>({
  typeDefs,
  resolvers,
})

const yoga = createYoga<GraphQLContext>({
  schema,
  context: async () => ({
    loaders: {
      logsByHabit: createLogsByHabitLoader(),
    },
  }),
})

await connectDB()

const server = createServer(yoga)
server.listen(config.port, () => {
  console.log(`http://localhost:${config.port}/graphql`)
})
