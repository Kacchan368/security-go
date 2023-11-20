import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService {
  constructor(private loguinService:LoginService, private router:Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const rpta=this.loguinService.verificar();
    if(!rpta){
      this.router.navigate(['/login']);
      return false;
    }
    return rpta;
  }
}
