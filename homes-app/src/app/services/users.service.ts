import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

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

  getUserById(id: string): Observable<any> {
    return this.http.get<any[]>(`http://localhost:3000/_USER/${id}`);
  }
  getAllUsers(): Observable<any> {
    return this.http.get<any[]>(`http://localhost:3000/_USER`);
  }
  }

