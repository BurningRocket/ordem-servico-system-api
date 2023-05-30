import { IProfissional, Profissional } from '../models/Profissional';

export class ProfissionalService{
  constructor() { }

  async createProfissional(profissional: IProfissional) {
    const newProfissional = new Profissional(profissional);

    const profissionalSaved = await newProfissional.save();

    return profissionalSaved;
  }

  async getProfissionais() {
    const profissionais = await Profissional.find();

    return profissionais;
  }

  async getInstaladores() {
    const profissionais = await Profissional.find({instalador: true});

    return profissionais;
  }

  async getVistoriadores() {
    const profissionais = await Profissional.find({vistoriador: true});

    return profissionais;
  }

}