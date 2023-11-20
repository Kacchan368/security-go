import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { UbicacionC } from 'src/app/model/ubicacionC';
import { UbicacionCService } from 'src/app/service/ubicacion-c.service';

@Component({
  selector: 'app-insertar-ubicacionc',
  templateUrl: './insertar-ubicacionc.component.html',
  styleUrls: ['./insertar-ubicacionc.component.css']
})
export class InsertarUbicacioncComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  ubicacionC: UbicacionC = new UbicacionC();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private uS: UbicacionCService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idUbicacionC: [''],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      distrito: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.ubicacionC.idUbicacionC = this.form.value.idUbicacionC;
      this.ubicacionC.departamento = this.form.value.departamento;
      this.ubicacionC.ciudad = this.form.value.ciudad;
      this.ubicacionC.distrito = this.form.value.distrito;
      this.ubicacionC.direccion = this.form.value.direccion;
      if (this.edicion) {
        this.uS.Update(this.ubicacionC).subscribe(() => {
          this.uS.List().subscribe((data) => {
            this.uS.SetList(data);
          });
        });
      } else {
        this.uS.Insert(this.ubicacionC).subscribe((data) => {
          this.uS.List().subscribe((data) => {
            this.uS.SetList(data);
          });
        });
      }
      this.router.navigate(['/components/UbicacionC']);
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
      this.uS.ListId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idUbicacionC: new FormControl(data.idUbicacionC),
          departamento: new FormControl(data.departamento),
          ciudad: new FormControl(data.ciudad),
          distrito: new FormControl(data.distrito),
          direccion: new FormControl(data.direccion),
        });
      });
      console.log("distrito")
    }
  }
}

