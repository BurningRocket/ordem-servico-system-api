import { IInstalacao, Instalacao } from '../models/Instalacao';
import { ClienteService } from './clienteService';
import { StatusInstalacaoEnum } from '../models/enums/statusInstalacaoEnum';
import { OrcamentoService } from './orcamentoService';
import { StatusOrcamentoEnum } from '../models/enums/StatusOrcamentoEnum';

export class InstalacaoService{
  constructor() { }

  clienteService = new ClienteService();
  orcamentoService = new OrcamentoService();

  async createInstalacao(instalacao: IInstalacao) {
    const newInstalacao = new Instalacao(instalacao);

    const orcamento = await this.orcamentoService.getOrcamentoById(instalacao.orcamento._id);

    const cliente = await this.clienteService.getClienteByTelefone(instalacao.cliente.telefone);

    newInstalacao.status = StatusInstalacaoEnum.PENDENTE;

    if(orcamento){
      newInstalacao.orcamento = orcamento._id;
      orcamento.status = StatusOrcamentoEnum.INSTALACAO_CRIADA;
      orcamento.save();
    }

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