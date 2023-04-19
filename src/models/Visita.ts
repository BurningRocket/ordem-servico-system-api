import { model, Schema, Model, Document } from 'mongoose';
import { IRole } from './Role';
import { ICliente } from './Cliente';

//TODO: Criar um status
export interface IVisita extends Document {
  cliente: ICliente['_id'];
  dataVisita: Date;
  observacao: string;
  chegouSite: boolean;
  notificarWpp: boolean;
  endereco: string;
  descricao?: string;
}

const visitaSchema: Schema = new Schema<IVisita>({
  cliente: {
    type: Schema.Types.ObjectId,
    ref: 't_cliente',
    required: true,
  },
  dataVisita: {
    type: Date,
    required: true,
  },
  observacao: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 255,
  },
  chegouSite: {
    type: Boolean,
    required: true,
  },
  notificarWpp: {
    type: Boolean,
    required: true,
    default: false,
  },
  endereco: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  descricao: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 255,
  },
});

export const Visita: Model<IVisita> = model<IVisita>('t_visita', visitaSchema);