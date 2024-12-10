import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Intervention } from '../interfaces/intervention-interface';

@Injectable({
  providedIn: 'root',
})
export class InterventionService {
  private baseUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) {}

  submitIntervention(data: Partial<Intervention>): Observable<Intervention> {
    return this.http.post<Intervention>(`${this.baseUrl}/create_intervention_rest`, data);
  }

  getInterventionById(data : any): Observable<Intervention> {
    return this.http.post<Intervention>(`${this.baseUrl}/intervention_details`, data);
  }

  getAllInterventions(): Observable<Intervention[]> {
    return this.http.get<Intervention[]>(this.baseUrl);
  }
}
