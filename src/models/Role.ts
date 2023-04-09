import { model, Schema, Model, Document } from 'mongoose';

export interface IRole extends Document {
  name: string;
}

const userSchema: Schema = new Schema<IRole>({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

export const Role: Model<IRole> = model<IRole>('t_role', userSchema);