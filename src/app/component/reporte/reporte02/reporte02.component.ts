import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ComisariaService } from 'src/app/service/comisaria.service';

@Component({
  selector: 'app-reporte02',
  templateUrl: './reporte02.component.html',
  styleUrls: ['./reporte02.component.css']
})
export class Reporte02Component {
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
  constructor(private cS: ComisariaService) { }
  ngOnInit(): void {
    this.cS.getCantidades().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombre_c);
      this.barChartData = [
        {
          data: data.map(item => item.id_comisaria),
          label: 'id',
          backgroundColor: 'rgba(255,0,0,0.5)',
        },
        {
          data: data.map(item => item.Cant_policia),
          label: 'cant_policia',
          backgroundColor: 'rgba(0,255,0,0.9)', // Color para las barras de datos de "atendido"
        },
      ];
    });
  }
}
