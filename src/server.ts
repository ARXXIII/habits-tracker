import { config } from './config'
import { createApp } from './app'
import { createServer } from 'node:http'

const app = createApp()
const server = createServer(app)

server.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}/graphql`)
})
