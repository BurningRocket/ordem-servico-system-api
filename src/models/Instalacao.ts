import { model, Schema, Model, Document } from 'mongoose';
import { ICliente } from './Cliente';
import { IBaseModel } from './BaseModel';
import { StatusInstalacaoEnum } from './enums/statusInstalacaoEnum';
import { IOrcamento } from './Orcamento';

//TODO: Criar um status
export interface IInstalacao extends Document, IBaseModel {
  cliente: ICliente['_id'];
  orcamento: IOrcamento['_id'];
  status: string;
  dataInstalacao: [Date, Date];
  observacao: string;
  endereco: string;
  descricao?: string;
  tipoPagamento?: string;
  quantidadeCaixas?: number;
}

const instalacaoSchema: Schema = new Schema<IInstalacao>({
  cliente: {
    type: Schema.Types.ObjectId,
    ref: 't_cliente',
    required: true,
  },
  orcamento: {
    type: Schema.Types.ObjectId,
    ref: 't_orcamento',
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: StatusInstalacaoEnum.PENDENTE,
  },
  dataInstalacao: {
    type: [Date, Date],
    required: true,
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
  tipoPagamento: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 255,
  },
  quantidadeCaixas: {
    type: Number,
    required: false,
  },
});

export const Instalacao: Model<IInstalacao> = model<IInstalacao>('t_instalacao', instalacaoSchema);