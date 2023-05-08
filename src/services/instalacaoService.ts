import { IInstalacao, Instalacao } from '../models/Instalacao';
import { ClienteService } from './clienteService';
import { StatusInstalacaoEnum } from '../models/enums/statusInstalacaoEnum';

export class InstalacaoService{
  constructor() { }

  clienteService = new ClienteService();

  async createInstalacao(instalacao: IInstalacao) {
    const newInstalacao = new Instalacao(instalacao);

    const cliente = await this.clienteService.getClienteByTelefone(instalacao.cliente.telefone);

    newInstalacao.status = StatusInstalacaoEnum.PENDENTE;

    if (!cliente) {
      const clienteCreated = await this.clienteService.createCliente(instalacao.cliente);
      newInstalacao.cliente = clienteCreated._id;
    } else {
      newInstalacao.cliente = cliente._id;
    }

    const instalacaoSaved = await newInstalacao.save();

    return instalacaoSaved;
  }

  async getInstalacaos() {
    const instalacaos = await Instalacao.find().populate('cliente');

    return instalacaos;
  }

  async finalizarInstalacao(instalacao: IInstalacao) {
    
    instalacao.status = StatusInstalacaoEnum.EXECUTADA;

    const instalacaoSaved = await Instalacao.findByIdAndUpdate(instalacao._id, instalacao);

    return instalacaoSaved;
  }

  async faturarInstalacao(instalacao: IInstalacao) {
    
    instalacao.status = StatusInstalacaoEnum.FATURADA;

    const instalacaoSaved = await Instalacao.findByIdAndUpdate(instalacao._id, instalacao);

    return instalacaoSaved;
  }
  
}