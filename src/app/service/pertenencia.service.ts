import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Pertenencias } from '../model/pertenencia';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class PertenenciaService {
  private url = `${base_url}/Pertenencia`;
  private ListaCambio = new Subject<Pertenencias[]>();

  constructor(private http: HttpClient) { }

  List() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Pertenencias[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  Insert(Pertenencia: Pertenencias) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, Pertenencia, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  SetList(ListaNueva: Pertenencias[]) {
    this.ListaCambio.next(ListaNueva);
  }
  GetList() {
    return this.ListaCambio.asObservable();
  }
  Delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  Update(Pertenencia: Pertenencias) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, Pertenencia, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  ListId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Pertenencias>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
