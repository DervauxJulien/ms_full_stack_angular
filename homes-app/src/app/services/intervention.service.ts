import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterventionService {

  private data: any = {};

  setData(key: string, value: any){
    this.data[key] = value;
  }

  getData(key: string) {
    return this.data[key];
  }

  clearData() {
    this.data = {};
  }

  constructor(private http: HttpClient) {}

  submitIntervention(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/INTERVENTION', data);
  }
}
