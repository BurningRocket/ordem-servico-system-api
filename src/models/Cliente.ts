import { model, Schema, Model, Document } from 'mongoose';

export interface ICliente extends Document {
  nome: string;
  cpf?: string;
  email?: string;
  telefone: string;
  endereco: string;
  cnpj?: string;
}

const clienteSchema: Schema = new Schema<ICliente>({
  nome: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  cpf: {
    type: String,
    required: false,
    minlength: 11,
    maxlength: 11,
  },
  email: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 255,
  },
  telefone: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 11,
  },
  endereco: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  cnpj: {
    type: String,
    required: false,
    minlength: 14,
    maxlength: 14,
  },
});

export const Cliente: Model<ICliente> = model<ICliente>('t_cliente', clienteSchema);