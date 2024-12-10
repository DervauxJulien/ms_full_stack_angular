import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'http://localhost:8080';
  private dataCache: any = {}; 

  constructor(private http: HttpClient) {}

  setUser(data: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/checkUser`, data);
  }
  login(data: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, data);
  }

  setData(key: string, value: any): any {
    this.dataCache[key] = value;
    console.log(this.dataCache[key]);
  }

  getData(key: string): any {
    return this.dataCache[key];
  }
  clearData(): void {
    this.dataCache = {};
  }
}
