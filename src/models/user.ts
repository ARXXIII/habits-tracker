import { Schema, model, type InferSchemaType, Types } from 'mongoose'

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    password: { type: String, required: true, trim: true },
    username: { type: String, trim: true, unique: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
  },
  { versionKey: false, timestamps: true },
)

export type UserDoc = InferSchemaType<typeof UserSchema> & {
  _id: Types.ObjectId
}
export type UserLean = UserDoc

export const User = model<UserDoc>('User', UserSchema)
