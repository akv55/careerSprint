// Exam result model for MongoDB
import mongoose, { Schema, Document } from 'mongoose';

export interface IExamResult extends Document {
  userId: string;
  examId: string;
  answers: Record<string, string>;
  score: number;
  feedback: {
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  };
  interviewReadiness: number;
  createdAt: Date;
  updatedAt: Date;
}

const examResultSchema = new Schema<IExamResult>(
  {
    userId: { type: String, required: true },
    examId: { type: String, required: true },
    answers: { type: Map, required: true },
    score: { type: Number, required: true },
    feedback: {
      strengths: [String],
      weaknesses: [String],
      recommendations: [String],
    },
    interviewReadiness: { type: Number, required: true },
  },
  { timestamps: true }
);

export const ExamResult = mongoose.models.ExamResult || mongoose.model<IExamResult>('ExamResult', examResultSchema);
