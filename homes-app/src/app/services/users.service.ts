import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user-interface';
import { Intervention } from '../interfaces/intervention-interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private dataCache: any = {};
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  setUser(data: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/checkUser`, data);
  }

  login(data: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, data);
  }

  getCurrentInterventionByUser(idUser: number): Observable<[Intervention[], number]> {
    const payload = { idUser }; 
    return this.http.post<[Intervention[], number]>(`${this.baseUrl}/interventions_user`, payload);
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
