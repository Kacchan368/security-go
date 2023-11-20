import { Component,OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pertenencias } from 'src/app/model/pertenencia';
import { PertenenciaService } from 'src/app/service/pertenencia.service';

@Component({
  selector: 'app-listar-pertenencia',
  templateUrl: './listar-pertenencia.component.html',
  styleUrls: ['./listar-pertenencia.component.css']
})
export class ListarPertenenciaComponent implements OnInit{
  dataSource: MatTableDataSource<Pertenencias> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idPertenencias',
    'namePertenencias',
    'AnioPertenencias',
    'EspecificacionesPertenencias',
    'ImagenPertenencias',
    'CodigoPertenencias',
    'SeriePertenencias',
    'idPertenenciasMarca',
    'idPertenenciasModelo',
    'accion01',
    'accion02'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cS:PertenenciaService){}
  ngOnInit(): void {
    this.cS.List().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.GetList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
   }
   eliminar(id: number) {
    this.cS.Delete(id).subscribe((data) => {
      this.cS.List().subscribe((data) => {
        this.cS.SetList(data);
      });
    });
  }
   filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
