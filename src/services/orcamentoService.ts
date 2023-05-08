import { IOrcamento, Orcamento } from '../models/Orcamento';
import { Visita } from '../models/Visita';
import { StatusOrcamentoEnum } from '../models/enums/StatusOrcamentoEnum';
import { StatusVisitaEnum } from '../models/enums/statusVisitaEnum';
import { ClienteService } from './clienteService';

export class OrcamentoService{
  constructor() { }

  clienteService = new ClienteService();

    //TODO: Trocar identificador por CPF, ou CNPJ para ser mais único
  //TODO: Adicionar hora na data
  async createOrcamento(orcamento: IOrcamento) {
    const newOrcamento = new Orcamento(orcamento);

    const cliente = await this.clienteService.getClienteByTelefone(orcamento.cliente.telefone);
    const visita = await Visita.findById(orcamento.visita._id);    

    if(visita){
      visita.status = StatusVisitaEnum.ORCAMENTO_CRIADO;
      visita.save()
    }

    newOrcamento.status = StatusOrcamentoEnum.PENDENTE;

    if (cliente) {
      newOrcamento.cliente = cliente._id;
    }else{
      throw { message: 'Cliente não encontrado' };
    }

    if (visita) {
      newOrcamento.visita = visita._id;
    }

    const orcamentoSaved = await newOrcamento.save();

    return orcamentoSaved;
  }

  async getOrcamentos() {
    const orcamentos = await Orcamento.find().populate('cliente').populate('status');

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
  
}