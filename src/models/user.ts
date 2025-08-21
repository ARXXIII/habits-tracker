import { Schema, model, type InferSchemaType, Types } from 'mongoose'

const UserSchema = new Schema(
  {
    email: { type: String, required: true, trim: true, unique: true },
    username: { type: String, required: true, trim: true, unique: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    createdAt: { type: Date, default: () => new Date() },
    updatedAt: { type: Date, default: () => new Date() },
  },
  { versionKey: false },
)

export type UserDoc = InferSchemaType<typeof UserSchema> & {
  _id: Types.ObjectId
}
export type UserLean = UserDoc

export const User = model<UserDoc>('User', UserSchema)
