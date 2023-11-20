import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Denuncias } from 'src/app/model/denuncias';
import { DenunciasLugarHecho} from 'src/app/model/lugarHecho';
import { DenunciasService } from 'src/app/service/denuncias.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LugarHechoService } from 'src/app/service/lugar-hecho.service';
import { Comisaria } from 'src/app/model/comisaria';
import { Ciudadano } from 'src/app/model/Ciudadano';
import * as moment from 'moment';
import { CiudadanoService } from 'src/app/service/ciudadano.service';
import { ComisariaService } from 'src/app/service/comisaria.service';

@Component({
  selector: 'app-insertar-denuncias',
  templateUrl: './insertar-denuncias.component.html',
  styleUrls: ['./insertar-denuncias.component.css'],
})
export class InsertarDenunciasComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  denuncia: Denuncias = new Denuncias();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  maxFecha: Date = moment().add(-1, 'days').toDate();
  listaCiudadano: Ciudadano[] = [];
  listaComisaria: Comisaria[] = [];
  listaLugarHecho: DenunciasLugarHecho[] = [];
  idCiudadanoSeleccionado: number = 0;
  idComisariaSeleccionado: number = 0;
  idLugarHechoSeleccionado: number = 0;
  constructor(
    private dS: DenunciasService,
    private lhS: LugarHechoService,
    private ciS:CiudadanoService,
    private coS:ComisariaService,
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
      idDenuncias: [''],
      nameDenuncias: ['', Validators.required],
      fechaDenunciasHechos: ['', Validators.required],
      fechaDenunciasRegistro: ['', Validators.required],
      idDenunciasLugarHecho: ['', Validators.required],
      idCiudadano: ['', Validators.required],
      idComisaria: ['', Validators.required],
    });
    this.lhS.List().subscribe((data) => {
      this.listaLugarHecho = data;
    });
    this.ciS.list().subscribe((data) => {
      this.listaCiudadano = data;
    });
    this.coS.List().subscribe((data) => {
      this.listaComisaria = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.denuncia.idDenuncias = this.form.value.idDenuncias;
      this.denuncia.nameDenuncias = this.form.value.nameDenuncias;
      this.denuncia.fechaDenunciasHechos = this.form.value.fechaDenunciasHechos;
      this.denuncia.fechaDenunciasRegistro = this.form.value.fechaDenunciasRegistro;
      this.denuncia.idDenunciasLugarHecho.idDenunciasLugarHecho = this.form.value.idDenunciasLugarHecho;
      this.denuncia.idCiudadano.idCiudadano = this.form.value.idCiudadano;
      this.denuncia.idComisaria.idComisaria = this.form.value.idComisaria;
      if (this.edicion) {
        this.dS.Update(this.denuncia).subscribe(() => {
          this.dS.List().subscribe((data) => {
            this.dS.SetList(data);
          });
        });
      } else {
        this.dS.Insert(this.denuncia).subscribe((data) => {
          this.dS.List().subscribe((data) => {
            this.dS.SetList(data);
          });
        });
      }
      this.router.navigate(['/components/Denuncia']);
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
      this.dS.ListId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idDenuncias: new FormControl(data.idDenuncias),
          nameDenuncias: new FormControl(data.nameDenuncias),
          fechaDenunciasHechos: new FormControl(data.fechaDenunciasHechos),
          fechaDenunciasRegistro: new FormControl(data.fechaDenunciasRegistro),
          idDenunciasLugarHecho: new FormControl(data.idDenunciasLugarHecho.idDenunciasLugarHecho),
          idCiudadano: new FormControl(data.idCiudadano.idCiudadano),
          idComisaria: new FormControl(data.idComisaria.idComisaria),
        });
      });
    }
  }
}
