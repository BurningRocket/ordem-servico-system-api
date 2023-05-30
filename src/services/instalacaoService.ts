import { IInstalacao, Instalacao } from '../models/Instalacao';
import { ClienteService } from './clienteService';
import { StatusInstalacaoEnum } from '../models/enums/statusInstalacaoEnum';
import { OrcamentoService } from './orcamentoService';
import { StatusOrcamentoEnum } from '../models/enums/StatusOrcamentoEnum';
import { Orcamento } from '../models/Orcamento';

export class InstalacaoService{
  constructor() { }

  clienteService = new ClienteService();
  orcamentoService = new OrcamentoService();

  async createInstalacao(instalacao: IInstalacao) {
    const newInstalacao = new Instalacao(instalacao);

    const cliente = await this.clienteService.getClienteByTelefone(instalacao.cliente.telefone);
    const orcamento = await Orcamento.findById(instalacao.orcamento._id);

    if(orcamento){
      newInstalacao.orcamento = orcamento._id;
      orcamento.status = StatusOrcamentoEnum.INSTALACAO_AGENDADA;
      orcamento.save();
    }

    newInstalacao.status = StatusInstalacaoEnum.PENDENTE;

    if (cliente) {
      newInstalacao.cliente = cliente._id;
    }else{
      throw { message: 'Cliente não encontrado' };
    }

    const instalacaoSaved = await newInstalacao.save();

    return instalacaoSaved;
  }

  async getInstalacaos() {
    const instalacaos = await Instalacao.find().populate('cliente').populate('orcamento').populate('profissional');

    return instalacaos;
  }

  async getInstalacaosOpen(){
    const instalacaos = await Instalacao.find({status: StatusInstalacaoEnum.PENDENTE}).populate('cliente').populate('orcamento').populate('profissional');

    return instalacaos;
  }

  async finalizarInstalacao(instalacao: IInstalacao) {
    
    instalacao.status = StatusInstalacaoEnum.EXECUTADA;

    const instalacaoSaved = await Instalacao.findByIdAndUpdate(instalacao._id, instalacao);

    return instalacaoSaved;
  }

  async faturarInstalacao(instalacao: IInstalacao) {
    
    instalacao.status = StatusInstalacaoEnum.FATURADA;

    console.log(instalacao);

    const instalacaoSaved = await Instalacao.findByIdAndUpdate(instalacao._id, instalacao);

    return instalacaoSaved;
  }
  
}