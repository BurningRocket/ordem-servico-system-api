import { model, Schema, Model, Document } from 'mongoose';
import { IBaseModel } from './BaseModel';

export interface IRole extends Document, IBaseModel {
  name: string;
}

const roleSchema: Schema = new Schema<IRole>({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
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

export const Role: Model<IRole> = model<IRole>('t_role', roleSchema);