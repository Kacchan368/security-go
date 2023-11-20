import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Comisaria } from 'src/app/model/comisaria';
import { UbicacionC } from 'src/app/model/ubicacionC';
import { ComisariaService } from 'src/app/service/comisaria.service';
import { UbicacionCService } from 'src/app/service/ubicacion-c.service';

@Component({
  selector: 'app-insertar-comisaria',
  templateUrl: './insertar-comisaria.component.html',
  styleUrls: ['./insertar-comisaria.component.css']
})
export class InsertarComisariaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  comisaria: Comisaria = new Comisaria();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listaUbicacionC: UbicacionC[] = [];
  idUbicacionCSeleccionado: number=0;
  constructor(
    private cS: ComisariaService,
    private ucS: UbicacionCService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idComisaria: [''],
      nombre_c: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      idUbicacionC: ['', Validators.required],
    });
    this.ucS.List().subscribe((data) => {
      this.listaUbicacionC = data;
    });
  }

  aceptar() :void {
    if (this.form.valid) {
      this.comisaria.idComisaria = this.form.value.idComisaria;
      this.comisaria.nombre_c = this.form.value.nombre_c;
      this.comisaria.telefono = this.form.value.telefono;
      this.comisaria.direccion = this.form.value.direccion;
      this.comisaria.idUbicacionC.idUbicacionC = this.form.value.idUbicacionC;
      if (this.edicion) {
        this.cS.Update(this.comisaria).subscribe(() => {
          this.cS.List().subscribe((data) => {
            this.cS.SetList(data);
          });
        });
      } else {
        this.cS.Insert(this.comisaria).subscribe((data) => {
          this.cS.List().subscribe((data) => {
            this.cS.SetList(data);
          });
        });
      }
      this.router.navigate(['/components/Comisaria']);
    } else {
      this.mensaje = 'Ingrese todos los campos obligatorios.';
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
      this.cS.ListId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idComisaria: new FormControl(data.idComisaria),
          nombre_c: new FormControl(data.nombre_c),
          telefono: new FormControl(data.telefono),
          direccion: new FormControl(data.direccion),
          idUbicacionC: new FormControl(data.idUbicacionC.idUbicacionC),
        });
      });
    }
  }
}
