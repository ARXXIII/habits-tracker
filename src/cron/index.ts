import cron from 'node-cron'
import { expireHabitLogs } from './expire-habit-logs'

export function registerCrons() {
  cron.schedule('*/59 */23 * * *', async () => {
    try {
      await expireHabitLogs()
      console.log('Habit expired')
    } catch (err) {
      console.error('Error while expiring habit logs', err)
    }
  })
}
