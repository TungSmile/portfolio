import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  id: string;
  title: string;
  category: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
  link?: string;
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
      required: [true, 'Phân loại dự án là bắt buộc (ví dụ: (Client), (Personal))'],
      trim: true,
    },
    col1Img1: {
      type: String,
      required: [true, 'URL ảnh cột 1 (trên) là bắt buộc'],
      trim: true,
    },
    col1Img2: {
      type: String,
      required: [true, 'URL ảnh cột 1 (dưới) là bắt buộc'],
      trim: true,
    },
    col2Img: {
      type: String,
      required: [true, 'URL ảnh cột 2 (chính) là bắt buộc'],
      trim: true,
    },
    link: {
      type: String,
      default: '#',
      trim: true,
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
