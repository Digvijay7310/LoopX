import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: true,
    },
    reason: {
      type: String,
      required: true,
      maxLength: 1000,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'resolved'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

reportSchema.index({ user: 1, video: 1 }, { unique: true });

const Report = mongoose.model('Report', reportSchema);

export { Report };
