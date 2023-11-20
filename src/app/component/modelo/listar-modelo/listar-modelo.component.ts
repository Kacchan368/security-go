import { Component,OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { modelo } from 'src/app/model/modelo';
import { ModeloService } from 'src/app/service/modelo.service';

@Component({
  selector: 'app-listar-modelo',
  templateUrl: './listar-modelo.component.html',
  styleUrls: ['./listar-modelo.component.css']
})
export class ListarModeloComponent implements OnInit{
  dataSource: MatTableDataSource<modelo> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idPertenenciasModelo',
    'namePertenenciasModelo',
    'accion01',
    'accion02'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private uS: ModeloService) {}
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
