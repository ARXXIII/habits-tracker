import { connectDB } from './db'
import { registerCrons } from './cron'
import './server'

await connectDB()
registerCrons()
