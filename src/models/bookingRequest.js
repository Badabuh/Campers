import mongoose from 'mongoose';

const { Schema } = mongoose;

const bookingRequestSchema = new Schema(
  {
    camperId: {
      type: Schema.Types.ObjectId,
      ref: 'Camper',
      required: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
  },
  { timestamps: true },
);

bookingRequestSchema.index({ camperId: 1, createdAt: -1 });

export const BookingRequest = mongoose.model(
  'BookingRequest',
  bookingRequestSchema,
);
