import { model, Schema, Model, Document } from 'mongoose';
import { ICliente } from './Cliente';
import { IBaseModel } from './BaseModel';
import { StatusInstalacaoEnum } from './enums/statusInstalacaoEnum';
import { IOrcamento } from './Orcamento';
import { IProfissional } from './Profissional';

export interface IInstalacao extends Document, IBaseModel {
  cliente: ICliente['_id'];
  orcamento: IOrcamento['_id'];
  profissional: IProfissional['_id'];
  status: string;
  dataInstalacao: [Date, Date];
  observacao: string;
  endereco: string;
  descricao?: string;
  quantidadeCaixas?: number;
  statusPagamento?: string;
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
  profissional: {
    type: Schema.Types.ObjectId,
    ref: 't_profissional',
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
  quantidadeCaixas: {
    type: Number,
    required: false,
  },
  statusPagamento: {
    type: String,
    required: false,
    enum: ['SIM', 'NÃO', 'PENDENTE'],
  },
});

export const Instalacao: Model<IInstalacao> = model<IInstalacao>('t_instalacao', instalacaoSchema);