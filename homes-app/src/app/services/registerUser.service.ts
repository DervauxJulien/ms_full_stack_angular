import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../interfaces/user-interface";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "http://localhost:8080/create_user_rest";

  constructor(private http: HttpClient) {}

  registerUser(registerUser: User): Observable<any> {
    return this.http.post<any>(this.apiUrl, registerUser);
  }
}
