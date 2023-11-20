import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DenunciasLugarHecho } from 'src/app/model/lugarHecho';
import { LugarHechoService } from 'src/app/service/lugar-hecho.service';

@Component({
  selector: 'app-insertar-lugarhecho',
  templateUrl: './insertar-lugarhecho.component.html',
  styleUrls: ['./insertar-lugarhecho.component.css']
})
export class InsertarLugarhechoComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  lugarHecho: DenunciasLugarHecho = new DenunciasLugarHecho();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;

  constructor(private lS: LugarHechoService,
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
      idDenunciasLugarHecho: [''],
      nameDenunciasLugarHecho: ['', Validators.required],
      distritoDenuncia: ['', Validators.required],
      provinciaDenuncia: ['', Validators.required],
      lugarDenuncia: ['', Validators.required],
    });
  }

  aceptar() : void {
    if (this.form.valid) {

      this.lugarHecho.idDenunciasLugarHecho = this.form.value.idDenunciasLugarHecho;
      this.lugarHecho.nameDenunciasLugarHecho = this.form.value.nameDenunciasLugarHecho;
      this.lugarHecho.distritoDenuncia = this.form.value.distritoDenuncia;
      this.lugarHecho.provinciaDenuncia = this.form.value.provinciaDenuncia;
      this.lugarHecho.lugarDenuncia = this.form.value.lugarDenuncia;

      if (this.edicion) {
        this.lS.Update(this.lugarHecho).subscribe(() => {
          this.lS.List().subscribe((data) => {
            this.lS.SetList(data);
          });
        });
      } else {
        this.lS.Insert(this.lugarHecho).subscribe((data) => {
          this.lS.List().subscribe((data) => {
            this.lS.SetList(data);
          });
        });
      }
      this.router.navigate(['/components/LugarHecho']);
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
      this.lS.ListId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idDenunciasLugarHecho: new FormControl(data.idDenunciasLugarHecho),
          nameDenunciasLugarHecho: new FormControl(data.nameDenunciasLugarHecho),
          distritoDenuncia: new FormControl(data.distritoDenuncia),
          provinciaDenuncia: new FormControl(data.provinciaDenuncia),
          lugarDenuncia: new FormControl(data.lugarDenuncia),
        });
      });
    }
  }

}
