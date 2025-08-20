import { Schema, model, type InferSchemaType, Types } from 'mongoose'

const HabitLogSchema = new Schema(
  {
    habitId: {
      type: Schema.Types.ObjectId,
      ref: 'Habit',
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['COMPLETED', 'FAILED'],
      required: true,
      default: 'COMPLETED',
    },
    createdAt: { type: Date, default: () => new Date() },
  },
  { versionKey: false },
)

HabitLogSchema.index({ habitId: 1, createdAt: 1 }, { unique: true })

export type HabitLogDoc = InferSchemaType<typeof HabitLogSchema> & {
  _id: Types.ObjectId
}
export type HabitLogLean = HabitLogDoc

export const HabitLog = model<HabitLogDoc>('HabitLog', HabitLogSchema)
