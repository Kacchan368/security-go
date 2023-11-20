import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AyudaComponent } from './ayuda/ayuda.component';
import { AyudaInsertarComponent } from './ayuda/ayuda-insertar/ayuda-insertar.component';
import { CiudadanoComponent } from './ciudadano/ciudadano.component';
import { CiudadanoInsertarComponent } from './ciudadano/ciudadano-insertar/ciudadano-insertar.component';
import { PoliciaComponent } from './policia/policia.component';
import { PoliciaInsertarComponent } from './policia/policia-insertar/policia-insertar.component';
import { DenunciasComponent } from './denuncias/denuncias.component';
import { InsertarDenunciasComponent } from './denuncias/insertar-denuncias/insertar-denuncias.component';
import { ComisariaComponent } from './comisaria/comisaria.component';
import { InsertarComisariaComponent } from './comisaria/insertar-comisaria/insertar-comisaria.component';
import { InsertarUbicacioncComponent } from './ubicacionc/insertar-ubicacionc/insertar-ubicacionc.component';
import { UbicacioncComponent } from './ubicacionc/ubicacionc.component';
import { LugarhechoComponent } from './lugarhecho/lugarhecho.component';
import { InsertarLugarhechoComponent } from './lugarhecho/insertar-lugarhecho/insertar-lugarhecho.component';
import { MarcaComponent } from './marca/marca.component';
import { InsertarMarcaComponent } from './marca/insertar-marca/insertar-marca.component';
import { ModeloComponent } from './modelo/modelo.component';
import { InsertarModeloComponent } from './modelo/insertar-modelo/insertar-modelo.component';
import { PertenenciaComponent } from './pertenencia/pertenencia.component';
import { InsertarPertenenciaComponent } from './pertenencia/insertar-pertenencia/insertar-pertenencia.component';
import { ReporteComponent } from './reporte/reporte.component';
import { Reporte01Component } from './reporte/reporte01/reporte01.component';
import { GuardService } from '../service/guard.service';
import { Reporte02Component } from './reporte/reporte02/reporte02.component';

const routes: Routes = [
  {
    path: 'Ayuda',
    component: AyudaComponent,
    children: [
      {path: 'nuevo', component: AyudaInsertarComponent},
      {path: 'ediciones/:id', component: AyudaInsertarComponent}
    ],canActivate:[GuardService]
  },
  {
    path: 'ciudadano',
    component: CiudadanoComponent,
    children: [
      {path: 'nuevo', component: CiudadanoInsertarComponent},
      {path: 'ediciones/:id', component: CiudadanoInsertarComponent}
    ],canActivate:[GuardService]
  },
  {
    path: 'policia',
    component: PoliciaComponent,
    children: [
      {path: 'nuevo', component: PoliciaInsertarComponent},
      {path: 'ediciones/:id', component: PoliciaInsertarComponent}
    ],canActivate:[GuardService]
  },
  {
    path: 'Denuncia',
    component: DenunciasComponent,
    children: [
      { path: 'insertar', component: InsertarDenunciasComponent },
      { path: 'ediciones/:id ', component: InsertarDenunciasComponent }
    ],canActivate:[GuardService]
  },
  {
    path: 'Comisaria',
    component: ComisariaComponent,
    children: [
      { path: 'insertar', component: InsertarComisariaComponent },
      { path: 'ediciones/:id ', component: InsertarComisariaComponent }
    ],canActivate:[GuardService]
  },
  {
    path: 'UbicacionC',
    component: UbicacioncComponent,
    children: [
      { path: 'insertar', component: InsertarUbicacioncComponent },
      { path: 'ediciones/:id', component: InsertarUbicacioncComponent }
    ],canActivate:[GuardService]
  },
  {
    path: 'LugarHecho',
    component: LugarhechoComponent,
    children: [
      { path: 'insertar', component: InsertarLugarhechoComponent },
      { path: 'ediciones/:id ', component: InsertarLugarhechoComponent }
    ],canActivate:[GuardService]
  },
  {
    path: 'PertenenciaMarca',
    component: MarcaComponent,
    children: [
      { path: 'insertar', component: InsertarMarcaComponent },
      { path: 'ediciones/:id ', component: InsertarMarcaComponent }
    ],canActivate:[GuardService]
  },

  {
    path: 'PertenenciaModelo',
    component: ModeloComponent,
    children: [
      { path: 'insertar', component: InsertarModeloComponent },
      { path: 'ediciones/:id ', component: InsertarModeloComponent }
    ],canActivate:[GuardService]
  },
  {
    path: 'Pertenencia',
    component: PertenenciaComponent,
    children: [
      { path: 'insertar', component: InsertarPertenenciaComponent },
      { path: 'ediciones/:id ', component: InsertarPertenenciaComponent }
    ],canActivate:[GuardService]
  },
  {
    path: 'Reportes',
    component: ReporteComponent,
    children: [
      { path: 'Reporte01', component: Reporte01Component },
      { path: 'Reporte02', component: Reporte02Component }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
