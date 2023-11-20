import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { PoliciaService } from 'src/app/service/policia.service';

@Component({
  selector: 'app-reporte01',
  templateUrl: './reporte01.component.html',
  styleUrls: ['./reporte01.component.css']
})
export class Reporte01Component {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  //etiquetas
  barChartLabels: string[] = [];
  //tipo de grafico
  barChartType: ChartType = 'bar';
  //legenda del grafico
  barChartLegend = true;
  //data
  barChartData: ChartDataset[] = [];
  constructor(private tS: PoliciaService) {}
  ngOnInit(): void {
    this.tS.getSolicitudes().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.dniCiudadano);
      this.barChartData = [
        {
          data: data.map(item => item.cantNoAtendido),
          label: 'No atendido',
          backgroundColor: 'rgba(255,0,0,0.5)',
        },
        {
          data: data.map(item => item.cantAtendido),
          label: 'Atendido',
          backgroundColor: 'rgba(0,255,0,0.9)', // Color para las barras de datos de "atendido"
        },
      ];
    });
  }
}
