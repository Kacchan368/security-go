import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Ayuda } from 'src/app/model/Ayuda';
import { TipoCaso } from 'src/app/model/TipoCaso';
import { AyudaService } from 'src/app/service/ayuda.service';
import { TipoCasoService } from 'src/app/service/tipo-caso.service';

@Component({
  selector: 'app-ayuda-insertar',
  templateUrl: './ayuda-insertar.component.html',
  styleUrls: ['./ayuda-insertar.component.css'],
})
export class AyudaInsertarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  ayuda: Ayuda = new Ayuda();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  fechaAyuda = new FormControl(new Date());
  id: number = 0;
  edicion: boolean = false;
  listaTipoCasos: TipoCaso[] = [];
  idTipoCasoSeleccionado: number = 0;
  constructor(
    private tS: TipoCasoService,
    private aS: AyudaService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idAyuda: [''],
      fechaAyuda: ['', Validators.required],
      idTipoCaso: ['', Validators.required],
    });
    this.tS.list().subscribe((data) => {
      this.listaTipoCasos = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.ayuda.idAyuda = this.form.value.idAyuda;
      this.ayuda.fechaAyuda = this.form.value.fechaAyuda;
      this.ayuda.idTipoCaso.idTipoCaso = this.form.value.idTipoCaso;
      if (this.edicion) {
        this.aS.Update(this.ayuda).subscribe(() => {
          this.aS.List().subscribe((data) => {
            this.aS.SetList(data);
          });
        });
      } else {
        this.aS.Insert(this.ayuda).subscribe((data) => {
          this.aS.List().subscribe((data) => {
            this.aS.SetList(data);
          });
        });
      }
      this.router.navigate(['/components/Ayuda']);
    } else {
      this.mensaje = 'Ingrese todos los campos!!';
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
      this.aS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idAyuda: new FormControl(data.idAyuda),
          fechaAyuda: new FormControl(data.fechaAyuda),
          idTipoCaso: new FormControl(data.idTipoCaso.idTipoCaso),
        });
      });
    }
  }
}
