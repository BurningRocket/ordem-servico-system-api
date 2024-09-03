import { IVisita, Visita } from '../models/Visita';
import { ClienteService } from './clienteService';
import { StatusVisitaEnum } from '../models/enums/statusVisitaEnum';

export class VisitaService{
  constructor() { }

  clienteService = new ClienteService();

  async createVisita(visita: IVisita) {
    const newVisita = new Visita(visita);

    const cliente = await this.clienteService.getClienteByCpf(visita.cliente.cpf);

    newVisita.status = StatusVisitaEnum.PENDENTE;

    if (!cliente) {
      const clienteCreated = await this.clienteService.createCliente(visita.cliente);
      newVisita.cliente = clienteCreated._id;
    } else {
      newVisita.cliente = cliente._id;
    }

    const visitaSaved = await newVisita.save();

    return visitaSaved;
  }

  async getVisitas() {
    const visitas = await Visita.find().populate('cliente').populate('profissional');

    return visitas;
  }

  async getOpenVisitas(){
    const statusOpen = [StatusVisitaEnum.PENDENTE, StatusVisitaEnum.EXECUTADA];

    const visitas = await Visita.find({status: { $in: statusOpen }}).populate('cliente').populate('profissional');

    return visitas;
  }

  async finalizarVisita(visita: IVisita) {
    
    visita.status = StatusVisitaEnum.EXECUTADA;

    const visitaSaved = await Visita.findByIdAndUpdate(visita._id, visita);

    return visitaSaved;
  }

  async getTotalVisitasMes(){
    const statusFinished = [StatusVisitaEnum.EXECUTADA, StatusVisitaEnum.ORCAMENTO_CRIADO];

    const visitas = await Visita.find({status: { $in: statusFinished }, createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }});

    return visitas.length;
  }

  async getTotalVisitasMesAnterior(){
    const statusFinished = [StatusVisitaEnum.EXECUTADA, StatusVisitaEnum.ORCAMENTO_CRIADO];

    const visitas = await Visita.find({status: { $in: statusFinished }, createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), $lte: new Date(new Date().getFullYear(), new Date().getMonth(), 0) }});

    return visitas.length;
  }
  
  async getExecutadasAno(){
    const statusFinished = [StatusVisitaEnum.EXECUTADA, StatusVisitaEnum.ORCAMENTO_CRIADO];

    const visitas = await Visita.find({status: { $in: statusFinished }, createdAt: { $gte: new Date(new Date().getFullYear(), 0, 1), $lte: new Date(new Date().getFullYear(), 11, 31) }});

    return visitas;
  }

  async updateVisita(visita: IVisita) {
    const visitaUpdated = await Visita.findByIdAndUpdate(visita._id, visita);

    return visitaUpdated;
  }

  async deleteVisita(visitaId: string) {
    const visitaDeleted = await Visita.findByIdAndDelete(visitaId);

    return visitaDeleted;
  }
}
