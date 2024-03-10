import { model, Schema, Model, Document } from 'mongoose';
import { IBaseModel } from './BaseModel';

export interface IUser extends Document, IBaseModel {
  name: string;
  email: string;
  password: string;
  role: string;
}

const userSchema: Schema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  role: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const User: Model<IUser> = model<IUser>('t_user', userSchema);