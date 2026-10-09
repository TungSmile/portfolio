import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ContactSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Vui lòng nhập họ và tên'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Vui lòng nhập địa chỉ email'],
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: [true, 'Vui lòng nhập nội dung tin nhắn'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Contact =
  mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;
