import { Component } from '@angular/core';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GoSecurity-Frontend';
  role:string="";

  constructor(private loginService: LoginService) {
  }

  cerrar() {
    sessionStorage.clear();
  }
  redirigir(url: string): void {
    window.location.href = url;
  }
  verificar() {
    this.role=this.loginService.showRole();
    return this.loginService.verificar();
  }
  validarRol(){
    if(this.role=='POLICIA' || this.role=='CIUDADANO' || this.role=='ADMIN'){
      return true;
    }else{
      return false;
    }
  }
}
