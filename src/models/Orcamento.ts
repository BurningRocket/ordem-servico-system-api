import { Model, Schema, model, Document } from 'mongoose';
import { IBaseModel } from './BaseModel';
import { ICliente } from './Cliente';
import { IVisita } from './Visita';
import { StatusOrcamentoEnum } from './enums/StatusOrcamentoEnum';

export interface IOrcamento extends Document, IBaseModel {
  cliente: ICliente['_id'];
  visita?: IVisita['_id'];
  status: string;
  observacao?: string;
  endereco: string;
  valor: number;
  descricao?: string;
}

const orcamentoSchema: Schema = new Schema<IOrcamento>({
  cliente: {
    type: Schema.Types.ObjectId,
    ref: 't_cliente',
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: StatusOrcamentoEnum.PENDENTE,
  },
  visita: {
    type: Schema.Types.ObjectId,
    ref: 't_visita',
    required: false,
  },
  observacao: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 255,
  },
  endereco: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  valor: {
    type: Number,
    required: true,
  },
  descricao: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 255,
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

export const Orcamento: Model<IOrcamento> = model<IOrcamento>('t_orcamento', orcamentoSchema);