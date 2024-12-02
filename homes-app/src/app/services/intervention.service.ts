import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterventionService {

  private data: any = {};

  constructor(private http: HttpClient) {}

  setData(key: string, value: any){
    this.data[key] = value;
  }

  getData(key: string) {
    return this.data[key];
  }

  clearData() {
    this.data = {};
  }
  // 02/12/2024 Julien
  // j'utilise checkUser pour envoyer la data à l'API afin de recevoir ensuite un boolean
  // checkUser(payload: any): Observable<boolean> {
  //   return this.http.post<boolean>('http://localhost:3000/CHECK_USER', payload);
  // }

  submitIntervention(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/INTERVENTION', data);
  }
}
