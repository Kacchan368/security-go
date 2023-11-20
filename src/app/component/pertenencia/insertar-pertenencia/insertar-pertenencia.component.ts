import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { marca } from 'src/app/model/marca';
import { modelo } from 'src/app/model/modelo';
import { Pertenencias } from 'src/app/model/pertenencia';
import { MarcaService } from 'src/app/service/marca.service';
import { ModeloService } from 'src/app/service/modelo.service';
import { PertenenciaService } from 'src/app/service/pertenencia.service';

@Component({
  selector: 'app-insertar-pertenencia',
  templateUrl: './insertar-pertenencia.component.html',
  styleUrls: ['./insertar-pertenencia.component.css']
})
export class InsertarPertenenciaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  pertenencia: Pertenencias = new Pertenencias();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listaMarca: marca[] = [];
  idMarcaCSeleccionado: number = 0
  listaModelo: modelo[] = [];
  idModeloSeleccionado: number = 0
  constructor(
    private pS: PertenenciaService,
    private mS: MarcaService,
    private mO: ModeloService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idPertenencias: [''],
      namePertenencias: ['', Validators.required],
      AnioPertenencias: ['', Validators.required],
      EspecificacionesPertenencias: ['', Validators.required],
      ImagenPertenencias: ['', Validators.required],
      idPertenenciasMarca: ['', Validators.required],
      idPertenenciasModelo: ['', Validators.required],

    });
    this.mS.List().subscribe((data) => {
      this.listaMarca = data;
    });
    this.mO.List().subscribe((data) => {
      this.listaModelo = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.pertenencia.idPertenencias = this.form.value.idPertenencias;
      this.pertenencia.namePertenencias = this.form.value.namePertenencias;
      this.pertenencia.anioPertenencias = this.form.value.AnioPertenencias;
      this.pertenencia.especificacionesPertenencias = this.form.value.EspecificacionesPertenencias;
      this.pertenencia.imagenPertenencias = this.form.value.ImagenPertenencias;
      this.pertenencia.idPertenenciasMarca.idPertenenciasMarca = this.form.value.idPertenenciasMarca;
      this.pertenencia.idPertenenciasModelo.idPertenenciasModelo = this.form.value.idPertenenciasModelo;
      if (this.edicion) {
        this.pS.Update(this.pertenencia).subscribe(() => {
          this.pS.List().subscribe((data) => {
            this.pS.SetList(data);
          });
        });
      } else {
        this.pS.Insert(this.pertenencia).subscribe((data) => {
          this.pS.List().subscribe((data) => {
            this.pS.SetList(data);
          });
        });
      }
      this.router.navigate(['/components/Pertenencia']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
  init() {
    if (this.edicion) {
      this.pS.ListId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idPertenencias: new FormControl(data.idPertenencias),
          namePertenencias: new FormControl(data.namePertenencias),
          AnioPertenencias: new FormControl(data.anioPertenencias),
          EspecificacionesPertenencias: new FormControl(data.especificacionesPertenencias),
          ImagenPertenencias: new FormControl(data.imagenPertenencias),
          idPertenenciasMarca: new FormControl(data.idPertenenciasMarca.idPertenenciasMarca),
          idPertenenciasModelo: new FormControl(data.idPertenenciasModelo.idPertenenciasModelo),
        });
      });
    }
  }
}
