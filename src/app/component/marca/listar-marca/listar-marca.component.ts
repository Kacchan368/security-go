import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { marca } from 'src/app/model/marca';
import { MarcaService } from 'src/app/service/marca.service';

@Component({
  selector: 'app-listar-marca',
  templateUrl: './listar-marca.component.html',
  styleUrls: ['./listar-marca.component.css']
})
export class ListarMarcaComponent implements OnInit{
  dataSource: MatTableDataSource<marca> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idPertenenciasMarca',
    'namePertenenciasMarca',
    'accion01',
    'accion02'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private uS: MarcaService) {}
  ngOnInit(): void {
    this.uS.List().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.GetList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.uS.Delete(id).subscribe((data) => {
      this.uS.List().subscribe((data) => {
        this.uS.SetList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
