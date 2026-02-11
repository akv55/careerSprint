// CV model for MongoDB
import mongoose, { Schema, Document } from 'mongoose';

export interface ICV extends Document {
  userId: string;
  fileName: string;
  fileUrl: string;
  content: string;
  analysis?: {
    skills: string[];
    experience: string[];
    education: string[];
    insights: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const cvSchema = new Schema<ICV>(
  {
    userId: { type: String, required: true },
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    content: { type: String, required: true },
    analysis: {
      skills: [String],
      experience: [String],
      education: [String],
      insights: String,
    },
  },
  { timestamps: true }
);

export const CV = mongoose.models.CV || mongoose.model<ICV>('CV', cvSchema);
