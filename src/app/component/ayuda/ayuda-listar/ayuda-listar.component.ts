import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ayuda } from 'src/app/model/Ayuda';
import { AyudaService } from 'src/app/service/ayuda.service';

@Component({
  selector: 'app-ayuda-listar',
  templateUrl: './ayuda-listar.component.html',
  styleUrls: ['./ayuda-listar.component.css']
})
export class AyudaListarComponent implements OnInit{
  dataSource: MatTableDataSource<Ayuda> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'fecha',
    'idTipoCaso',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private aS: AyudaService) {}
  ngOnInit(): void {
    this.aS.List().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.aS.GetList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.aS.Delete(id).subscribe((data) => {
      this.aS.List().subscribe((data) => {
        this.aS.SetList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
