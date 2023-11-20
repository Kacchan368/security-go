import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ciudadano } from 'src/app/model/Ciudadano';
import { CiudadanoService } from 'src/app/service/ciudadano.service';

@Component({
  selector: 'app-ciudadano-listar',
  templateUrl: './ciudadano-listar.component.html',
  styleUrls: ['./ciudadano-listar.component.css']
})
export class CiudadanoListarComponent implements OnInit{
  dataSource: MatTableDataSource<Ciudadano> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'DNI',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: CiudadanoService) {}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
