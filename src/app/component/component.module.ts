import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgChartsModule } from 'ng2-charts';

import { AyudaComponent } from './ayuda/ayuda.component';
import { AyudaListarComponent } from './ayuda/ayuda-listar/ayuda-listar.component';
import { AyudaInsertarComponent } from './ayuda/ayuda-insertar/ayuda-insertar.component';
import { PoliciaComponent } from './policia/policia.component';
import { PoliciaListarComponent } from './policia/policia-listar/policia-listar.component';
import { PoliciaInsertarComponent } from './policia/policia-insertar/policia-insertar.component';
import { CiudadanoComponent } from './ciudadano/ciudadano.component';
import { CiudadanoListarComponent } from './ciudadano/ciudadano-listar/ciudadano-listar.component';
import { CiudadanoInsertarComponent } from './ciudadano/ciudadano-insertar/ciudadano-insertar.component';
import { ComisariaComponent } from './comisaria/comisaria.component';
import { ListarComisariaComponent } from './comisaria/listar-comisaria/listar-comisaria.component';
import { InsertarComisariaComponent } from './comisaria/insertar-comisaria/insertar-comisaria.component';
import { DenunciasComponent } from './denuncias/denuncias.component';
import { ListarDenunciasComponent } from './denuncias/listar-denuncias/listar-denuncias.component';
import { InsertarDenunciasComponent } from './denuncias/insertar-denuncias/insertar-denuncias.component';
import { LugarhechoComponent } from './lugarhecho/lugarhecho.component';
import { ListarLugarhechoComponent } from './lugarhecho/listar-lugarhecho/listar-lugarhecho.component';
import { InsertarLugarhechoComponent } from './lugarhecho/insertar-lugarhecho/insertar-lugarhecho.component';
import { UbicacioncComponent } from './ubicacionc/ubicacionc.component';
import { ListarUbicacioncComponent } from './ubicacionc/listar-ubicacionc/listar-ubicacionc.component';
import { InsertarUbicacioncComponent } from './ubicacionc/insertar-ubicacionc/insertar-ubicacionc.component';
import { MarcaComponent } from './marca/marca.component';
import { ModeloComponent } from './modelo/modelo.component';
import { PertenenciaComponent } from './pertenencia/pertenencia.component';
import { ListarPertenenciaComponent } from './pertenencia/listar-pertenencia/listar-pertenencia.component';
import { InsertarPertenenciaComponent } from './pertenencia/insertar-pertenencia/insertar-pertenencia.component';
import { ListarModeloComponent } from './modelo/listar-modelo/listar-modelo.component';
import { InsertarModeloComponent } from './modelo/insertar-modelo/insertar-modelo.component';
import { ListarMarcaComponent } from './marca/listar-marca/listar-marca.component';
import { InsertarMarcaComponent } from './marca/insertar-marca/insertar-marca.component';
import { ReporteComponent } from './reporte/reporte.component';
import { Reporte01Component } from './reporte/reporte01/reporte01.component';
import { LoginCiudadanoComponent } from './login/login-ciudadano/login-ciudadano.component';
import { LoginPoliciaComponent } from './login/login-policia/login-policia.component';
import { RegistroComponent } from './registro/registro.component';
import { RCiudadanoComponent } from './registro/r-ciudadano/r-ciudadano.component';
import { RPoliciaComponent } from './registro/r-policia/r-policia.component';
import { Reporte02Component } from './reporte/reporte02/reporte02.component';

@NgModule({
  declarations: [
    AyudaComponent,
    AyudaListarComponent,
    AyudaInsertarComponent,
    PoliciaComponent,
    PoliciaListarComponent,
    PoliciaInsertarComponent,
    CiudadanoComponent,
    CiudadanoListarComponent,
    CiudadanoInsertarComponent,
    ComisariaComponent,
    ListarComisariaComponent,
    InsertarComisariaComponent,
    DenunciasComponent,
    ListarDenunciasComponent,
    InsertarDenunciasComponent,
    LugarhechoComponent,
    ListarLugarhechoComponent,
    InsertarLugarhechoComponent,
    UbicacioncComponent,
    ListarUbicacioncComponent,
    InsertarUbicacioncComponent,
    MarcaComponent,
    ModeloComponent,
    PertenenciaComponent,
    ListarPertenenciaComponent,
    InsertarPertenenciaComponent,
    ListarModeloComponent,
    InsertarModeloComponent,
    ListarMarcaComponent,
    InsertarMarcaComponent,
    ReporteComponent,
    Reporte01Component,
    LoginCiudadanoComponent,
    LoginPoliciaComponent,
    RegistroComponent,
    RCiudadanoComponent,
    RPoliciaComponent,
    Reporte02Component
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatPaginatorModule,
    MatListModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgChartsModule
  ]
})
export class ComponentModule { }
