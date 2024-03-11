import { IOrcamento, Orcamento } from '../models/Orcamento';
import { Visita } from '../models/Visita';
import { StatusOrcamentoEnum } from '../models/enums/StatusOrcamentoEnum';
import { EtapaWhatsappEnum } from '../models/enums/etapaWhatsappEnum';
import { StatusVisitaEnum } from '../models/enums/statusVisitaEnum';
import { ClienteService } from './clienteService';

export class OrcamentoService{
  constructor() { }

  clienteService = new ClienteService();

  async createOrcamento(orcamento: IOrcamento) {
    const newOrcamento = new Orcamento(orcamento);

    const cliente = await this.clienteService.getClienteByTelefone(orcamento.cliente.telefone);
    const visita = await Visita.findById(orcamento.visita._id);    

    newOrcamento.status = StatusOrcamentoEnum.PENDENTE;

    if (cliente) {
      newOrcamento.cliente = cliente._id;
    }else{
      throw { message: 'Cliente não encontrado' };
    }

    const orcamentoSaved = await newOrcamento.save();

    if(visita){
      newOrcamento.visita = visita._id;
      visita.status = StatusVisitaEnum.ORCAMENTO_CRIADO;
      visita.save()
    }

    if(cliente?.notificarWhatsapp){
      cliente.etapaWhatsapp = EtapaWhatsappEnum.CONFIRMACAO_ORCAMENTO;
      cliente.save();
    }

    return orcamentoSaved;
  }

  async getOrcamentos() {
    const orcamentos = await Orcamento.find().populate('cliente').populate('visita');

    return orcamentos;
  }

  async getOrcamentosOpen(){
    const statusOpen = [StatusOrcamentoEnum.PENDENTE, StatusOrcamentoEnum.APROVADO];

    const orcamentos = await Orcamento.find({status: { $in: statusOpen }}).populate('cliente').populate('visita');

    return orcamentos;
  }

  async aprovarOrcamento(orcamento: IOrcamento) {
    orcamento.status = StatusOrcamentoEnum.APROVADO;
    
    const orcamentoSaved = await Orcamento.findByIdAndUpdate(orcamento._id, orcamento);

    return orcamentoSaved;
  }

  async reprovarOrcamento(orcamento: IOrcamento) {
    orcamento.status = StatusOrcamentoEnum.REPROVADO;    
    
    const orcamentoSaved = await Orcamento.findByIdAndUpdate(orcamento._id, orcamento);

    return orcamentoSaved;
  }

  async getOrcamentoById(id: string) {
    const orcamento = await Orcamento.findById(id).populate('cliente').populate('visita');

    return orcamento;
  }

  async getTotalOrcamentosMes(){
    const statusFinished = [StatusOrcamentoEnum.APROVADO, StatusOrcamentoEnum.INSTALACAO_AGENDADA];

    const orcamentos = await Orcamento.find({status: { $in: statusFinished }, createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }});

    return orcamentos.length;
  }

  async getTotalOrcamentosMesAnterior(){
    const statusFinished = [StatusOrcamentoEnum.APROVADO, StatusOrcamentoEnum.INSTALACAO_AGENDADA];

    const orcamentos = await Orcamento.find({status: { $in: statusFinished }, createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth() -1, 1), $lte: new Date(new Date().getFullYear(), new Date().getMonth(), 0)  }});

    return orcamentos.length;
  }

  async getTotalOrcamentosReprovadosMes(){
    const orcamentos = await Orcamento.find({status: StatusOrcamentoEnum.REPROVADO, createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }});

    return orcamentos.length;
  }
  
  async getAprovadosAno(){
    const statusFinished = [StatusOrcamentoEnum.APROVADO, StatusOrcamentoEnum.INSTALACAO_AGENDADA];

    const orcamentos = await Orcamento.find({status: { $in: statusFinished }, createdAt: { $gte: new Date(new Date().getFullYear(), 0, 1), $lte: new Date(new Date().getFullYear(), 11, 31)  }});

    return orcamentos;
  }

}