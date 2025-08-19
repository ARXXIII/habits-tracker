import type DataLoader from 'dataloader'
import type { HabitLogDoc } from './models/habitLog'

export type Loaders = {
  logsByHabit: DataLoader<string, HabitLogDoc[], string>
}

export type GraphQLContext = {
  loaders: Loaders
}
