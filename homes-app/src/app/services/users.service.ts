import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user-interface';
import { Intervention } from '../interfaces/intervention-interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'http://localhost:8080';
  private userDataSubject = new BehaviorSubject<any>(
    JSON.parse(localStorage.getItem('currentUserData') || 'null') 
  );
  userData$ = this.userDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  setUser(data: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/checkUser`, data);
  }

  login(data: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, data);
  }

  getCurrentInterventionByUser(idUser: number): Observable<Intervention[]> {
    const payload = { idUser };
    return this.http.post<Intervention[]>(`${this.baseUrl}/interventions_user`, payload);
  }

  setData(key: string, value: any): void {
    if (key === 'currentUserData') {
      localStorage.setItem(key, JSON.stringify(value)); 
      this.userDataSubject.next(value); 
    }
  }

  getData(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  clearData(): void {
    localStorage.clear(); 
    this.userDataSubject.next(null); 
  }
}
