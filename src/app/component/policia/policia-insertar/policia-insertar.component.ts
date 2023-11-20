import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Policia } from 'src/app/model/Policia';
import { Users } from 'src/app/model/Users';
import { Comisaria } from 'src/app/model/comisaria';
import { ComisariaService } from 'src/app/service/comisaria.service';
import { PoliciaService } from 'src/app/service/policia.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-policia-insertar',
  templateUrl: './policia-insertar.component.html',
  styleUrls: ['./policia-insertar.component.css']
})
export class PoliciaInsertarComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  policia: Policia = new Policia();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listaComisaria: Comisaria[]=[];
  idComisariaSeleccionada: number=0;
  listaUsuario: Users[]=[];
  idUserSeleccionado: number=0;

  constructor(
    private pS: PoliciaService,
    private cS: ComisariaService,
    private uS: UserService,
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
      idPolicia: ['',],
      numeroPlacaPolicia: ['', Validators.required],
      fotoRostroPolicia: ['', Validators.required],
      fotoIdentPolicia: ['', Validators.required],
      rangoPolicia: ['', Validators.required],
      idComisaria: ['', Validators.required],
      users: [''],
    });
    this.cS.List().subscribe((data=>{
      this.listaComisaria=data;
    }));
    this.uS.listar().subscribe((data=>{
      this.listaUsuario=data;
    }));
  }
  aceptar(): void {
    if (this.form.valid) {
      this.policia.idPolicia = this.form.value.idPolicia;
      this.policia.numeroPlacaPolicia = this.form.value.numeroPlacaPolicia;
      this.policia.fotoRostroPolicia = this.form.value.fotoRostroPolicia;
      this.policia.fotoIdentPolicia = this.form.value.fotoIdentPolicia;
      this.policia.rangoPolicia = this.form.value.rangoPolicia;
      this.policia.idComisaria.idComisaria=this.form.value.idComisaria;
      this.policia.users.id=this.form.value.users;
      if (this.edicion) {
        this.pS.update(this.policia).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
        console.log(this.policia.users+"llamada")
      } else {
        this.pS.insert(this.policia).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
        console.log(this.policia.users+"error")
      }
      this.router.navigate(['/components/policia']);
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
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idPolicia: new FormControl(data.idPolicia),
          numeroPlacaPolicia: new FormControl(data.numeroPlacaPolicia),
          fotoRostroPolicia: new FormControl(data.fotoRostroPolicia),
          fotoIdentPolicia:new FormControl(data.fotoIdentPolicia),
          rangoPolicia: new FormControl(data.rangoPolicia),
          idComisaria: new FormControl(data.idComisaria),
          users: new FormControl(data.users.id),
        });
        console.log(data);
      });
    }
  }
}
