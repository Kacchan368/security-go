import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { marca } from 'src/app/model/marca';
import { MarcaService } from 'src/app/service/marca.service';

@Component({
  selector: 'app-insertar-marca',
  templateUrl: './insertar-marca.component.html',
  styleUrls: ['./insertar-marca.component.css'],
})
export class InsertarMarcaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  marca: marca = new marca();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  constructor(
    private uS: MarcaService,
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
      idPertenenciasMarca: [''],
      namePertenenciasMarca: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.marca.idPertenenciasMarca = this.form.value.idPertenenciasMarca;
      this.marca.namePertenenciasMarca = this.form.value.namePertenenciasMarca;
      if (this.edicion) {
        this.uS.Update(this.marca).subscribe(() => {
          this.uS.List().subscribe((data) => {
            this.uS.SetList(data);
          });
        });
      } else {
        this.uS.Insert(this.marca).subscribe((data) => {
          this.uS.List().subscribe((data) => {
            this.uS.SetList(data);
          });
        });
      }
      this.router.navigate(['/components/PertenenciaMarca']);
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
          idPertenenciasMarca: new FormControl(data.idPertenenciasMarca),
          namePertenenciasMarca: new FormControl(data.namePertenenciasMarca),
        });
      });
    }
  }
}
