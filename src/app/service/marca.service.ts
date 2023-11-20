import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { marca } from '../model/marca';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private url=`${base_url}/PertenenciaMarca`
  private ListaCambio=new Subject<marca[]>()

  constructor(private http:HttpClient) { }

  List() {
    let token = sessionStorage.getItem('token');

    return this.http.get<marca[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  Insert(Marca: marca) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, Marca, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  SetList(ListaNueva: marca[]) {
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
  Update(Marca: marca) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, Marca, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  ListId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<marca>(`${this.url}/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
