import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Comisaria } from 'src/app/model/comisaria';
import { ComisariaService } from 'src/app/service/comisaria.service';

@Component({
  selector: 'app-listar-comisaria',
  templateUrl: './listar-comisaria.component.html',
  styleUrls: ['./listar-comisaria.component.css']
})
export class ListarComisariaComponent implements OnInit {
  role: string= "false";

  dataSource: MatTableDataSource<Comisaria> = new MatTableDataSource();
  displayedColumns: string[] = [
    'Id',
    'nombreComisaria',
    'telefono',
    'direccion',
    'idUbicacionC',
    'accion01',
    'accion02'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cS: ComisariaService) { }
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
  restriccion(){
    if(this.role=='POLICIA' || this.role=='CIUDADANO' || this.role=='ADMIN'){
      return true;
    }else{
      return false;
    }
  }
}
