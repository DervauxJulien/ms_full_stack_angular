import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { User } from "../interfaces/user-interface";


@Injectable({ providedIn: "root" })
export class AuthService {
  private apiUrl = "http://localhost:8080";
  constructor(private http: HttpClient) {}
  login(credentials: {
    registration: string;
    passwordUser: string;

  }): Observable<User | null> {
    return this.http.post<User>(`${this.apiUrl}/login`, credentials).pipe(
      map((response) => {
        if (response) {
          this.setCurrentUser(response);
          return response;
        }
        return null;
      }),
      catchError((error) => {
        console.error("Erreur de connexion", error);
        return of(null);
      })
    );
  }
  setCurrentUser(user: User) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  }
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem("currentUser");
    return userStr ? JSON.parse(userStr) : null;
  }

  logout() {
    localStorage.removeItem("currentUser");
  }
  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.roleUser : null;
  }
}
