import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Policia } from 'src/app/model/Policia';
import { Roles } from 'src/app/model/Roles';
import { Users } from 'src/app/model/Users';
import { Comisaria } from 'src/app/model/comisaria';
import { PoliciaService } from 'src/app/service/policia.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-r-policia',
  templateUrl: './r-policia.component.html',
  styleUrls: ['./r-policia.component.css'],
})
export class RPoliciaComponent implements OnInit {
  id: number = 0;
  form: FormGroup = new FormGroup({});
  policia: Policia = new Policia();
  comisaria: Comisaria = new Comisaria();
  users: Users = new Users();
  mensaje: string = '';
  text: String = '';

  constructor(
    private pS: PoliciaService,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idPolicia: [''],
      numeroPlacaPolicia: ['', Validators.required],
      fotoRostroPolicia: ['', Validators.required],
      fotoIdentPolicia: ['', Validators.required],
      rangoPolicia: ['', Validators.required],
      idComisaria: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.policia.idPolicia = this.form.value.idPolicia;
      this.policia.numeroPlacaPolicia = this.form.value.numeroPlacaPolicia;
      this.policia.fotoRostroPolicia = this.form.value.fotoRostroPolicia;
      this.policia.fotoIdentPolicia = this.form.value.fotoIdentPolicia;
      this.policia.rangoPolicia = this.form.value.rangoPolicia;
      this.policia.idComisaria.idComisaria = this.form.value.idComisaria;
      this.users.id = 0;
      this.users.enabled = true;
      this.users.username = this.form.value['username'];
      this.users.password = this.form.value['password'];

      let e = new Roles();
      e.id = 2;
      e.rol = 'POLICIA';

      this.users.role = e;

      this.text = this.users.role.id.toString();

      console.log(this.text);
      console.log(this.users.role.rol);
      console.log(this.users.role.id);

      this.userService.insert(this.users).subscribe((data) => {
        this.userService.ultimoUser().subscribe((data) => {
          let e = new Users();
          e.id = data.id;
          console.log(e.id);
          console.log(e);
          this.policia.users = e;

          this.pS.new(this.policia).subscribe(() => {
            this.router.navigate(['/loginPolicia']);
          });
        });
      });
    } else {
      this.mensaje = 'Ingrese la placa del policia!!!';
    }
  }
}
