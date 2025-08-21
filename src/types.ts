import type DataLoader from 'dataloader'
import type { HabitDoc } from './models/habit'
import type { HabitLogDoc } from './models/habit-log'

export type Loaders = {
  habitsByUser: DataLoader<string, HabitDoc[], string>
  logsByHabit: DataLoader<string, HabitLogDoc[], string>
}

export type GraphQLContext = {
  loaders: Loaders
}
