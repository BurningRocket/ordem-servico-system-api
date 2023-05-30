import { IOrcamento, Orcamento } from '../models/Orcamento';
import { Visita } from '../models/Visita';
import { StatusOrcamentoEnum } from '../models/enums/StatusOrcamentoEnum';
import { StatusVisitaEnum } from '../models/enums/statusVisitaEnum';
import { ClienteService } from './clienteService';

export class OrcamentoService{
  constructor() { }

  clienteService = new ClienteService();

  async createOrcamento(orcamento: IOrcamento) {
    const newOrcamento = new Orcamento(orcamento);

    const cliente = await this.clienteService.getClienteByTelefone(orcamento.cliente.telefone);
    const visita = await Visita.findById(orcamento.visita._id);    

    if(visita){
      newOrcamento.visita = visita._id;
      visita.status = StatusVisitaEnum.ORCAMENTO_CRIADO;
      visita.save()
    }

    newOrcamento.status = StatusOrcamentoEnum.PENDENTE;

    if (cliente) {
      newOrcamento.cliente = cliente._id;
    }else{
      throw { message: 'Cliente não encontrado' };
    }

    const orcamentoSaved = await newOrcamento.save();

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
  
}