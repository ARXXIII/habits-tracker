import { join } from 'node:path'
import { readFileSync, readdirSync } from 'node:fs'

import { resolvers } from '../resolvers'
import { createSchema } from 'graphql-yoga'
import type { GraphQLContext } from '../context'

const schemaDir = join(process.cwd(), 'src', 'graphql')
const typeDefs = readdirSync(schemaDir)
  .filter((f) => f.endsWith('.graphql'))
  .map((f) => readFileSync(join(schemaDir, f), 'utf-8'))
  .join('\n')

export const schema = createSchema<GraphQLContext>({
  typeDefs,
  resolvers,
})
