import cron from 'node-cron'
import { join } from 'node:path'
import { createServer } from 'node:http'
import { readFileSync, readdirSync } from 'node:fs'
import { createYoga, createSchema } from 'graphql-yoga'

import { connectDB } from './db'
import { config } from './config'
import { resolvers } from './resolvers'
import { expireHabitLogs } from './cron/expire-habit-logs'
import { createLogsByHabitLoader } from './loaders/logs-by-habit'

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

// Prod
// cron.schedule('0 59 23 * * *', async () => {
//   try {
//     await expireHabitLogs()
//     console.log('Habit logs expiration executed successfully')
//   } catch (err) {
//     console.error('Error while expiring habit logs:', err)
//   }
// })

// Dev
cron.schedule('0 * * * * *', async () => {
  try {
    await expireHabitLogs()
    console.log('Habit logs expiration executed successfully')
  } catch (err) {
    console.error('Error while expiring habit logs:', err)
  }
})

const server = createServer(yoga)
server.listen(config.port, () => {
  console.log(`http://localhost:${config.port}/graphql`)
})
