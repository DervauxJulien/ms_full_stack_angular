import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, catchError, throwError } from "rxjs";
import { User } from "../interfaces/user-interface";
import { Intervention } from "../interfaces/intervention-interface";
import { ErrorDialogComponent } from "../components/error-dialog/error-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private dataCache: any = {};
  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  setUser(data: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/checkUser`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        // Gestion de l'erreur en cas de réponse serveur
        this.handleError(error);
        return throwError(() => new Error(error.message)); // Propagation de l'erreur
      })
    );
  }
  
  private handleError(error: HttpErrorResponse): void {
    let errorMessage = 'Une erreur est survenue.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur client: ${error.error.message}`;
    } else {
      if (error.status === 0) {
        errorMessage = 'Serveur inaccessible, veuillez réessayer plus tard.';
      } else if (error.status === 404) {
        errorMessage = 'Ressource non trouvée.';
      } else if (error.status === 500) {
        errorMessage = error.error?.message || 'Erreur serveur inconnue';
      } else {
        errorMessage = `Erreur serveur: ${error.message}`;
      }
    }

    // Afficher le message d'erreur dans un pop-up
    this.dialog.open(ErrorDialogComponent, {
      data: { message: errorMessage },
      width: '400px',  // Largeur du pop-up
    });
  }

  login(data: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, data);
  }

  getCurrentInterventionByUser(
    idUser: number
  ): Observable<[Intervention[], number]> {
    const payload = { idUser };
    return this.http.post<[Intervention[], number]>(
      `${this.baseUrl}/interventions_user`,
      payload
    );
  }

  getUserById(idUser: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users_admin_rest/${idUser}`);
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
