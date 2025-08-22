import { Schema, model, type InferSchemaType, Types } from 'mongoose'

const HabitSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: null },
    regularity: {
      type: String,
      enum: ['DAILY', 'WEEKLY', 'MONTHLY'],
      required: true,
      default: 'DAILY',
    },
  },
  { versionKey: false, timestamps: true },
)

HabitSchema.index({ userId: 1, createdAt: 1 }, { unique: true })

export type HabitDoc = InferSchemaType<typeof HabitSchema> & {
  _id: Types.ObjectId
}
export type HabitLean = HabitDoc

export const Habit = model<HabitDoc>('Habit', HabitSchema)
