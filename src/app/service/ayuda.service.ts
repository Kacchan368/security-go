import { Injectable } from '@angular/core';
import { Ayuda } from '../model/Ayuda';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class AyudaService {
  private url = `${base_url}/Ayuda`;
  private ListaCambio = new Subject<Ayuda[]>();
  constructor(private http: HttpClient) { }
  List() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Ayuda[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  Insert(ayuda: Ayuda) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, ayuda, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Ayuda>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  SetList(ListaNueva: Ayuda[]) {
    this.ListaCambio.next(ListaNueva);
  }
  GetList() {
    return this.ListaCambio.asObservable();
  }
  Update(ayuda: Ayuda) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, ayuda, {
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
