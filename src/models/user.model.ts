import { Schema, model } from 'mongoose';
import { IUser } from '../types/user.type';

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

export const UserModel = model<IUser>('User', userSchema);
