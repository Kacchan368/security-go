import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Policia } from 'src/app/model/Policia';
import { PoliciaService } from 'src/app/service/policia.service';

@Component({
  selector: 'app-policia-listar',
  templateUrl: './policia-listar.component.html',
  styleUrls: ['./policia-listar.component.css']
})
export class PoliciaListarComponent implements OnInit{
  dataSource: MatTableDataSource<Policia> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'Placa',
    'FotoRostro',
    'FotoIdentificacion',
    'Rango',
    'Comisaria',
    'user',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pS: PoliciaService) {}
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.pS.delete(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
