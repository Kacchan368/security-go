import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Policia } from '../model/Policia';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotixCiudadanoDTO } from '../model/NotixCiudadanoDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PoliciaService {
  private url = `${base_url}/policia`;
  private listaCambio = new Subject<Policia[]>();
  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Policia[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(p: Policia) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, p, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  new(p: Policia) {
    return this.http.post(this.url, p);
  }
  setList(listaNueva: Policia[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Policia>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(p: Policia) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, p, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  listByuser(username:String){

    return this.http.get<Policia>(`${this.url}/listByUser/${username}`)
  }
  getSolicitudes(): Observable<NotixCiudadanoDTO[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<NotixCiudadanoDTO[]>(`${this.url}/Solicitudes`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  //aun no esta en el backend - creo
  /*buscar(fecha: string): Observable<Policia[]> {
    let token = sessionStorage.getItem('token');

    return this.http.post<Policia[]>(
      `${this.url}/buscar`,
      { fecha: fecha },
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      }
    );
  }*/
}
