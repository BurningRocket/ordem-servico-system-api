import { model, Schema, Model, Document } from 'mongoose';
import { IRoles } from './Roles';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  roles: IRoles['_id'];
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
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  roles: {
    type: Schema.Types.ObjectId,
    ref: 'Roles',
    required: true,
  },
});

export const User: Model<IUser> = model<IUser>('user', userSchema);