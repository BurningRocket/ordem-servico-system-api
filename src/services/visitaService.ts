import { IVisita, Visita } from '../models/Visita';
import { ClienteService } from './clienteService';

export class VisitaService{
  constructor() { }

  clienteService = new ClienteService();

  //TODO: Trocar identificador por CPF, ou CNPJ para ser mais único
  //TODO: Adicionar hora na data
  async createVisita(visita: IVisita) {
    const newVisita = new Visita(visita);

    const cliente = await this.clienteService.getClienteByTelefone(visita.cliente.telefone);

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
    const visitas = await Visita.find().populate('cliente');

    return visitas;
  }

  async finalizarVisita(visita: IVisita) {
    const visitaSaved = await Visita.findByIdAndUpdate(visita._id, visita);

    return visitaSaved;
  }
  
}