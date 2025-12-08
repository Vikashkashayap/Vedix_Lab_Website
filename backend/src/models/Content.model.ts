import mongoose, { Schema, Document } from 'mongoose';

export interface IContent extends Document {
  section: string; // 'hero', 'services', 'features', 'about', 'contact'
  title?: string;
  subtitle?: string;
  description?: string;
  content?: any; // For flexible content storage
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema = new Schema<IContent>(
  {
    section: {
      type: String,
      required: true,
      unique: true,
      enum: ['hero', 'services', 'features', 'about', 'contact'],
    },
    title: {
      type: String,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    content: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IContent>('Content', ContentSchema);
