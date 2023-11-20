import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ciudadano } from 'src/app/model/Ciudadano';
import { Users } from 'src/app/model/Users';
import { CiudadanoService } from 'src/app/service/ciudadano.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-ciudadano-insertar',
  templateUrl: './ciudadano-insertar.component.html',
  styleUrls: ['./ciudadano-insertar.component.css'],
})
export class CiudadanoInsertarComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  ciudadano: Ciudadano = new Ciudadano();
  mensaje: string = '';
  edicion: boolean = false;
  id: number = 0;
  listaUsuario: Users[]=[];
  idUserSeleccionado: number=0;
  constructor(
    private cS: CiudadanoService,
    private uS: UserService,
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
      idCiudadano: [''],
      numeroCiudadano: ['', Validators.required],
      users: [''],
    });
    this.uS.listar().subscribe((data=>{
      this.listaUsuario=data;
    }));
  }
  aceptar(): void {
    if (this.form.valid) {
      this.ciudadano.idCiudadano = this.form.value.idCiudadano;
      this.ciudadano.numeroCiudadano = this.form.value.numeroCiudadano;
      this.ciudadano.users.id=this.form.value.users;
      if (this.edicion) {
        this.cS.update(this.ciudadano).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.ciudadano).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['/components/ciudadano']);
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
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idCiudadano: new FormControl(data.idCiudadano),
          numeroCiudadano: new FormControl(data.numeroCiudadano),
          users: new FormControl(data.users.id),
        });
      });
    }
  }
}
