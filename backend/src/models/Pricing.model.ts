import mongoose, { Schema, Document } from 'mongoose';

export interface IPricing extends Document {
  name: string;
  tagline: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  popular: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PricingSchema = new Schema<IPricing>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tagline: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      default: '',
    },
    features: {
      type: [String],
      required: true,
      default: [],
    },
    cta: {
      type: String,
      required: true,
      default: 'Get Started',
    },
    popular: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPricing>('Pricing', PricingSchema);
