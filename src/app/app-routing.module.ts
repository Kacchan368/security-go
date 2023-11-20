import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { LoginCiudadanoComponent } from './component/login/login-ciudadano/login-ciudadano.component';
import { LoginPoliciaComponent } from './component/login/login-policia/login-policia.component';
import { RPoliciaComponent } from './component/registro/r-policia/r-policia.component';
import { RCiudadanoComponent } from './component/registro/r-ciudadano/r-ciudadano.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'loginCiudadano', component: LoginCiudadanoComponent
  },
  {
    path: 'loginPolicia', component: LoginPoliciaComponent
  },
  {
    path: 'registroPolicia', component: RPoliciaComponent
  },
  {
    path: 'registroCiudadano', component: RCiudadanoComponent
  },
  {
    path: 'components',
    loadChildren: () => import('./component/component.module').then((m) => m.ComponentModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
