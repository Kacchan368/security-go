import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ciudadano } from '../model/Ciudadano';
import { Subject, Observable } from 'rxjs';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class CiudadanoService {
  private url = `${base_url}/ciudadano`;
  private listaCambio = new Subject<Ciudadano[]>();
  constructor(private http: HttpClient) { }
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Ciudadano[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(c: Ciudadano) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, c, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  new(c: Ciudadano) {

    return this.http.post(this.url, c);
  }
  setList(listaNueva: Ciudadano[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Ciudadano>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(c: Ciudadano) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, c, {
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
  //falta
  buscar(fecha: string): Observable<Ciudadano[]> {
    let token = sessionStorage.getItem('token');

    return this.http.post<Ciudadano[]>(
      `${this.url}/buscar`,
      { fecha: fecha },
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      }
    );
  }
}
