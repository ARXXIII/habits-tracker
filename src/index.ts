import { createServer } from 'node:http'
import { createYoga, createSchema } from 'graphql-yoga'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { connectDB } from './db'
import { resolvers } from './resolvers'
import { createLogsByHabitLoader } from './loader/logsByHabit'
import { config } from './config'

const schemaDir = join(process.cwd(), 'src', 'graphql')
const typeDefs = readdirSync(schemaDir)
  .filter((f) => f.endsWith('.graphql'))
  .map((f) => readFileSync(join(schemaDir, f), 'utf-8'))
  .join('\n')

const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
  context: async () => ({
    loaders: createLogsByHabitLoader(),
  }),
})

await connectDB()

const server = createServer(yoga)
server.listen(config.port, () => {
  console.log(`http://localhost:${config.port}/graphql`)
})
