import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Denuncias } from '../model/denuncias';


const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class DenunciasService {
  private url = `${base_url}/denuncias`;
  private ListaCambio = new Subject<Denuncias[]>();
  constructor(private http: HttpClient) { }

  List() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Denuncias[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  Insert(denuncias: Denuncias) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, denuncias, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  ListId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Denuncias>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  SetList(ListaNueva: Denuncias[]) {
    this.ListaCambio.next(ListaNueva);
  }
  GetList() {
    return this.ListaCambio.asObservable();
  }
  Update(denuncias: Denuncias) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, denuncias, {
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
}
