import { model, Schema, Model, Document } from 'mongoose';
import { IBaseModel } from './BaseModel';

export interface IProfissional extends Document, IBaseModel {
  nome: string
  telefone?: string;
  email?: string;
  cpf?: string;
  instalador?: boolean;
  vistoriador?: boolean;
}

const profissionalSchema: Schema = new Schema<IProfissional>({
  nome: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  telefone: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 255,
  },
  email: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 255,
  },
  cpf: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 255,
  },
  instalador: {
    type: Boolean,
    required: false,
  },
  vistoriador: {
    type: Boolean,
    required: false,
  },
});

export const Profissional: Model<IProfissional> = model<IProfissional>('t_profissional', profissionalSchema);