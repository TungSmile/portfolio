import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  id: string;
  title: string;
  category: string;
  description?: string;
  role?: string;
  year?: string;
  tags?: string[];
  col1Img1?: string;
  col1Img2?: string;
  col2Img?: string;
  link?: string;
  htmlBase64?: string;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: [true, 'Mã ID dự án là bắt buộc (ví dụ: 01, 02)'],
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Tên dự án là bắt buộc'],
      trim: true,
    },
    category: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    role: {
      type: String,
      default: '',
      trim: true,
    },
    year: {
      type: String,
      default: '',
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    col1Img1: {
      type: String,
      default: '',
    },
    col1Img2: {
      type: String,
      default: '',
    },
    col2Img: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '#',
      trim: true,
    },
    htmlBase64: {
      type: String,
      default: '',
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

export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
