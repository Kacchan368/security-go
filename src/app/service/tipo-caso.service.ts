import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TipoCaso } from '../model/TipoCaso';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class TipoCasoService {
  private url=`${base_url}/TipoCasos`
  private listaCambio=new Subject<TipoCaso[]>()

  constructor(private http:HttpClient) { }

  list(){
    let token = sessionStorage.getItem('token');

    return this.http.get<TipoCaso[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(tp:TipoCaso){
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, tp, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva: TipoCaso[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<TipoCaso>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(tc:TipoCaso) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, tc, {
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
}
