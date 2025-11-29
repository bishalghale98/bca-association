import mongoose, { Document, Model } from "mongoose";

export interface IResetToken extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
}

const resetTokenSchema = new mongoose.Schema<IResetToken>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

export default (mongoose.models.ResetToken as Model<IResetToken>) ||
  mongoose.model<IResetToken>("ResetToken", resetTokenSchema);
