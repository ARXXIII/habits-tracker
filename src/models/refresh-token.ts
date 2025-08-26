import { Schema, model, type InferSchemaType } from 'mongoose'

const BUFFER_TIME_SECONDS = 60 * 60 // 3600 seconds = 1 hour

const RefreshTokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: { type: String, required: true, unique: true },
    expiresIn: { type: Date, required: true },
  },
  { versionKey: false, timestamps: { createdAt: true, updatedAt: false } },
)

RefreshTokenSchema.index(
  { expiresIn: 1 },
  { expireAfterSeconds: BUFFER_TIME_SECONDS },
)

export type RefreshTokenDoc = InferSchemaType<typeof RefreshTokenSchema> & {
  _id: Schema.Types.ObjectId
}
export type RefreshTokenLean = RefreshTokenDoc

export const RefreshToken = model('RefreshToken', RefreshTokenSchema)
