import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comisaria } from '../model/comisaria';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DCPxDTO } from '../model/DCPXDTO';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ComisariaService {
  private url = `${base_url}/Comisaria`;
  private ListaCambio = new Subject<Comisaria[]>()
  constructor(private http: HttpClient) { }

  List() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Comisaria[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  Insert(comisaria: Comisaria) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, comisaria, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  ListId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Comisaria>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  SetList(ListaNueva: Comisaria[]) {
    this.ListaCambio.next(ListaNueva);
  }
  GetList() {
    return this.ListaCambio.asObservable();
  }
  Update(comisaria: Comisaria) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, comisaria, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  Delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  getCantidades(): Observable<DCPxDTO[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<DCPxDTO[]>(`${this.url}/cantidadCP`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

}
