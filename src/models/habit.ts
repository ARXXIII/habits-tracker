import { Schema, model, type InferSchemaType, Types } from 'mongoose'

const HabitSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: null },
    createdAt: { type: Date, default: () => new Date() },
  },
  { versionKey: false },
)

export type HabitDoc = InferSchemaType<typeof HabitSchema> & {
  _id: Types.ObjectId
}
export type HabitLean = HabitDoc

export const Habit = model<HabitDoc>('Habit', HabitSchema)
