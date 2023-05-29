import { Cliente, ICliente } from '../models/Cliente';

  //TODO: Trocar identificador por CPF, ou CNPJ para ser mais único
  //TODO: Adicionar hora na data
export class ClienteService {
  constructor() { }

  async createCliente(cliente: ICliente) {
    const newCliente = new Cliente(cliente);

    const clienteSaved = await newCliente.save();

    return clienteSaved;
  }

  async getClientes() {
    const clientes = await Cliente.find();

    return clientes;
  }

  async getClienteById(id: string) {
    const cliente = await Cliente.findById(id);

    return cliente;
  }

  async getClienteByTelefone(telefone: string) {
    const cliente = await Cliente.findOne({ telefone: telefone });

    return cliente;
  }

  async getClienteByCpf(cpf: string) {
    const cliente  = await Cliente.findOne({ cpf: cpf });

    return cliente;
  }

  async updateCliente(id: string, cliente: ICliente) {
    const clienteToUpdate = await this.getClienteById(id);

    if (!clienteToUpdate) throw { message: 'Cliente não encontrado' };

    clienteToUpdate.nome = cliente.nome;
    clienteToUpdate.cpf = cliente.cpf;
    clienteToUpdate.email = cliente.email;
    clienteToUpdate.telefone = cliente.telefone;
    clienteToUpdate.endereco = cliente.endereco;
    clienteToUpdate.cnpj = cliente.cnpj;
    
    const clienteUpdated = await clienteToUpdate.save();

    return clienteUpdated;
  }
    
}