import mongoose from 'mongoose';

const { Schema } = mongoose;

const gallerySchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    camperId: { type: String, required: true, trim: true },
    thumb: { type: String, required: true, trim: true },
    original: { type: String, required: true, trim: true },
    order: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const reviewSchema = new Schema(
  {
    camperId: { type: String, required: true, trim: true },
    reviewer_name: { type: String, required: true, trim: true },
    reviewer_rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

const camperSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    rating: { type: Number, required: true, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0, min: 0 },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    form: { type: String, required: true, trim: true },
    length: { type: String, required: true, trim: true },
    width: { type: String, required: true, trim: true },
    height: { type: String, required: true, trim: true },
    tank: { type: String, required: true, trim: true },
    consumption: { type: String, required: true, trim: true },
    transmission: { type: String, required: true, trim: true },
    engine: { type: String, required: true, trim: true },
    amenities: { type: [String], default: [] },
    gallery: { type: [gallerySchema], default: [] },
    reviews: { type: [reviewSchema], default: [] },
  },
  { timestamps: true },
);

camperSchema.index({ name: 'text', description: 'text', location: 'text' });

export const Camper = mongoose.model('Camper', camperSchema);
