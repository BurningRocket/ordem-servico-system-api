import { ClienteService } from './clienteService';
import { OrcamentoService } from './orcamentoService';
import { InstalacaoService } from './instalacaoService';
import { VisitaService } from './visitaService';

export class DashboardService{
  constructor() { }

  clienteService = new ClienteService();

  orcamentoService = new OrcamentoService();
  instalacaoService = new InstalacaoService();
  visitaService = new VisitaService();

  async getDashboard(){
    const totalOrcamentosMes = await this.orcamentoService.getTotalOrcamentosMes();
    const totalInstalacoesMes = await this.instalacaoService.getTotalInstalacoesMes();
    const totalCaixasMes = await this.instalacaoService.getTotalCaixasInstaladasMes();
    const totalVisitasMes = await this.visitaService.getTotalVisitasMes();

    const totalOrcamentosMesAnterior = await this.orcamentoService.getTotalOrcamentosMesAnterior();
    const totalInstalacoesMesAnterior = await this.instalacaoService.getTotalInstalacoesMesAnterior();
    const totalCaixasMesAnterior = await this.instalacaoService.getTotalCaixasInstaladasMesAnterior();
    const totalVisitasMesAnterior = await this.visitaService.getTotalVisitasMesAnterior();

    const diferencaOrcamentosMesAnterior = totalOrcamentosMesAnterior > 0 ? (((totalOrcamentosMes - totalOrcamentosMesAnterior) / totalOrcamentosMesAnterior) * 100).toFixed() : 0;
    const diferencaInstalacoesMesAnterior = totalInstalacoesMes - totalInstalacoesMesAnterior;
    const diferencaVisitasMesAnterior = totalVisitasMes - totalVisitasMesAnterior;
    const diferencaCaixasMesAnterior = totalCaixasMes - totalCaixasMesAnterior;

    const orcamentosAprovadosMes = await this.orcamentoService.getTotalOrcamentosMes();
    const orcamentosReprovadosMes = await this.orcamentoService.getTotalOrcamentosReprovadosMes();

    const totalInstalacoesAno = await this.instalacaoService.getExecutadasAno();
    const totalVisitasAno = await this.visitaService.getExecutadasAno();
    const totalOrcamentosAno = await this.orcamentoService.getAprovadosAno();

    const geralAnoInstalacoes = [];
    const geralAnoOrcamentos = [];
    const geralAnoVisitas = [];

    for(let i = 0; i < 12; i++){
      const totalOrcamentos = totalOrcamentosAno.filter((orcamento) => {
        return orcamento.createdAt.getMonth() === i;
      }).length;

      const totalInstalacoes = totalInstalacoesAno.filter((instalacao) => {
        return instalacao.createdAt.getMonth() === i;
      }).length;

      const totalVisitas = totalVisitasAno.filter((visita) => {
        return visita.createdAt.getMonth() === i;
      }).length;

      geralAnoOrcamentos.push(totalOrcamentos);
      geralAnoInstalacoes.push(totalInstalacoes);
      geralAnoVisitas.push(totalVisitas);
    }

    return {
      totalOrcamentosMes,
      totalInstalacoesMes,
      totalVisitasMes,
      totalCaixasMes,
      diferencaOrcamentosMesAnterior,
      diferencaInstalacoesMesAnterior,
      diferencaVisitasMesAnterior,
      diferencaCaixasMesAnterior,
      orcamentosAprovadosMes,
      orcamentosReprovadosMes,
      geralAnoOrcamentos,
      geralAnoInstalacoes,
      geralAnoVisitas
    }
  }
}