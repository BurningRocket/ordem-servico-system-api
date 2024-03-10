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
    const statusAberto = [StatusInstalacaoEnum.PENDENTE, StatusInstalacaoEnum.EXECUTADA];

    const instalacaos = await Instalacao.find({status: { $in: statusAberto } }).populate('cliente').populate('orcamento').populate('profissional');

    return instalacaos;
  }

  async finalizarInstalacao(instalacao: IInstalacao) {
    
    if(instalacao.statusPagamento?.toUpperCase() == 'SIM'){
      instalacao.status = StatusInstalacaoEnum.FATURADA;
    }else{
      instalacao.status = StatusInstalacaoEnum.EXECUTADA;
    }

    const instalacaoSaved = await Instalacao.findByIdAndUpdate(instalacao._id, instalacao);

    return instalacaoSaved;
  }

  async faturarInstalacao(instalacao: IInstalacao) {
    
    instalacao.status = StatusInstalacaoEnum.FATURADA;

    instalacao.statusPagamento = 'SIM';

    const instalacaoSaved = await Instalacao.findByIdAndUpdate(instalacao._id, instalacao);

    return instalacaoSaved;
  }
  
  async getTotalInstalacoesMes(){
    const statusFinished = [StatusInstalacaoEnum.EXECUTADA, StatusInstalacaoEnum.FATURADA];

    const instalacoes = await Instalacao.find({status: { $in: statusFinished }, createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }});

    return instalacoes.length;
  }

  async getTotalInstalacoesMesAnterior(){
    const statusFinished = [StatusInstalacaoEnum.EXECUTADA, StatusInstalacaoEnum.FATURADA];

    const instalacoes = await Instalacao.find({status: { $in: statusFinished }, createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), $lte: new Date(new Date().getFullYear(), new Date().getMonth(), 0) }});

    return instalacoes.length;
  }

  async getTotalCaixasInstaladasMes(){
    const statusFinished = [StatusInstalacaoEnum.EXECUTADA, StatusInstalacaoEnum.FATURADA];

    const instalacoes = await Instalacao.find({status: { $in: statusFinished }, createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }});

    let totalCaixas = 0;

    instalacoes.forEach(instalacao => {
      totalCaixas += instalacao.quantidadeCaixas ? instalacao.quantidadeCaixas : 0;
    });

    return totalCaixas;
  }

  async getTotalCaixasInstaladasMesAnterior(){
    const statusFinished = [StatusInstalacaoEnum.EXECUTADA, StatusInstalacaoEnum.FATURADA];

    const instalacoes = await Instalacao.find({status: { $in: statusFinished }, createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), $lte: new Date(new Date().getFullYear(), new Date().getMonth(), 0) }});

    let totalCaixas = 0;

    instalacoes.forEach(instalacao => {
      totalCaixas += instalacao.quantidadeCaixas ? instalacao.quantidadeCaixas : 0;
    });

    return totalCaixas;
  }
  
  async getExecutadasAno(){
    const statusFinished = [StatusInstalacaoEnum.EXECUTADA, StatusInstalacaoEnum.FATURADA];

    const instalacoes = await Instalacao.find({status: { $in: statusFinished }, createdAt: { $gte: new Date(new Date().getFullYear(), 0, 1), $lte: new Date(new Date().getFullYear(), 11, 31) }});

    return instalacoes;
  }
}