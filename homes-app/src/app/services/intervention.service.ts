import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterventionService {
  private apiUrl = 'https://localhost:3000';

  constructor(private http: HttpClient) {}

  submitIntervention(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
