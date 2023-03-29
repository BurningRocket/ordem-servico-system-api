import { model, Schema, Model, Document } from 'mongoose';

export interface IRoles extends Document {
  name: string;
}

const userSchema: Schema = new Schema<IRoles>({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

export const Roles: Model<IRoles> = model<IRoles>('roles', userSchema);