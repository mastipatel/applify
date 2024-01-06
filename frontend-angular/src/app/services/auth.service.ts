import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://applify.onrender.com";

  constructor(private http: HttpClient) { }

  signin(email: string, password: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/sign-in`, {
      user_id: email,
      password: password
    }, httpOptions);
  }

  signup(email: string, password: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/sign-up`, {
      user_id: email,
      password: password
    }, httpOptions);
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('applifyUser');
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}
