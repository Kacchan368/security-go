import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UbicacionC } from '../model/ubicacionC';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class UbicacionCService {

   private url = `${base_url}/UbicacionC`;
  private ListaCambio = new Subject<UbicacionC[]>();
  constructor(private http:HttpClient) { }
  List() {
    let token = sessionStorage.getItem('token');

    return this.http.get<UbicacionC[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  Insert(ubicacionC: UbicacionC) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, ubicacionC, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  ListId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<UbicacionC>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  SetList(ListaNueva: UbicacionC[]) {
    this.ListaCambio.next(ListaNueva);
  }
  GetList() {
    return this.ListaCambio.asObservable();
  }
  Update(ubicacionC: UbicacionC) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, ubicacionC, {
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
