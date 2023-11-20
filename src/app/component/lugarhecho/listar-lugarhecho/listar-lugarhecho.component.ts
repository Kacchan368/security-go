import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DenunciasLugarHecho } from 'src/app/model/lugarHecho';
import { LugarHechoService } from 'src/app/service/lugar-hecho.service';

@Component({
  selector: 'app-listar-lugarhecho',
  templateUrl: './listar-lugarhecho.component.html',
  styleUrls: ['./listar-lugarhecho.component.css']
})
export class ListarLugarhechoComponent implements OnInit {
  dataSource: MatTableDataSource<DenunciasLugarHecho> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idDenunciasLugarHecho',
    'nameDenunciasLugarHecho',
    'distritoDenuncia',
    'provinciaDenuncia',
    'lugarDenuncia',
    'accion01',
    'accion02',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private lS: LugarHechoService) { }
  ngOnInit(): void {
    this.lS.List().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.lS.GetList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.lS.Delete(id).subscribe((data) => {
      this.lS.List().subscribe((data) => {
        this.lS.SetList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
