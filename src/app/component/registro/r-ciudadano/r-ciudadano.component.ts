import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Ciudadano } from '../../../model/Ciudadano';
import { Users } from 'src/app/model/Users';
import { CiudadanoService } from 'src/app/service/ciudadano.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Roles } from 'src/app/model/Roles';

@Component({
  selector: 'app-r-ciudadano',
  templateUrl: './r-ciudadano.component.html',
  styleUrls: ['./r-ciudadano.component.css'],
})
export class RCiudadanoComponent {
  id: number = 0;
  form: FormGroup = new FormGroup({});
  ciudadano: Ciudadano = new Ciudadano();
  users: Users = new Users();
  mensaje: string = '';
  text: String = '';
  constructor(
    private cS: CiudadanoService,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idCiudadano: [''],
      numeroCiudadano: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.ciudadano.idCiudadano = this.form.value.idCiudadano;
      this.ciudadano.numeroCiudadano = this.form.value.numeroCiudadano;
      this.users.id = 0;
      this.users.enabled = true;
      this.users.username = this.form.value.username;
      this.users.password = this.form.value.password;
      let e = new Roles();
      e.id = 1;
      e.rol = 'CIUDADANO';

      this.users.role = e;

      this.text = this.users.role.id.toString();

      console.log(this.text);
      console.log(this.users.role.rol);

      this.userService.insert(this.users).subscribe((data) => {
        this.userService.ultimoUser().subscribe((data) => {
          let e = new Users();
          e.id = data.id;
          console.log(e.id);
          this.ciudadano.users = e;

          this.cS.new(this.ciudadano).subscribe(() => {
            this.router.navigate(['/loginCiudadano']);
          });
        });
      });
    } else {
      this.mensaje = 'Ingrese todos los datos del ciudadano!!!';
    }
  }
}
