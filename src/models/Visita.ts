import { model, Schema, Model, Document } from 'mongoose';
import { ICliente } from './Cliente';
import { IBaseModel } from './BaseModel';
import { StatusVisitaEnum } from './enums/statusVisitaEnum';
import { IProfissional } from './Profissional';

export interface IVisita extends Document, IBaseModel {
  cliente: ICliente['_id'];
  profissional: IProfissional['_id'];
  status: string;
  dataVisita: Date;
  observacao: string;
  formaContato: string;
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
  profissional: {
    type: Schema.Types.ObjectId,
    ref: 't_profissional',
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: StatusVisitaEnum.PENDENTE,
  },
  dataVisita: {
    type: Date,
    required: true,
  },
  observacao: {
    type: String,
    required: false,
  },
  formaContato: {
    type: String,
    required: true,
    enum: ['SITE', 'BALCÃO', 'TELEFONE'],
  },
  notificarWpp: {
    type: Boolean,
    required: true,
    default: false,
  },
  endereco: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: false,
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

export const Visita: Model<IVisita> = model<IVisita>('t_visita', visitaSchema);