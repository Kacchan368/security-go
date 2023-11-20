import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Denuncias } from 'src/app/model/denuncias';
import { DenunciasService } from 'src/app/service/denuncias.service';

@Component({
  selector: 'app-listar-denuncias',
  templateUrl: './listar-denuncias.component.html',
  styleUrls: ['./listar-denuncias.component.css']
})
export class ListarDenunciasComponent implements OnInit {
  dataSource: MatTableDataSource<Denuncias> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idDenuncias',
    'nameDenuncias',
    'fechaDenunciasHechos',
    'fechaDenunciasRegistro',
    'lugarHecho',
    'accion01',
    'accion02'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private dS: DenunciasService) { }
  ngOnInit(): void {
    this.dS.List().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.dS.GetList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.dS.Delete(id).subscribe((data) => {
      this.dS.List().subscribe((data) => {
        this.dS.SetList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
